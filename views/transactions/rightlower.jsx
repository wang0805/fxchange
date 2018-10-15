var React = require("react");
const sha256 = require('js-sha256');
const SALT = "fxchange";

class Rightlower extends React.Component {
  render() {
  
    let buytransactions = this.props.buytransactions.map(buy => {
      
      let userIdB = buy.id;
      if(parseInt(this.props.cookies.user_id) === userIdB && this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
        
        var timeStr = '';
        timeStr = `${buy.date.toLocaleDateString()} ${buy.date.toLocaleTimeString()}`;
        return (
          <tr>
              <th class="text-center" scope="row">{buy.ticker}</th>
              <td class="text-center">{buy.price}</td>
              <td class="text-center">{buy.qty}</td>
              <td class="text-center">{timeStr}</td>
          </tr> 
        )
      }
    })

    let selltransactions = this.props.selltransactions.map(sell => {
      
      let userIdS = sell.id;
      if(parseInt(this.props.cookies.user_id) === userIdS && this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
        
        var timeStr = '';
        timeStr = `${sell.date.toLocaleDateString()} ${sell.date.toLocaleTimeString()}`;

        return (
          <tr>
              <th class="text-center" scope="row">{sell.ticker}</th>
              <td class="text-center">{sell.price}</td>
              <td class="text-center">{sell.qty}</td>
              <td class="text-center">{timeStr}</td>
          </tr> 
        )
      }
    })
    
    return (
          <html>
            <div>
              <p/>
              <div>
                <div className="headings">BOUGHT TRANSACTIONS</div>
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">Ticker</th>
                      <th class="text-center" scope="col">Price</th>
                      <th class="text-center" scope="col">Quantity</th>
                      <th class="text-center" scope="col">Created_at ( GMT +8 )</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buytransactions}
                  </tbody>
                </table>
              </div>
              <p />
              <div>
                <div className="headings">SOLD TRANSACTIONS</div>
                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">Ticker</th>
                      <th class="text-center" scope="col">Price</th>
                      <th class="text-center" scope="col">Quantity</th>

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
