var React = require("react");
const sha256 = require('js-sha256');
const SALT = "fxchange";

class Rightlower extends React.Component {
  render() {
  
    let buytransactions = this.props.buytransactions.map(buy => {
      
      let userIdB = buy.id;
      //if you skip the / in front, it will automatically continue from the exisiting path

      if(parseInt(this.props.cookies.user_id) === userIdB && this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
        return (
          <div>
              {buy.ticker}
              {buy.price}
              {buy.qty}
          </div> 
        )
      }
    })

    let selltransactions = this.props.selltransactions.map(sell => {
      
      let userIdS = sell.id;
      //if you skip the / in front, it will automatically continue from the exisiting path

      if(parseInt(this.props.cookies.user_id) === userIdS && this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
        return (
          <div>
              {sell.ticker}
              {sell.price}
              {sell.qty}
          </div> 
        )
      }
    })
    
    return (
          <html>
            <div>
              <p/>
              <div>
                <p>Bought transactions</p>
                {buytransactions}
                <p />
                <p> Sold transactions</p>
                {selltransactions}
              </div>
            </div>
          </html>
    );
  }
}

module.exports = Rightlower;
