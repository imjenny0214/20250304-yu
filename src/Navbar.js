import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">首頁</Link></li>
        <li><Link to="/app">App</Link></li>
        <li><Link to="/register">註冊</Link></li>
        <li><Link to="/login">登入</Link></li>{/*新增登入連結*/}
      </ul>
    </nav>
  );
}

export default Navbar;
