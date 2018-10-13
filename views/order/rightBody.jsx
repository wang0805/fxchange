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
          <tr>
              <th scope="row">{order.ticker}</th>
              <td>{order.ordertype}</td>
              <td>{order.price}</td>
              <td>{order.qty}</td>
              <td>{order.orderstatus}</td>
              <td><a href={aTag}>Edit</a></td>
              <td><a href={aTagC}>Cancel</a></td>
          </tr> 
        )
      }
    })
    
    return (
          <html>
            <div>
              <div>
                <h1>New Order</h1>
                <form method="POST" action='/order/new'>
                  <input name="ticker" placeholder="Enter ticker"/>
                  <input name="price" placeholder="Enter price" />
                  <input name="qty" placeholder="Enter quantity" />
                  <input name="user_id" value={this.props.cookies.user_id} type="hidden"/>
                  <p/>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" name="ordertype" type="checkbox" id="inlineCheckbox1" value="B"/>
                    <label class="form-check-label" for="inlineCheckbox1">BUY</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" name="ordertype" type="checkbox" id="inlineCheckbox2" value="A"/>
                    <label class="form-check-label" for="inlineCheckbox2">SELL</label>
                  </div>
                  <p/>
                  <input class="btn btn-primary mb-2" type="submit" value="Submit"/>
                </form>
              </div>
              <p/>
              <div>
                <h1>Current orders</h1>
                <table className ="table table-striped">
                  <tread>
                    <th scope="col">Ticker</th>
                    <th scope="col">Buy/Sell</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Cancel</th>
                  </tread>
                  <tbody>
                    {orders}
                  </tbody>
                </table>
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
