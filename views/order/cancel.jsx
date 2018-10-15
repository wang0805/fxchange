var React = require('react');
var DefaultLayout = require('../layouts/default');

class Cancel extends React.Component {
	render(){
		var actionUrl = '/order/'+this.props.id+'/cancel?_method=PUT';
		//console.log(this.props);
		return(
			<DefaultLayout title="Cancel order">
			    <div class="container">
					<div class="row jumbotron">
						<h1>CANCEL ORDER</h1>
					</div>
					<div class="row">
						<div class="col-lg-12">
						<form method="POST" action={actionUrl}>
							<p>Are you sure you want to cancel order?</p>
							<input name="id" value={this.props.id} type="hidden" />
							<input name="user_id" value={this.props.user_id} type="hidden" />
							<button class="btn btn-secondary btn-lg btn-block" type="submit">Confirm</button>
						</form>
						</div>
					</div>
				</div>
			</DefaultLayout>
		)
	}
}

module.exports = Cancel;