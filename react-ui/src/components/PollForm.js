import React from 'react';

class PollForm extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='panel panel-default col-sm-6 col-sm-offset-3'>
            <div className='panel-body'>
              <h2 className='text-center'>Create Poll</h2>
              <form onSubmit={console.log("creating poll")}>
                <div className='form-group'>
                  <label>Question:</label>
                  <input placeholder='Enter a question...' className='form-control' ref='question' /> <br />
                </div>
                add options here
                <div className='row'>
                  <div className='col-sm-4 col-sm-offset-4'>
                    <button className='btn btn-block btn-primary center-block' type='submit'>Create</button>
                  </div>
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
