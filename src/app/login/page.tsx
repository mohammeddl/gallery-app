'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      setLoading(true);
  
      try {
        const username = identifier.includes('@') 
          ? identifier.split('@')[0] 
          : identifier;
  
        console.log('Attempting login with:', { username });
  
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
        console.log('Response status:', response.status);
  
        if (!response.ok) {
          setError(data.message || 'Une erreur est survenue');
          console.error('Login error:', data);
          return;
        }
  
        if (data.token) {
          localStorage.setItem('token', data.token);
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }
          router.push('/gallery');
        } else {
          setError('Token manquant dans la réponse');
          console.error('No token in response:', data);
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('Une erreur est survenue lors de la connexion');
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-gray-600">Welcome back! Please enter your details.</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                  Email or username
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember for 30 days
                  </label>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center mt-2 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Testimonial */}
      <div className="hidden md:block md:w-1/2 bg-gray-100 relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/api/placeholder/800/600')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-12">
            <div className="text-white">
              <blockquote className="text-2xl font-medium mb-4">
                &quot;We&apos;ve been using Untitled to kick start every new project and can&apos;t imagine working without it.&quot;
              </blockquote>
              <div>
                <p className="font-semibold">Andi Lane</p>
                <p className="text-sm opacity-80">Founder, Catalog</p>
                <p className="text-sm opacity-80">Web Design Agency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;