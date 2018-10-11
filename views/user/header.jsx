var React = require("react");

class Header extends React.Component {
  render() {

    if(this.props.cookies.logged_in===undefined) {
      return (
        <html>
          <header>
              <form class="needs-validation" method="POST" action="/users/login">
                <div class="form-row">
                  <div class="col-md-6 mb-4">
                    <label for="validationCustom01">Name</label>
                    <input class="form-control" id="validationCustom01" name="name" type="text"/>
                  </div>
                  <div class="col-md-6 mb-4">
                      <label for="validationCustom02">Password</label>
                    <input class="form-control" id="validationCustom02" name="password" type="password"/>
                  </div>
                </div>
                <button class="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
              </form>
              <p/>
              <form method="GET" action='/users/new'>
                <button class="btn btn-primary btn-lg btn-block" type="submit">Register</button>
              </form>
            </header>
          </html>
      );
    }
    else {
      return( 
        <html>
          <header>
            <p>logged in, welcome {this.props.cookies.username}</p>
          </header>
        </html>
        )
    }
  }
}

module.exports = Header;
