import React, { useState } from 'react';
import axios from 'axios';
import CPButton from './CPButton';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { email: username, password });
      onLogin(username, password);
      console.log(response.data);
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login error', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="grid grid-cols-1 items-center justify-center gap-3">
          <div className="flex flex-row items-center justify-center gap-2">
            <p>Username:</p>
            <input
              type="text"
              placeholder="Username"
              className="w-2/12 border-2 border-black rounded-md placeholder:px-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <p>Password:</p>
            <input
              type="password"
              placeholder="Password"
              className="w-2/12 border-2 border-black rounded-md placeholder:px-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <CPButton text="Login" />
          </div>
          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
