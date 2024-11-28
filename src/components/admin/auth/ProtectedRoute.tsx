import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { LoginForm } from './LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, login, isLoading } = useAuth();
  const [error, setError] = useState<string>();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    const handleLogin = async (email: string, password: string) => {
      try {
        await login(email, password);
      } catch (error) {
        setError('Invalid email or password');
      }
    };

    return <LoginForm onLogin={handleLogin} error={error} />;
  }

  return <>{children}</>;
}