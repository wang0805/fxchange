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
		let displayNewOrder;
		let tradeName = "TRADE";

		console.log("this props cookies check: ", this.props.cookies);

		if (this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
			displayRightBody = <Rightbody order={this.props.order} cookies={this.props.cookies} />;
			displayRightlower = <Rightlower buytransactions={this.props.buytransactions} selltransactions={this.props.selltransactions} cookies={this.props.cookies} />;
			tradeName = `WELCOME ${this.props.cookies.username.toUpperCase()}`;
			displayNewOrder =   <div>
									<h1>New Order</h1>
											<form method="POST" action='/order/new'>
  												<div class="form-group row">
												    <label for="inputEmail3" class="col-sm-2 col-form-label">Ticker</label>
												    <div class="col-sm-5">
												      <input name="ticker" type="text" class="form-control" id="inputEmail3" placeholder="Enter Ticker" />
												    </div>
  												</div>
												  <div class="form-group row">
												    <label for="inputPrice3" class="col-sm-2 col-form-label">Price</label>
												    <div class="col-sm-5">
												      <input name="price" type="text" class="form-control" id="inputPrice3" placeholder="Enter Price" />
												    </div>
												  </div>
												 <div class="form-group row">
												    <label for="inputQty3" class="col-sm-2 col-form-label">Qty</label>
												    <div class="col-sm-5">
												      <input name="qty" type="text" class="form-control" id="inputQty3" placeholder="Enter Quantity" />
												    </div>
												 </div>
												 <input name="user_id" value={this.props.cookies.user_id} type="hidden"/>
												 <fieldset class="form-group">
												    <div class="row">
												      <legend class="col-form-label col-sm-2 pt-0">Bid/Ask</legend>
												      <div class="col-sm-5">
												        <div class="form-check">
												          <input class="form-check-input" name="ordertype" type="radio" id="gridRadios1" value="B" checked />
												          <label class="form-check-label" for="gridRadios1">
												            BUY
												          </label>
												        </div>
												        <div class="form-check">
												          <input class="form-check-input" name="ordertype" type="radio" id="gridRadios2" value="A" />
												          <label class="form-check-label" for="gridRadios2">
												            Sell
												          </label>
												        </div>
												      </div>
												    </div>
												 </fieldset>
												 <div class="form-group row">
												    <div class="col-sm-7">
												      <button type="submit" class="btn btn-secondary">Submit Order</button>
												    </div>
												 </div>
											</form>
								</div>;
		}

		return (
			<html>
				<head> 
					<meta charset="UTF-8"/>
					<meta name="viewport" content="width = device-width, initial-scale=1"/>
					<title>{this.props.title}</title>
					<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"></link>
					<link rel="stylesheet" type="text/css" href="/style.css"></link>
				</head>
				<body>
					<nav className="navbar navbar-expand-md navbar-light bg-light">
						<div className='container'>
							<a className="navbar-brand mb-0 h1" href="/">{tradeName}</a>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<Headerlink cookies={this.props.cookies} />
						</div>
					</nav>


					<div className='container'>
                        <div className='row'>
                            <div className='col-lg-7 col-md-12 col-sm-12 col-xs-12'>
                                <div id="search-form">
                      				<div>Check ticker for 5min LIVE data</div>
                                    <input id="search-stock" type="search" placeholder="Enter Currency Pair" maxlength="6"/>
                                    <button id="submit">Submit</button>
                                </div>
                                <div id="myDiv"></div>
                                {displayNewOrder}
                            </div>
                        	<div className='col-lg-5 col-md-12 col-sm-12 col-xs-12'>
                        		<div>
                                	<div>Check active order</div>
                                	<form id="my-form">
                                		<input id="input-ticker" type="search" placeholder="Enter Currency Pair" maxlength="6"/>
                                		<input type="submit" value="Submit" />
                                	</form>
                                </div>
                                <p/>
                                <div id="ordertable">
                                	<table className ="table table-striped table-hover">
					                  <tread>
					                    <th class="text-center" scope="col">Ticker</th>
					                    <th class="text-center" scope="col">Buy/Sell</th>
					                    <th class="text-center" scope="col">Price</th>
					                    <th class="text-center" scope="col">Quantity</th>
					                  </tread>
					                  <tbody id="insert-table">

					                  </tbody>
					                </table>
                                </div>
							</div>
                        </div>
                        <div class="row">
                        	<div>
            					{displayRightBody}
            					<p/>
            					{displayRightlower}
                            </div>
                        </div>
                    </div>

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