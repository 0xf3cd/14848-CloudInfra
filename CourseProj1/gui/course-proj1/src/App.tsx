import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './Menu';
import Terminal from './Terminal';
import {
  BrowserRouter as Router,
  useRoutes,
} from 'react-router-dom';

const AppRoutes = () => {
  // TODO: Modify the route rules.
  return useRoutes([
    { path: '/', element: <Menu /> },
    { path: '/terminal', element: <Terminal wsUrl='ws://localhost:8080' /> },
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
