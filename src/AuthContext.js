import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ username: '', avatar_url: '', email: '' });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) fetchProfile(user.id);
    });

    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      if (currentUser) fetchProfile(currentUser.id);
      else setProfile({ username: '', avatar_url: '', email: '' });
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, avatar_url, email')
      .eq('id', userId)
      .maybeSingle();
    if (!error && data) setProfile(data);
  };

  return (
    <AuthContext.Provider value={{ user, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
