const sha256 = require('js-sha256');
const SALT = "fxchange";


module.exports = (db) => {

	//var orderStatus = ['active', 'filled', 'cancelled'];

	const create = (request, response) => {

		console.log("create query: ", request.body);

		var insert_id;
		var qtytrans = parseInt(request.body.qty);

		db.order.create(request.body, (error, result) => {
			if (error) {
		        console.error('error: ', error);
		        response.sendStatus(500);
		    }
		    else {
		    	insert_id = result.rows[0].id;

		    	//select all previous entries
				db.order.index( (error, result) => {
					if (error) {
				        console.error('error: ', error);
				        response.sendStatus(500);
				    }
				    else {
				    	//find if theres any counterparty
				    	let arrayObj = result.rows;
						for(let i=0; i<arrayObj.length; i++){

							console.log("array object console log:", arrayObj[i]);

							if(arrayObj[i].ticker === request.body.ticker && arrayObj[i].ordertype != request.body.ordertype && arrayObj[i].price === request.body.price && arrayObj[i].orderstatus==='active') {

								if(arrayObj[i].qty > qtytrans) {
									
									console.log("check types for qty: ", typeof arrayObj[i].qty, typeof qtytrans); // both numbers
									
									var qty = arrayObj[i].qty - qtytrans;
									//update new quantity to previous user
									db.order.updateMore(arrayObj[i].id, qty, 'active', (error, result) => {
										if (error) {
											console.log('error', error);
											response.sendStatus(500);
										}
										else {
											//update filled inserted order
											db.order.updateMore(insert_id, 0, 'filled', (error, result) => {
												if (error) {
													console.log('error', error);
													response,sendStatus(500);
												}
												else {
													//create entry in transactions if user B and FILLED
													if(request.body.ordertype === 'B'){
														db.order.createTrans(arrayObj[i].id, insert_id, qtytrans, (error, result) => {
															if (error) {
																console.log('error', error);
																response.sendStatus(500);
															}
														})
													}
													//create entry in transactions if user Sell and FILLED
													else if (request.body.ordertype === 'A'){
														db.order.createTrans(insert_id, arrayObj[i].id, qtytrans, (error, result) => {
															if (error) {
																console.log('error', error);
																response.sendStatus(500);
															}
														})
													}
												}
											})
										}
									})
									break; //can stop the loop since qty can be matched immediately
								}

								else if(arrayObj[i].qty <= qtytrans) {

									var qtty = qtytrans - arrayObj[i].qty;

									//update to 0 quantity to previous user
									db.order.updateLess(arrayObj[i].id, 0, (error, result) => {
										if (error) {
											console.log('error', error);
											response.sendStatus(500);
										}
										else {
											db.order.updateLess(insert_id, qtty, (error, result) => {
												if (error) {
													console.log('error', error);
													response.sendStatus(500);
												}
												else {
													if(request.body.ordertype === 'B'){
														db.order.createTrans(arrayObj[i].id, insert_id, arrayObj[i].qty, (error, result) => {
															if (error) {
																console.log('error', error);
																response.sendStatus(500);
															}
														})
													}
													//create entry in transactions if user Sell and FILLED
													else if (request.body.ordertype === 'A'){
														db.order.createTrans(insert_id, arrayObj[i].id, arrayObj[i].qty, (error, result) => {
															if (error) {
																console.log('error', error);
																response.sendStatus(500);
															}
														})
													}
												}
											})
										}
									})
									if (qtty === 0) { break; } // can stop the loop when theres no remainder to be matched
									qtytrans = qtty; // update the new quantity when the incoming order isn't fully matched with the first in queue of the same price then loop to find the next in queue of the same price
								}
							}
						}
						response.redirect(`/users/${request.body.user_id}`); //not rendering well yet - need to find the right else statement or settimeout
				    }
				})

		    }
		})
	}

	const edit = (request, response) => {

		//let user_id = request.cookies.user_id;
		let order_id = request.params.orderid;

		db.order.edit(order_id, (error, result) => {
			if (error) {
				console.log('error', error);
				response.sendStatus(500);
			}
			else {
				response.render('order/edit', result.rows[0]);
				console.log("results of edit", result.rows[0]);
			}
		})
	}	

	const update = (request, response) => {

		console.log("request body of update:", request.body)
		db.order.update(request.body, (error, result) => {
			if (error) {
				console.log('error at update', error);
				response.sendStatus(500);
			}
			else {

				db.order.destroy(request.body.id, (error, result) => {
					if (error) {
						console.log('error at update', error);
						response.sendStatus(500);
					}
					else {
						response.redirect(`/users/${request.body.user_id}`)
					}
				})
			}
		})
	}	

	const cfmcancel = (request, response) => {

		//let user_id = request.cookies.user_id;
		let order_id = request.params.orderid;

		db.order.edit(order_id, (error, result) => {
			if (error) {
				console.log('error', error);
				response.sendStatus(500);
			}
			else {
				response.render('order/cancel', result.rows[0]);
				console.log("results of cancel", result.rows[0]);
			}
		})
	}	
	//destroy is updating orderstatus to cancelled and not removing from array
	const cancel = (request, response) => {

		db.order.cancel(request.body.id, (error, result) => {
			if (error) {
				console.log('error', error);
				response.sendStatus(500);
			}
			else {
				response.redirect(`/users/${request.body.user_id}`)
			}
		})
	}	


	/**
	* ===========================================
	* Export controller functions as a module
	* ===========================================
	*/

	return {
		create,
		edit,
		update,
		cfmcancel,
		cancel
	}

}

