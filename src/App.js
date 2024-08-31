import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './pages/login';
import Success from './pages/success';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
