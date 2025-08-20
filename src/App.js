import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedLayout from './ProtectedLayout';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedLayout>
                <DashboardPage />
              </ProtectedLayout>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedLayout>
                <ProfilePage />
              </ProtectedLayout>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
