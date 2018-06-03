import React from 'react';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import { hot } from 'react-hot-loader';

import restrictAccess from 'auth/restrictAccess';
import paths from 'app/paths';
import Menu from 'app/components/Menu';
import Home from 'app/pages/Home';
import Groups from 'app/pages/Groups';
import SignIn from 'app/pages/SignIn';

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

const AppRouter = () => (
  <Router>
    <div className="perimeter">
      <Menu />
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="route-wrapper"
      >
        <Route exact path={paths.home()} component={restrictAccess(Home, SignIn)} />
        <Route exact path={paths.groups()} component={restrictAccess(Groups, SignIn)} />
        <Route exact path={paths.group(':groupKey')} component={restrictAccess(Home, SignIn)} />
      </AnimatedSwitch>
    </div>
  </Router>
);

export default hot(module)(AppRouter);
