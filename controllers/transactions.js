module.exports = (db) => {

	const create = (request, response) => {

	    db.user.create(request.body, (error, queryResult) => {
	      if (error) {
	        console.error('error getting user:', error);
	        response.sendStatus(500);
	      }
	    });
  	};

	return {
		create
	}
}