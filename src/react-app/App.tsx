import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmailConfirmed from './pages/EmailConfirmed';
import EmailVerificationError from './pages/EmailVerificationError';
import ResetPassword from './pages/ResetPassword';
import Policies from './pages/Policies';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/confirm-email" element={<EmailConfirmed />} />
          <Route path="/email-verification-error" element={<EmailVerificationError />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/" element={<Navigate to="/confirm-email" replace />} />
          <Route path="*" element={<Navigate to="/confirm-email" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
