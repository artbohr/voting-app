import React from 'react';
import {Pie} from 'react-chartjs-2';

class ShowForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       votingOption: 0,
       addOptions: ""
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

  addOptions = (e) => {
    e.preventDefault();

    const url = `${this.props.url}${this.props.pollId}`;
    const optionsArr = JSON.parse(JSON.stringify(this.props.pollOptions));
    optionsArr.push(this.state.addOptions);

    this.setState({addOptions: ""})

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({"options" : optionsArr}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => alert("Option Added!"))
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
        <button type="button" className="close" onClick={this.deletePoll}>
          <span aria-hidden="true">Delete</span>
        </button>
      </div>
      <div className="panel-body">
        <form>
          <div className="row form-group">
            <div className="col-sm-5">
              <label>Select Option</label>
              <select className="form-control" onChange={e => this.setState({ votingOption: e.target.value })}>
                {this.props.pollOptions.map((option, i) => <option key={option} value={i}>{option}</option>)}
              </select>
              <br/>
              <button onClick={this.submitVote} className='btn btn-block btn-primary center-block'>Vote</button>
              <div style={{display:'flex'}}>
                <input style={{marginTop:'15px'}} onChange={e => this.setState({ addOptions: e.target.value })} placeholder='Add another option' className='form-control'/> <br />
                <button style={{margin:'15px'}} className="btn btn-primary" onClick={this.addOptions}>Add</button>
              </div>
            </div>
            <div className="col-sm-5">
              <Pie data={data} width={20} height={5}/>
            </div>
          </div>
        </form>
      </div>
    </div>)
  }
}

export default ShowForm;
