import React, {Component} from 'react';

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
      <ul key={d._id}>PollName: {d.pollName} <br/> Options: {d.options.map(option => <li key={option}>{option}</li>)}</ul>)

    return (
      <div>
        {polls}
      </div>
    );
  }
}

export default Home;
