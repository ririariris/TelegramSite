import React from 'react';

function DashboardPage() {
  const handleSyncTelegram = () => {
    // TODO: 서버 텔레그램 동기화 API 호출
    alert('텔레그램 동기화 시작');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto' }}>
      <h2>대시보드</h2>
      <p>텔레그램 연결 상태: 미연결</p>
      <button onClick={handleSyncTelegram} style={{ marginTop: '20px' }}>
        텔레그램 동기화
      </button>
    </div>
  );
}

export default DashboardPage;
