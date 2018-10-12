var React = require("react");
const sha256 = require('js-sha256');
const SALT = "fxchange";

class RightBody extends React.Component {
  render() {
  
    let orders = this.props.order.map(order => {
      
      let userId = order.user_id;
      //if you skip the / in front, it will automatically continue from the exisiting path
      let aTag = `${this.props.cookies.user_id}/order/${order.id}/edit`;
      let aTagC = `${this.props.cookies.user_id}/order/${order.id}/cancel`;

      if(parseInt(this.props.cookies.user_id) === userId && this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
        return (
          <div>
              {order.ticker}
              {order.ordertype}
              {order.price}
              {order.qty}
              {order.orderstatus} 
              <a href={aTag}>Edit</a> 
              <a href={aTagC}>Cancel</a> 
          </div> 
        )
      }
    })
    
    return (
          <html>
            <div>
              <div>
                <form method="POST" action='/order/new'>
                  <input name="ticker" placeholder="Enter ticker"/>
                  <input name="ordertype" value="B" type="hidden" />
                  <input name="price" />
                  <input name="qty" />
                  <input name="user_id" value={this.props.cookies.user_id} type="hidden"/>
                  <input type="submit" value="BUY"/>
                </form>
              </div>
              <div>
                <form method="POST" action='/order/new'>
                  <input name="ticker" placeholder="Enter ticker"/>
                  <input name="ordertype" value="A" type="hidden" />
                  <input name="price" />
                  <input name="qty" />
                  <input name="user_id" value={this.props.cookies.user_id} type="hidden"/>
                  <input type="submit" value="SELL"/>
                </form>
              </div>
              <p/>
              <div>
                <p>Current orders</p>
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
