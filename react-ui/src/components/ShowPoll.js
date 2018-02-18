import React from 'react';

class ShowForm extends React.Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {this.props.pollName}
        </div>
        <div className="panel-body">
          {this.props.pollOptions}
        </div>
      </div>
    )
  }
}

export default ShowForm;
