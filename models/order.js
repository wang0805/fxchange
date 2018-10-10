module.exports = (dbPoolInstance) => {

	const index = (callback) => {

		const query = "SELECT * FROM orders";

		dbPoolInstance.query(query, (error, result) => {
			callback(error, result);
			//console.log("select all from orders: ",result.rows);
		})
	}

	const create = (newObj, callback) => {

		const query = "INSERT INTO orders (ticker, ordertype, price, qty, orderstatus, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;";
		const values = [newObj.ticker, newObj.ordertype, newObj.price, qty, 'active', newObj.user_id];

		dbPoolInstance.query(query, values, (error, result) => {
			callback(error, result);
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

		const query = "UPDATE orders SET ordertype=$1, price=$2, qty=$3, orderstatus=$4 WHERE id=$5";
		const values = [];

		dbPoolInstance.query(query, (error, result) => {
			callback(error, result);
			//console.log("updated orders: ",result.rows);
		})
	}

	const destroy = (id, callback) => {

		const query = "UPDATE orders SET orderstatus=$1 WHERE id=$2"
		values = [];

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

	const updateLess = (id, qty, status, callback) => {

		const query = "UPDATE orders SET qty=$1, orderstatus=$2 WHERE id=$3";
		const values = [qty, status, id]; 

		dbPoolInstance.query(query, values, (error, result) => {
			callback(error, result);
		})
	}

	const update

	return {
		index,
		create,
		edit,
		update,
		destroy,
		updateMore,
		updateLess
	}
}