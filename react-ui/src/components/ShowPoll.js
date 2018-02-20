import React from 'react';

class ShowForm extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {this.props.pollName}
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label>Select Option</label>
              <select className="form-control">
                  {this.props.pollOptions}
              </select>
            </div>
            <button className='btn btn-block btn-primary center-block' type='submit'>Vote</button>
          </form>
        </div>
      </div>
    )
  }
}

export default ShowForm;
