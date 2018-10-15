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
              <th className="orderticker text-center" scope="row">{order.ticker}</th>
              <td class="text-center">{order.ordertype}</td>
              <td class="text-center">{order.price}</td>
              <td class="text-center">{order.qty}</td>
              <td className='orderstatus text-center'>{order.orderstatus}</td>
              <td className='edit text-center'><a href={aTag}>Edit</a></td>
              <td className='cancel text-center'><a href={aTagC}>Cancel</a></td>
          </tr> 
        )
      }
    })
    
    return (
          <html>
            <div>
              <div className="headings">ORDER HISTORY</div>
              <div>
                    <select class ="select" id='orderticker'>
                        <option value='all'>Show All Ticker</option>
                        <option value='USDSGD'>USD/SGD</option>
                        <option value='SGDMYR'>SGD/MYR</option>
                        <option value='SGDTWD'>SGD/TWD</option>
                        <option value='SGDTHB'>SGD/THB</option>
                    </select>
                    &nbsp;
                    <select class="select" id='orderstatus'>
                        <option value='all'>Show All Status</option>
                        <option value='filled'>Filled</option>
                        <option value='active'>Active</option>
                        <option value='cancelled'>Cancelled</option>
                    </select>
              </div>
              <p/>
              <table className ="table table-striped table-hover">
                <tread>
                  <th class="text-center" scope="col">Ticker</th>
                  <th class="text-center" scope="col">Buy/Sell</th>
                  <th class="text-center" scope="col">Price</th>
                  <th class="text-center" scope="col">Quantity</th>
                  <th class="text-center" scope="col">Status</th>
                  <th class="text-center" scope="col">Edit</th>
                  <th class="text-center" scope="col">Cancel</th>
                </tread>
                <tbody>
                  {orders}
                </tbody>
              </table>
            </div>
          </html>
    );
  }
}

module.exports = RightBody;


// return (
//   { true ? (<div></div>) : (<div></div>) }

// )
