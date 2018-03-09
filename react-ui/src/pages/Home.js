import React, {Component} from 'react';
import ShowPoll from '../components/ShowPoll';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: [],
      url: 'http://vote-app-000.herokuapp.com/api/poll/'
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () =>{
    fetch('/api/polls').then(response => {
      response.json().then(data=>(this.setState({fetchedData: data})))
    }).catch(e => {
      console.log("nothing was fetched");
    })
  }

  render() {
    const polls = this.state.fetchedData.map(d =>
      <ShowPoll key={d._id} pollId={d._id} pollName={d.pollName} pollOptions={d.options} pollVotes={d.votes} url={this.state.url} fetchData={this.fetchData}/>)

    return (
      <div id="pollsHolder">
        {polls}
      </div>
    );
  }
}

export default Home;
