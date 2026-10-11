import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Events, { UpcomingEvents } from './pages/Events';
import Participants from './pages/Participants';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upcoming"
              element={
                <ProtectedRoute>
                  <UpcomingEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/participants"
              element={
                <ProtectedRoute>
                  <Participants />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
