var React = require("react");
var DefaultLayout = require('../layouts/default');

class NewUser extends React.Component {
  render() {
    return (
      <DefaultLayout title="New User">
      <div class="container">
      <div class="row jumbotron">
        <h1>REGISTER</h1>
      </div>
      <div class="row">
      <div class="col-lg-12 col-sm-12 col-xs-12">
          <form method="POST" action="/users">
            <div class="form-group row">
              <label for="inputUser5">User Name</label>
              <input name="name" type="text" id="inputUser5" class="form-control" aria-describedby="usernameHelpBlock"/>
              <small id="usernameHelpBlock" class="form-text text-muted">
                Enter your desired user login name
              </small>
            </div>
            <div class="form-group row">
              <label for="inputPassword5">Password</label>
              <input name="password" type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
              <small id="passwordHelpBlock" class="form-text text-muted">
                Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
              </small>
            </div>
            <div class="form-group row">
              <button class="btn btn-primary" type="submit">Submit</button>
            </div>
          </form>
        </div>
        </div>
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = NewUser;

