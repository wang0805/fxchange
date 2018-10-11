module.exports = (dbPoolInstance) => {

	const index = (callback) => {

		const query = "SELECT * FROM transactions";

		dbPoolInstance.query(query, (error, result) => {
			callback(error, result);
			//console.log("select all from orders: ",result.rows);
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
		update
	}
}