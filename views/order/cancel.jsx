var React = require('react');
var DefaultLayout = require('../layouts/default');

class Cancel extends React.Component {
	render(){
		var actionUrl = '/order/'+this.props.id+'/cancel?_method=PUT';
		//console.log(this.props);
		return(
			<DefaultLayout title="Cancel order" subtitle="CONFIRM CANCEL ORDER">
				<form method="POST" action={actionUrl}>
					<p>Confirm Cancel</p>
					<input name="id" value={this.props.id} type="hidden" />
					<input name="user_id" value={this.props.user_id} type="hidden" />
					<button class="btn btn-primary btn-lg btn-block" type="submit">Cancel</button>
				</form>
			</DefaultLayout>
		)
	}
}

module.exports = Cancel;