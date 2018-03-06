import React, {Component} from 'react';

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
       username: "",
       password: "",
       confirmation: ""
     };
  }

  registerUser = (e) => {
    e.preventDefault();

    if (this.state.password === this.state.confirmation) {
      fetch('http://localhost:5000/api/register/', {
        method: 'POST',
        body: JSON.stringify(
          {'username' : this.state.username, 'password': this.state.password }
        ),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => window.location.href='/')
      .catch(error => console.error('Error:', error));

      this.setState({
        'username': "",
        'password': "",
        'confirmation': ""
      });
    } else {
      alert('Try again');
    }
  }

  render() {
    return (
      <div className="container register">
        <div className="row main">
          <div className="panel-heading">
            <div className="panel-title text-center">
              <h1 className="title">Register</h1>
              <hr/>
            </div>
          </div>
          <div className="main-login main-center">
            <form className="form-horizontal" onSubmit={this.registerUser}>
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
              <div className="form-group">
                <label className="cols-sm-2 control-label">Confirm Password</label>
                <div className="cols-sm-10">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="fa fa-lock fa-lg" aria-hidden="true"></i>
                    </span>
                    <input onChange={e => this.setState({ 'confirmation': e.target.value })} placeholder='Confirm Password' className='form-control'/> <br />
                  </div>
                </div>
              </div>
              <div className="form-group ">
                <button type='submit' className="btn btn-sm btn-primary login-button">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
