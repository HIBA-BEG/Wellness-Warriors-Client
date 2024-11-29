import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Events from './pages/Events';
import Participants from './pages/Participants';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
// import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/events" element={<Events />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
