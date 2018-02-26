import React from 'react';

class PollForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       question: "",
       options: ""
     };
  }

  createPoll = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/createpoll/', {
      method: 'POST',
      body: JSON.stringify(
        {'pollName' : this.state.question, 'options': this.state.options.split(",") }
      ),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => alert("Thanks for creating a new poll!"))
    .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='panel panel-default col-sm-6 col-sm-offset-3'>
            <div className='panel-body'>
              <h2 className='text-center'>Create Poll</h2>
              <form onSubmit={this.createPoll}>
                <div className='form-group'>
                  <label>Question:</label>
                  <input onChange={e => this.setState({ question: e.target.value })} placeholder='Enter a question...' className='form-control'/> <br />
                  <label>Options:</label>
                  <input onChange={e => this.setState({ options: e.target.value })} placeholder='Enter your options, separated by commas' className='form-control'/> <br />
                </div>

                  <div className='col-sm-4 col-sm-offset-4'>
                    <button className='btn btn-block btn-primary center-block' type='submit'>Create</button>
                  </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PollForm;
