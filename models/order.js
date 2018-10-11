module.exports = (dbPoolInstance) => {

	const index = (callback) => {
		//asc so as to employ the FIFO logic, if not each time an order is edited it is pushed dowwnwards in SQL
		const query = "SELECT * FROM orders ORDER BY id ASC";

		dbPoolInstance.query(query, (error, result) => {
			callback(error, result);
			//console.log("select all from orders: ",result.rows);
		})
	}

	const create = (newObj, callback) => {

		const query = "INSERT INTO orders (ticker, ordertype, price, qty, orderstatus, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;";
		const values = [newObj.ticker, newObj.ordertype, newObj.price, newObj.qty, 'active', newObj.user_id];

		dbPoolInstance.query(query, values, (error, result) => {
			callback(error, result);
			console.log("id from create: ", result.rows);
		})
	}

	const edit = (id, callback) =>{

		const query = "SELECT * FROM orders WHERE id=$1";

		dbPoolInstance.query(query, (error, result) => {
			callback(error, result);
			//console.log("select all from orders where user: ",result.rows);
		})
	}

	const update = (updateObj, callback) => {

		const query = "UPDATE orders SET price=$1, qty=$2 WHERE id=$3";
		const values = [updateObj.price, updateObj.qty, updateObj.id];

		dbPoolInstance.query(query, (error, result) => {
			callback(error, result);
			//console.log("updated orders: ",result.rows);
		})
	}

	const destroy = (id, callback) => {

		const query = "UPDATE orders SET orderstatus=$1 WHERE id=$2"
		values = ['cancelled', id];

		dbPoolInstance.query(query, values, (error, result) => {
			callback(error, result);
		})
	}

	const updateMore = (id, qty, status, callback) => {

		const query = "UPDATE orders SET qty=$1, orderstatus=$2 WHERE id=$3";
		const values = [qty, status, id];

		dbPoolInstance.query(query, values, (error, result) => {
			callback(error, result);
		})
	}

	const updateLess = (id, qty, callback) => {

		const query = "UPDATE orders SET qty=$1, orderstatus=$2 WHERE id=$3";

		var status;
		if (qty === 0){
			status = 'filled';
		}
		else if (qty > 0){
			status = 'active';
		}
		const values = [qty, status, id]; 

		dbPoolInstance.query(query, values, (error, result) => {
			callback(error, result);
		})
	}

	const createTrans = (a_orderid, b_orderid, qty, callback) => {

		const query = "INSERT INTO transactions (a_orderid, b_orderid, qty) VALUES ($1, $2, $3);";
		const values = [a_orderid, b_orderid, qty];

		dbPoolInstance.query(query, values, (error, result) => {
			callback(error, result);
		})
	}


	return {
		index,
		create,
		edit,
		update,
		destroy,
		updateMore,
		updateLess,
		createTrans
	}
}