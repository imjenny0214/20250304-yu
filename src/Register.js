import React, { useState } from 'react';
import supabase from './supabaseClient';

function Register() {
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // 處理註冊邏輯
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ name, account, password }]);

      if (error) throw error;

      setMessage('註冊成功');
      setName('');
      setAccount('');
      setPassword('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="Register">
      <h2>註冊帳號</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">姓名：</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="account">帳號：</label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">密碼：</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">註冊</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
