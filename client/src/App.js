import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { List, Shorten, Home, Login } from './pages';
import Template from './components/Template';

class App extends Component {
  render() {
    return (
      <div>
        <Template />
        <Route exact path="/" component={Home} />
        <Switch>
          <Route path="/list" component={List} />
          <Route path="/shorten" component={Shorten} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
