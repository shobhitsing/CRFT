import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface SignInPageProps {
  onSignInSuccess: () => void;
  onBackToApp?: () => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({
  onSignInSuccess,
  onBackToApp,
}) => {
  const [email, setEmail] = useState('regulatory.director@dkhoon.ae');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSignInSuccess();
    }, 500);
  };

  return (
    <div className="crft-signin-universe">
      <div className="signin-topbar">
        <div className="flex items-center gap-3">
          <div className="signin-logo-badge">CR</div>
          <span className="signin-brand-text">CRFT UNIVERSE</span>
        </div>

        {onBackToApp && (
          <button
            type="button"
            onClick={onBackToApp}
            className="flex items-center gap-2 text-xs text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </button>
        )}
      </div>

      <div className="signin-card-container">
        <div className="signin-glass-card">
          <h1 className="signin-title">Sign in</h1>
          <p className="signin-subtitle">
            You will only see what your company has signed for.
          </p>

          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Corporate ID or email"
                className="signin-input"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="signin-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="signin-submit-btn"
            >
              {loading ? 'Authenticating with Hardware Key...' : 'Sign in'}
            </button>
          </form>

          <p className="signin-footer-notice">
            Two-factor is on. Your workspace is held in the United Kingdom. Every view, download and change carries your name.
          </p>
        </div>
      </div>
    </div>
  );
};
