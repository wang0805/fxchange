var React = require("react");
const sha256 = require('js-sha256');
const SALT = "fxchange";

class Rightlower extends React.Component {
  render() {
  
    let buytransactions = this.props.buytransactions.map(buy => {
      
      let userIdB = buy.id;
      if(parseInt(this.props.cookies.user_id) === userIdB && this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
        return (
          <tr>
              <th scope="row">{buy.ticker}</th>
              <td>{buy.price}</td>
              <td>{buy.qty}</td>
          </tr> 
        )
      }
    })

    let selltransactions = this.props.selltransactions.map(sell => {
      
      let userIdS = sell.id;
      if(parseInt(this.props.cookies.user_id) === userIdS && this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
        return (
          <tr>
              <th scope="row">{sell.ticker}</th>
              <td>{sell.price}</td>
              <td>{sell.qty}</td>
          </tr> 
        )
      }
    })
    
    return (
          <html>
            <div>
              <p/>
              <div>
                <h1>Bought transactions</h1>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Ticker</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buytransactions}
                  </tbody>
                </table>
              </div>
              <p />
              <div>
                <h1> Sold transactions</h1>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Ticker</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selltransactions}
                  </tbody>
                </table>
              </div>
            </div>
          </html>
    );
  }
}

module.exports = Rightlower;
