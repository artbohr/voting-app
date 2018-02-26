import React, {Component} from 'react';
import ShowPoll from '../components/ShowPoll';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: [],
      url: 'http://localhost:5000/api/poll/'
    };
  }
/*
  changeUrl = () => {
    let url = this.state.url === 'http://localhost:5000/api/poll/' ? 'http://vote-app-000.herokuapp.com/api/poll/' : 'http://localhost:5000/api/poll/';
    this.setState({url});
  }
*/
  componentDidMount() {
    fetch('/api/polls').then(response => {
      response.json().then(data=>(this.setState({fetchedData: data})))
    }).catch(e => {
      console.log("nothing was fetched");
    })
  }

  render() {
    const polls = this.state.fetchedData.map(d =>
      <ShowPoll key={d._id} pollId={d._id} pollName={d.pollName} pollOptions={d.options} pollVotes={d.votes} url={this.state.url} redraw/>)

    return (
      <div id="pollsHolder">{/*
        <div style={{'marginBottom': '10px'}}>
           <button onClick={this.changeUrl}>local/heroku</button>
           - You are voting on {this.state.url==='http://localhost:5000/api/poll/'?
            <span style={{'fontWeight': 'bold'}}>LocalHost</span> :
            <span style={{'fontWeight': 'bold'}}>Heroku</span>} now (Change to heroku to vote)
        </div>*/}
        {polls}
      </div>
    );
  }
}

export default Home;
