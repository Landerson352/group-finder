import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';

import restrictAccess from 'auth/restrictAccess';
import ScrollToTop from 'app/components/ScrollToTop';
import paths from 'app/paths';
import Menu from 'app/components/Menu';
import Home from 'app/pages/Home';
import Groups from 'app/pages/Groups';
import SignIn from 'app/pages/SignIn';

const AppRouter = () => (
  <Router>
    <div className="content-inner">
      <ScrollToTop />
      <Menu />
      <Route exact path={paths.home()} component={restrictAccess(Home, SignIn)} />
      <Route exact path={paths.groups()} component={restrictAccess(Groups, SignIn)} />
      <Route exact path={paths.group(':groupKey')} component={restrictAccess(Home, SignIn)} />
    </div>
  </Router>
);

export default hot(module)(AppRouter);
