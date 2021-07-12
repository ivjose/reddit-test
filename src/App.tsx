import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from 'pages/Home';
import Post from 'pages/Post';
import Comment from 'pages/Comment';

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/post/:postId">
          <Post />
        </Route>
        <Route path="/comment/:commentId">
          <Comment />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
