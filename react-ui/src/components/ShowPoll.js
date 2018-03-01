import React from 'react';
import {Pie} from 'react-chartjs-2';

class ShowForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       votingOption: 0,
       reload: false
     };
  }
  submitVote = (e) => {
    e.preventDefault();

    const url = `${this.props.url}${this.props.pollId}`;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({'voteOn' : this.state.votingOption }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => alert("Thanks for voting!"))
    .catch(error => console.error('Error:', error));
  }

  deletePoll = (e) => {
    e.preventDefault();

    const url = `${this.props.url}${this.props.pollId}`;

    fetch(url, {
      method: 'DELETE',
      body: JSON.stringify({}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => alert("Poll deleted!"))
    .catch(error => console.error('Error:', error));
  }

  render() {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#F19CBB', '#D1001C', '#7F3E98', '#4682BF', '#D2691E']

    const data = {
      labels: this.props.pollOptions.map(d => d),
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
        <button type="button" class="close" onClick={this.deletePoll}>
          <span aria-hidden="true">Delete</span>
        </button>
      </div>
      <div className="panel-body">
        <form onSubmit={this.submitVote}>
          <div className="row form-group">
            <div className="col-sm-5">
              <label>Select Option</label>
              <select className="form-control" onChange={e => this.setState({ votingOption: e.target.value })}>
                {this.props.pollOptions.map((option, i) => <option key={option} value={i}>{option}</option>)}
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
