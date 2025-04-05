import React from 'react';
import './SignIn.css';

function SignIn({ onSwitchToSignUp }) {
  return (
    <div className="signin-page">
      <div className="signin-header">
        <h1 className="signin-title">Welcome</h1>
        <p className="signin-subtitle">Please sign in or create an account</p>
      </div>

      <div className="signin-form-container">
        <form className="signin-form">
          <div className="input-group">
            <label htmlFor="code">Code</label>
            <input
              type="text"
              id="code"
              className="input-field"
              placeholder="Enter your code"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Enter your password"
            />
          </div>

          <button type="button" className="signin-button">
            Sign in
          </button>

          <p className="signup-message">
            Don't have an account : <span className="signup-link" onClick={onSwitchToSignUp}>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
