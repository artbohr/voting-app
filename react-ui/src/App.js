import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom'

import Nav from './components/Nav';
import Home from './pages/Home';
import Polls from './pages/Polls';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/polls' component={Polls}/>
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
