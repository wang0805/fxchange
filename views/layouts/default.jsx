const sha256 = require('js-sha256');
const SALT = "fxchange";
var React = require('react');
var Headerlink = require('../user/header');
var Rightbody = require('../order/rightBody');

class DefaultLayout extends React.Component {

	render() {

		let displayRightBody;
		console.log("this props cookies check: ", this.props);
		if (this.props.logged_in!=undefined) {
			displayRightBody = <Rightbody order={this.props.order} userid={this.props.userid} loggedin={this.props.loggedin} />;
		}
		
		return (
			<html>
				<head> 	
					<title>{this.props.title}</title>
					<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"></link>
					<link rel="stylesheet" type="text/css" href="/style.css"></link>
				</head>
				<body>
					<Headerlink cookies={this.props} />
					{displayRightBody}

					<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
					<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
					<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
				</body>
			</html>
			);
	}
}

module.exports = DefaultLayout;