import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './Menu';
import Terminal from './Terminal';
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom';
import {
  HADOOP_TERMINAL_WS_URL,
  SPARK_TERMINAL_WS_URL,
  SONAR_TERMINAL_WS_URL,
} from './common/url';

const AppRoutes = () => {
  // TODO: Modify the route rules.
  return useRoutes([
    { path: '/',        element: <Menu /> },
    { path: '/hadoop',  element: <Terminal wsUrl={HADOOP_TERMINAL_WS_URL} /> },
    { path: '/spark',   element: <Terminal wsUrl={SPARK_TERMINAL_WS_URL} /> },
    { path: '/sonar',   element: <Terminal wsUrl={SONAR_TERMINAL_WS_URL} /> },
  ]);
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
