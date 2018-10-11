var React = require("react");
const sha256 = require('js-sha256');
const SALT = "fxchange";

class RightBody extends React.Component {
  render() {

    let orders = this.props.order.map(order => {
      let userId = order.user_id;
      let aTag = `users/${this.props.userid}/order/${order.id}`;
      let actionUrl = '/order/'+order.id+'?_method=delete';

      if(parseInt(this.props.userid) === userId && this.props.loggedin === sha256(SALT+this.props.userid)) {
        return (
          <div>
            <form method="POST" action={actionUrl}>
              {order.ticker}
              {order.ordertype}
              {order.price}
              {order.qty}
              {order.orderstatus} 
              <a href={aTag}>Edit</a> 
              <button type="submit" class="delete">Delete</button>
            </form>
          </div> 
        )
      }
      else { 
        return (
          <div>
            No order records
          </div> 
        )
      }
    })
    
    return (
          <html>
            <div>
              <div>
                <form method="POST" action='order/new'>
                  <input name="ticker" placeholder="Enter ticker"/>
                  <input name="ordertype" value="B" type="hidden" />
                  <input name="price" />
                  <input name="qty" />
                  <input name="user_id" value={this.props.userid} type="hidden"/>
                  <input type="submit" value="BUY"/>
                </form>
              </div>
              <div>
                <form method="POST" action='order/new'>
                  <input name="ticker" placeholder="Enter ticker"/>
                  <input name="ordertype" value="A" type="hidden" />
                  <input name="price" />
                  <input name="qty" />
                  <input name="user_id" value={this.props.userid} type="hidden"/>
                  <input type="submit" value="SELL"/>
                </form>
              </div>
              <div>
                {orders}
              </div>
            </div>
          </html>
    );
  }
}

module.exports = RightBody;


// return (
//   { true ? (<div></div>) : (<div></div>) }

// )
