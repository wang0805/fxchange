var React = require('react');
var DefaultLayout = require('../layouts/default');

class Edit extends React.Component {
	render(){
		var actionUrl = '/orders/'+this.props.id+'?_method=PUT';
		//console.log(this.props);
		return(
			<DefaultLayout title="Edit order" subtitle="EDIT ORDER">
				<form method="POST" action={actionUrl}>
					<p>order id</p>
					<input name="id" value={this.props.id} readOnly="readonly" />
					<p>price</p>
					<input name="price" value={this.props.price} />
					<p>qty</p>
					<input name="qty" value={this.props.qty} />
					<p>order type</p>
					<input name="ordertype" value={this.props.ordertype} readOnly="readonly" />
					<button class="btn btn-primary btn-lg btn-block" type="submit">Edit</button>
				</form>
			</DefaultLayout>
		)
	}
}

module.exports = Edit;