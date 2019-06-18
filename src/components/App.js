import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import history from '../constants/history';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Home from './Home/index';
import Article from './Article/index';
import Profile from './Profile/index';
import Settings from './Settings';
import PostComposer from './PostComposer';

class App extends React.Component {
  render() {
    const currentUser = this.props.currentUser;
    return (
      <div>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} currentUser={currentUser} />
            <Route
              exact
              path="/register"
              component={Register}
              currentUser={currentUser}
            />
            <Route path="/login" component={Login} currentUser={currentUser} />
            <Route
              path="/settings"
              component={Settings}
              currentUser={currentUser}
            />
            <Route
              path="/editor"
              component={PostComposer}
              currentUser={currentUser}
            />
            <Route
              path="/article/:id"
              component={Article}
              currentUser={currentUser}
            />
            <Route path="/@:id" component={Profile} currentUser={currentUser} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect()(App);
