import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { email, password });
      setMessage(response.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data?.message || 'Registration failed');
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      setMessage(response.data.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setMessage(error.response?.data?.message || 'Login failed');
      } else {
        setMessage('An unexpected error occurred');
      }
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
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}