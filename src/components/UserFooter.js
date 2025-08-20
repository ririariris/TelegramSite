import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function UserFooter() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 10,
      right: 10,
      padding: '10px',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '10px',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    }}
    onClick={() => navigate('/profile')}
    >
      <img
        src={profile.avatar_url || '/default-avatar.png'}
        alt="avatar"
        style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
      />
      <span>{profile.username || '닉네임 없음'}</span>
    </div>
  );
}
