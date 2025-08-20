import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../AuthContext';

function ProfilePage() {
    const { user, profile, setProfile } = useAuth();
    const [newUsername, setNewUsername] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchProfile = async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, email, avatar_url')
                .eq('id', user.id)
                .maybeSingle();
            if (!error && data) {
                setProfile(data);
                setNewUsername(data.username);
            }
            setLoading(false);
        };
        fetchProfile();
    }, [user, setProfile]);

    const handleUpdate = async () => {
        if (!user) return;

        let avatarUrl = profile.avatar_url;

        if (avatarFile) {
            const extension = avatarFile.name.split('.').pop();
            const safeFileName = `${user.id}-${Date.now()}.${extension}`;
            const filePath = `${user.id}/${safeFileName}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, avatarFile, { upsert: true });

            if (uploadError) { alert(uploadError.message); return; }

            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(uploadData.path);
            avatarUrl = publicUrl;
        }

        const { error } = await supabase
            .from('profiles')
            .update({ username: newUsername, avatar_url: avatarUrl })
            .eq('id', user.id);

        if (error) { alert(error.message); return; }

        // context 갱신
        setProfile({ ...profile, username: newUsername, avatar_url: avatarUrl });
        alert('프로필 업데이트 완료!');
    };

    if (loading) return <p>로딩중...</p>;

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>내 프로필</h2>
            <img src={profile.avatar_url || '/default-avatar.png'} alt="avatar" width={100} height={100} />
            <input type="file" accept=".png, .jpg, .jpeg" onChange={(e) => setAvatarFile(e.target.files[0])} />
            <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="닉네임"
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <input
                type="text"
                value={profile.email}
                disabled
                style={{ width: '100%', marginBottom: '10px' }}
            />
            <button onClick={handleUpdate} style={{ width: '100%' }}>프로필 업데이트</button>
        </div>
    );
}

export default ProfilePage;
