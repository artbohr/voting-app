import React, {Component} from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/api').then(response => {
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      return response.json();
    }).then(json => {
      this.setState({message: json.message, fetching: false});
    }).catch(e => {
      this.setState({message: `API call failed: ${e}`, fetching: false});
    })
  }

  render() {
    return (
      <div>
        <p>
          {this.state.fetching? 'Fetching message from API': this.state.message}
        </p>
      </div>
    );
  }
}

export default Home;
