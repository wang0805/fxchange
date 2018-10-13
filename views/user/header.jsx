var React = require("react");
const sha256 = require('js-sha256');
const SALT = "fxchange";

class Header extends React.Component {
  render() {

    if (this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
      return( 
        <html>
          <header>
            <div class="card text-center">
              <div class="card-header">
                Logged in
              </div>
              <div class="card-body">
                <h5 class="card-title">Welcome!</h5>
                <p class="card-text">{this.props.cookies.username}</p>
                <form className ="logout" method="POST" action="/users/logout">
                  <input class="btn btn-primary mb-2" type="submit" value="Logout" />
                </form>
              </div>
            </div>
          </header>
        </html>
        )
    }
    else {
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
  }
}

module.exports = Header;
