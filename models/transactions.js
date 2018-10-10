module.exports = (dbPoolInstance) => {

	const index = (callback) => {

		const query = "SELECT * FROM transactions";

		dbPoolInstance.query(query, (error, result) => {
			callback(error, result);
			//console.log("select all from orders: ",result.rows);
		}
	}

	const create = (a_orderid, b_orderid, qty, callback) => {

		const query = "INSERT INTO transactions (a_orderid, b_orderid, qty) VALUES ($1, $2, $3);";
		const values = [a_orderid, b_orderid, qty];

		dbPoolInstance.query(query, values, (error, result) => {
			callback(error, result);
		})
	}

	const show = (id, callback) =>{

		const query = "SELECT * FROM transactions WHERE id=$1";

		dbPoolInstance.query(query, values, (error, result) => {
			callback(error, result);
		})
	}

	return {
		index,
		create,
		update
	}
}