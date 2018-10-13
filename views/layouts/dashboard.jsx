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

		console.log("this props cookies check: ", this.props.cookies);

		if (this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
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
					<p />
					<div id="search-form">
						<input id="search-stock" type="search" placeholder="Enter Currency Pair" maxlength="6"/>
						<button id="submit">submit</button>
					</div>
					<div id="myDiv"></div>
					<p/>
					{displayRightBody}
					<p/>	
					{displayRightlower}

					<script type="text/javascript" src="/script.js"></script>
					<script
					  src="https://code.jquery.com/jquery-3.3.1.js"
					  integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
					  crossorigin="anonymous"></script>
					<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
					<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
					<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
					<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
				</body>
			</html>
			);
	}
}

module.exports = Layout;