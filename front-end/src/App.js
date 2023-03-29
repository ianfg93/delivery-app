import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Navigate to="/login" /> } />
        <Route path="/login" element={ <Login /> } />
      </Routes>
    </div>
  );
}

export default App;
