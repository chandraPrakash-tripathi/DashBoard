
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import AuthPage from './pages/Authentication/AuthPage';
import AddEmployee from './pages/AddEmployee/AddEmployee';
import ViewEmployees from './pages/ViewEmployee/ViewEmployee';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <div>Logo</div>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/employeelist"
              element={
                <PrivateRoute>
                  <ViewEmployees />
                </PrivateRoute>
              }
            />
            <Route
              path="/createemployee"
              element={
                <PrivateRoute>
                  <AddEmployee />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
