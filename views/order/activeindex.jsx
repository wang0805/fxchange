var React = require("react");
var DefaultLayout = require('../layouts/default');

class Activeindex extends React.Component {
  render() {
  
    let orders = this.props.orders.map(order => {

        return (
          <tr>
              <th scope="row">{order.ticker}</th>
              <td>{order.ordertype}</td>
              <td>{order.price}</td>
              <td>{order.qty}</td>
          </tr> 
        )
    })
    
    return (
          <DefaultLayout title="Active orders" subtitle="Active orders">
                <table className ="table table-striped">
                  <tread>
                    <th scope="col">Ticker</th>
                    <th scope="col">Buy/Sell</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                  </tread>
                  <tbody>
                    {orders}
                  </tbody>
                </table>
      </DefaultLayout>
    );
  }
}

module.exports = Activeindex;

