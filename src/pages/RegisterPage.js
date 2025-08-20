// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { alert(error.message); return; }

    localStorage.setItem('tempUsername', username);
    localStorage.setItem('tempEmail', email);
  
    alert('회원가입 완료! 이메일 확인 후 로그인해주세요.');
    navigate('/'); // 로그인 페이지로 이동
  };
  

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>회원가입</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="닉네임"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleRegister} style={{ width: '100%' }}>
        회원가입
      </button>
    </div>
  );
};

export default RegisterPage;
