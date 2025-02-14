import { useState } from 'react';
import axios from 'axios';
import { 
  Routes, 
  Route, 
  useNavigate } 
from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Nav hook

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login',
        { email, password });
      setMessage(response.data.message);

      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch {
      setMessage('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleLogin}>Login</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default function App() {
  return (
      <Routes>
        <Route path = '/' element={<Login />} />
        <Route path = '/dashboard' element={<Dashboard />} />
      </Routes>
  )
}