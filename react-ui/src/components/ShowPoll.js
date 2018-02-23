import React from 'react';
import {Pie} from 'react-chartjs-2';

class ShowForm extends React.Component {
  render() {

    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#F19CBB', '#D1001C', '#7F3E98', '#4682BF', '#D2691E']

    const data = {
      labels: this.props.pollOptions.map(d => d.key),
      datasets: [
        {
          data: this.props.pollVotes,
          backgroundColor: colors,
          hoverBackgroundColor: colors
        }
      ]
    };

    return (<div className="panel panel-default">
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
              <Pie data={data} width={20} height={5} /*options={{maintainAspectRatio: false}}*//>
            </div>
          </div>
        </form>
      </div>
    </div>)
  }
}

export default ShowForm;
