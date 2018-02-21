import React from 'react';
import {Doughnut} from 'react-chartjs-2';

class ShowForm extends React.Component {
  render() {

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          {this.props.pollName}
        </div>
        <div className="panel-body">
          <form>
            <div className="row form-group">
              <div className="col-sm-5">
              <label>Select Option</label>
              <select className="form-control">
                  {this.props.pollOptions}
              </select>
              <br/>
              <button className='btn btn-block btn-primary center-block' type='submit'>Vote</button>
              </div>
              <div className="col-sm-5">
              <Doughnut data={[1,2]} width={100} height={50} options={{maintainAspectRatio: false}}/>
                </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ShowForm;
