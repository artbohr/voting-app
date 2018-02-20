import React, {Component} from 'react';
import ShowPoll from '../components/ShowPoll';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: []
    };
  }

  componentDidMount() {
    fetch('/api/polls').then(response => {
      response.json().then(data=>(this.setState({fetchedData: data})))
    }).catch(e => {
      console.log("nothing was fetched");
    })
  }

  render() {
    const polls = this.state.fetchedData.map(d =>
      <ShowPoll key={d._id} pollName={d.pollName} pollOptions={d.options.map(option => <option key={option}>{option}</option>)}/>)

    return (
      <div>
        {polls}
      </div>
    );
  }
}

export default Home;
