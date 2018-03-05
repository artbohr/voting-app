import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom'

import Navigation from './components/Navigation';
import Home from './pages/Home';
import Polls from './pages/Polls';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/polls' component={Polls}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
