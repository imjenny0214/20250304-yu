import React, { useState } from 'react';
import supabase from './supabaseClient'; // 引入 Supabase 客戶端

function Login() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // 存儲當前登入用戶
  const [newName, setNewName] = useState('');
  const [newAccount, setNewAccount] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // 處理登入
  const handleLogin = async (e) => {
    e.preventDefault();

    // 查詢資料表檢查帳號和密碼是否匹配
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('account', account)
      .eq('password', password)
      .single();  // 使用 .single() 來保證只回傳一個結果

    if (error) {
      setMessage('登入失敗，請檢查帳號和密碼');
    } else if (data) {
      setCurrentUser(data); // 設定當前用戶資料
      setNewName(data.name);
      setNewAccount(data.account);
      setMessage("登入成功，歡迎 " + data.name);
    } else {
      setMessage('找不到這個帳號，請註冊');
    }
  };

  // 更新用戶資料
  const handleUpdate = async (e) => {
    e.preventDefault();

    // 確認用戶資料
    if (!newName || !newAccount || !newPassword) {
      setMessage('請填寫所有欄位');
      return;
    }

    // 更新用戶資料
    const { data, error } = await supabase
      .from('users')
      .update({ name: newName, account: newAccount, password: newPassword })
      .eq('id', currentUser.id);

    if (error) {
      setMessage("更新失敗: " + error.message);
    } else {
      // 更新成功，更新當前用戶的資料並顯示成功訊息
      setCurrentUser({ ...currentUser, name: newName, account: newAccount });
      setMessage('資料更新成功！');
    }
  };

  // 刪除帳號
  const handleDeleteAccount = async () => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', currentUser.id);

    if (error) {
      setMessage("刪除失敗: " + error.message);
    } else {
      setMessage('帳號已刪除');
      setCurrentUser(null); // 登出並清空當前用戶資料
    }
  };

  return (
    <div className="container mt-4">
      <h2>登入</h2>
      {!currentUser ? (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>帳號：</label>
            <input
              type="text"  // 修改為 text 類型
              className="form-control"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>密碼：</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">登入</button>
        </form>
      ) : (
        // 如果已經登入，顯示用戶資料並允許修改
        <div>
          <h3>當前使用者：{currentUser.name}</h3>
          <h4>修改用戶資料</h4>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>名稱：</label>
              <input
                type="text"
                className="form-control"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>帳號：</label>
              <input
                type="text"  // 修改為 text 類型
                className="form-control"
                value={newAccount}
                onChange={(e) => setNewAccount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>新密碼：</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">更新資料</button>
          </form>

          <button
            className="btn btn-danger mt-2"
            onClick={handleDeleteAccount} // 點擊後刪除帳號
          >
            刪除帳號
          </button>

          <button
            className="btn btn-secondary mt-2 ml-2"
            onClick={() => setCurrentUser(null)} // 登出
          >
            登出
          </button>
        </div>
      )}

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default Login;
