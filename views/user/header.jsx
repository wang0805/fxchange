var React = require("react");
const sha256 = require('js-sha256');
const SALT = "fxchange";

class Header extends React.Component {
  render() {

    if (this.props.cookies.logged_in === sha256(SALT+this.props.cookies.user_id)) {
      return( 
        <html>
            <div className="navbar-nav ml-auto">
                <form className ="form-inline nav-item nav-link logout" method="POST" action="/users/logout">
                  <input class="btn btn-secondary mb-2" type="submit" value="Logout" />
                </form>
            </div>
        </html>
        )
    }
    else {
      return (
        <html>
          <div>
            <span>
              <form className="form-inline" method="POST" action="/users/login">
                  <span>
                    <input class="login-control" name="name" type="text" placeholder="Name"/> &nbsp;
                  </span>
                  <span>
                    <input class="login-control" name="password" type="Password" placeholder="Password"/> &nbsp;
                  </span>
                <button class="btn btn-secondary btn-sm md-2" type="submit">Login</button>
              </form>
              </span>
              &nbsp;
              <span>
              <form className="form-inline" method="GET" action='/users/new'>
                <button class="btn btn-secondary btn-sm md-2" type="submit">Register</button>
              </form>
              </span>
            </div>
          </html>
      );
    }
  }
}

module.exports = Header;
