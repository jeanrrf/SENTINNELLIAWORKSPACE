import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CustomerRegistrationPage from './components/CustomerRegistrationPage';
import CustomerManagementPage from './components/CustomerManagementPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/register" component={CustomerRegistrationPage} />
        <Route path="/customers" component={CustomerManagementPage} />
      </Switch>
    </Router>
  );
};

export default App;
