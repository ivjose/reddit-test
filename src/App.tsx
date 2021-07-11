import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from 'pages/Home';
import Subreddit from 'pages/Subreddit';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/subreddit">
          <Subreddit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
