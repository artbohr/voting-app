import React, {Component} from 'react';

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
       username: "",
       password: ""
     };
  }

  loginUser = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      body: JSON.stringify(
        {'username' : this.state.username, 'password': this.state.password }
      ),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => alert('Logged in!'))
    .catch(error => console.error('Error:', error));

    this.setState({
      'username': "",
      'password': ""
    });
  }

  render() {
    return (
    <div className="container register">
      <div className="row main">
        <div className="panel-heading">
          <div className="panel-title text-center">
            <h1 className="title">Login</h1>
            <hr/>
          </div>
        </div>
        <div className="main-login main-center">
          <form className="form-horizontal">
            <div className="form-group">
              <label className="cols-sm-2 control-label">Username</label>
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-users fa" aria-hidden="true"></i>
                  </span>
                  <input onChange={e => this.setState({ 'username': e.target.value })} placeholder='Enter your username' className='form-control'/> <br />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="cols-sm-2 control-label">Password</label>
              <div className="cols-sm-10">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-lock fa-lg" aria-hidden="true"></i>
                  </span>
                  <input onChange={e => this.setState({ 'password': e.target.value })} placeholder='Enter your password' className='form-control'/> <br />
                </div>
              </div>
            </div>
            <div className="form-group ">
              <button type="button" className="btn btn-sm btn-primary login-button" onClick={this.loginUser}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default Login;
