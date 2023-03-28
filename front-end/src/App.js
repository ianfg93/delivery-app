import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" element={ <Login /> } />
      </Switch>
    </div>
  );
}

export default App;
