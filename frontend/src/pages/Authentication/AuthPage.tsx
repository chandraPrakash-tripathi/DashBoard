import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (username: string,) => {
    login(username);
    navigate('/home');
  };

  const handleSignup = (username: string,) => {
    login(username);
    navigate('/home');
  };

  return (
    <div>
      <div className="flex bg-yellow-200 px-2">Login Page</div>

      <div className="mt-40">
        {isLogin ? <LoginForm onLogin={handleLogin} /> : <SignupForm onSignup={handleSignup} />}
      </div>
      <div className="flex flex-row items-center justify-center mt-2">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="border-2 bg-yellow-200 px-2 rounded-md items-center w-1/12 h-10"
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
