import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
