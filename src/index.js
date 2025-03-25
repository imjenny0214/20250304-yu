import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar';
import Register from './Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'; //引入login畫面
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<h2>歡迎來到首頁</h2>} />
          <Route path="/app" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
    {/* <App /> */}
    {/* <Register /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
