import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
    if (error) { alert(error.message); return; }
  
    const userId = data.user.id;
    const emailTemp = localStorage.getItem('tempEmail') || email;
    const username = localStorage.getItem('tempUsername') || 'Anonymous';
  
    const { data: profileData } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .maybeSingle();
  
      if (!profileData) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: userId, username, email: emailTemp }]);
        if (profileError) { alert(profileError.message); return; }
      }

    localStorage.removeItem('tempUsername');
    localStorage.removeItem('tempEmail');
  
    navigate('/dashboard');
  };
  

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>로그인</h2>
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
      <button onClick={handleLogin} style={{ width: '100%' }}>
        로그인
      </button>
      <p>
        계정이 없나요? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/register')}>회원가입</span>
      </p>
    </div>
  );
}

export default LoginPage;
