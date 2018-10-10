
module.exports = (db) => {

	//var orderStatus = ['active', 'filled', 'cancelled'];

	const index = (request, response) => {

		let user_id = request.cookies.user_id;
		let login = request.cookies.logged_in;

		db.order.index((error,result) => {
			if (error) {
		        console.error('error: ', error);
		        response.sendStatus(500);
		    }
		    else {
				response.render('order/home', {order: result.rows, userid: user_id, loggedin: login});
		    }
		})
	}

	const new = (request, response) => {
		response.render('order/new');
	}

	const create = (request, response) => {

		console.log("create query: ", request.body);

		var insert_id;

		db.order.create(request,body, (error, result) => {
			if (error) {
		        console.error('error: ', error);
		        response.sendStatus(500);
		    }
		    else {
		    	insert_id = results.rows[0].id;

		    	//select all previous entries
				db.order.index((error,result) => {
					if (error) {
				        console.error('error: ', error);
				        response.sendStatus(500);
				    }
				    else {
				    	//find if theres any counterparty
				    	let result.rows  = arrayObj;
						for(let i=0; i<arrayObj.length; i++){
							if(arrayObj[i].ticker === request.body.ticker && arrayObj[i].ordertype != request.body.ordertype && arrayObj.price === request.body.price && request.body.orderstatus==='active') {
								
								var qtytrans = request.body.qty;

								if(arrayObj[i].qty >= gtytrans) {
									
									console.log("check types for qty: ", typeof arrayObj.qty, typeof qtytrans);
									
									var qty = arrayObj.qty - qtytrans;
									//update new quantity to previous user
									db.order.updateMore(arrayObj.id, qty, 'active', (error, result) => {
										if (error) {
											console.log('error', error);
											response.sendStatus(500);
										}
									})
									//update filled inserted order
									db.order.updateMore(insert_id, 0, 'filled', (error, result) => {
										if (error) {
											console.log('error', error);
											response,sendStatus(500);
										}
									})
									//create entry in transactions if user B and FILLED
									if(request.body.ordertype === 'B'){
										db.transactons.create(arrayObj[i].id, insert_id, qtytrans, (error, result) => {
											if (error) {
												console.log('error', error);
												response.sendStatus(500);
											}
										})
									}
									//create entry in transactions if user Sell and FILLED
									else if (request.body.ordertype === 'A'){
										db.transactons.create(insert_id, arrayObj[i].id, qtytrans, (error, result) => {
											if (error) {
												console.log('error', error);
												response.sendStatus(500);
											}
										})
									}

								}
								else if(arrayObj[i].qty < gtytrans) {

									var qtty = qtytrans - arrayObj[i].qty;

									//update to 0 quantity to previous user
									db.order.updateLess(arrayObj[i].id, 0, 'filled', (error, result) => {
										if (error) {
											console.log('error', error);
											response.sendStatus(500);
										}
									})
									db.order.updateLess(arrayObj[i].id, qtty, 'active', (error, result) => {
										if (error) {
											console.log('error', error);
											response.sendStatus(500);
										}
									})
																		//create entry in transactions if user B and FILLED
									if(request.body.ordertype === 'B'){
										db.transactons.create(arrayObj[i].id, insert_id, qtty, (error, result) => {
											if (error) {
												console.log('error', error);
												response.sendStatus(500);
											}
										})
									}
									//create entry in transactions if user Sell and FILLED
									else if (request.body.ordertype === 'A'){
										db.transactons.create(insert_id, arrayObj[i].id, qtty, (error, result) => {
											if (error) {
												console.log('error', error);
												response.sendStatus(500);
											}
										})
									}
								}
							}
						}
				    }
				})

		    }
		})
	}

	const edit = (request, response) => {

		let user_id = request.cookies.user_id;

		db.order.edit(user_id, (error, result) => {
			if (error) {
				console.log('error', error);
				response.sendStatus(500);
			}
			else {
				response.render('order/edit', result.rows[0]);
			}
		})
	}	

	const update = (request, response) => {

		db.order.update(request.body, (error, result) => {
			if (error) {
				console.log('error', error);
				response.sendStatus(500);
			}
			else {
				response.redirect(`/user/${request.body.id}/profile`)
			}
		})
	}	
	//destroy is updating orderstatus to cancelled and not removing from array	
	const destroy = (request, response) => {

		db.order.destroy(request.params.id, (error, result) => {
			if (error) {
				console.log('error', error);
				response.sendStatus(500);
			}
			else {
				response.redirect(`/user/${request.cookies.user_id}/profile`)
			}
		})
	}	


	/**
	* ===========================================
	* Export controller functions as a module
	* ===========================================
	*/

	return {
		index,
		new,
		create,
		edit,
		update,
		destroy
	}

}




		// //select and get results for all orders
		// db.order.index((error,result) => {
		// 	if (error) {
		//         console.error('error: ', error);
		//         response.sendStatus(500);
		//     }
		//     else {
		//     	//find if theres any counterparty
		//     	let result.rows  = arrayObj;
		// 		for(let i=0; i<arrayObj.length; i++){
		// 			if(arrayObj[i].ticker === request.body.ticker && arrayObj[i].ordertype != request.body.ordertype && arrayObj.price === request.body.price && request.body.orderstatus!='cancelled') {
						
		// 				var qtytrans = request.body.qty;

		// 				if(arrayObj[i].qty >= gtytrans) {
							
		// 					console.log("check types for qty: ", typeof arrayObj.qty, typeof qtytrans);
							
		// 					var qty = arrayObj.qty - qtytrans;
		// 					//update new quantity to previous user
		// 					db.order.updateMore(arrayObj.id, qty, (error, result) => {
		// 						if (error) {
		// 							console.log('error', error);
		// 							response.sendStatus(500);
		// 						}
		// 					})
		// 					//insert FILLED order
		// 					db.order.createMore(request.body, (error, result) => {
		// 						if (error) {
		// 							console.log('error', error);
		// 							response,sendStatus(500);
		// 						}
		// 						else {
		// 							//create entry in transactions if user B and FILLED
		// 							if(request.body.ordertype === 'B'){
		// 								db.transactons.create(arrayObj[i].id, result.rows[0].id, qtytrans, (error, result) => {
		// 									if (error) {
		// 										console.log('error', error);
		// 										response,sendStatus(500);
		// 									}
		// 								})
		// 							}
		// 							//create entry in transactions if user Sell and FILLED
		// 							else if (request.body.ordertype === 'A'){
		// 								db.transactons.create(result.rows[0].id, arrayObj[i].id, qtytrans, (error, result) => {
		// 									if (error) {
		// 										console.log('error', error);
		// 										response,sendStatus(500);
		// 									}
		// 								})
		// 							}
		// 						}
		// 					})

		// 				}
		// 				else if(arrayObj[i] < gtytrans) {

		// 					db.order.UpdateLess(arrayObj[i].id, (error, result) => {
		// 						if (error) {
		// 							console.log('error', error);
		// 							response.sendStatus(500);
		// 						}
		// 					})
		// 				}
		// 			}
		// 		}
		//     }
		// })
