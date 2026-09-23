import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Mock authentication
    if (
      email === 'admin@techstore.com' &&
      password === 'admin123'
    ) {
      onLogin({
        name: 'Admin User',
        email
      });
    } else {
      setError(
        'Invalid credentials. Use the demo credentials shown below.'
      );
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔐</div>

          <h2>Welcome Back</h2>

          <p>
            Sign in to manage your TechStore dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">
              Email
            </label>

            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="admin@techstore.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
          >
            🔐 Sign In
          </button>
        </form>

        <div className="demo-credentials">
          <strong>Demo credentials</strong>

          <p>
            Email: admin@techstore.com
          </p>

          <p>
            Password: admin123
          </p>
        </div>
      </div>
    </main>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};

export default Login;