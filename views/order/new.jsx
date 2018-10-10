const React = require('react');
const DefaultLayout = require('../layout/DefaultLayout');

class New extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <form method="POST" action="/orders">
          <input name="ticker" placeholder="USDSGD"/>
          <input name="ordertype" />
          <input name="price" />
          <input name="qty" />
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </DefaultLayout>
    );
  }
}

module.exports = New;
