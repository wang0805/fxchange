const sha256 = require('js-sha256');
const SALT = "fxchange";
var React = require('react');
var Headerlink = require('../user/header');
var Rightbody = require('../order/rightBody');
var Rightlower = require('../transactions/rightlower');

class Layout extends React.Component {

	render() {

		let displayRightBody;
		let displayRightlower;
		//console.log("this props cookies check: ", this.props.cookies);
		if (this.props.cookies.logged_in!=undefined) {
			displayRightBody = <Rightbody order={this.props.order} cookies={this.props.cookies} />;
			displayRightlower = <Rightlower buytransactions={this.props.buytransactions} selltransactions={this.props.selltransactions} cookies={this.props.cookies} />;
		}
		
		return (
			<html>
				<head> 	
					<title>{this.props.title}</title>
					<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"></link>
					<link rel="stylesheet" type="text/css" href="/style.css"></link>
				</head>
				<body>
					<Headerlink cookies={this.props.cookies} />
					{displayRightBody}
					<p/>	
					{displayRightlower}
					<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
					<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
					<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
				</body>
			</html>
			);
	}
}

module.exports = Layout;