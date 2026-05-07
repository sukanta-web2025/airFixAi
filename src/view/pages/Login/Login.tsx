import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import logo from '../../../assets/airFixAi_logo.jpeg';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="login-wrapper">
      {/* Background Shapes for Glass Aesthetic - Following Dashboard Style */}
      <div className="global-bg-shape global-shape-1"></div>
      <div className="global-bg-shape global-shape-2"></div>

      <style>{`
        .login-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-app);
          position: relative;
          overflow: hidden;
          transition: background var(--transition);
        }

        .login-card {
          width: 100%;
          max-width: 440px;
          padding: 48px;
          z-index: 10;
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-radius: var(--radius-xl);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          margin: 0 20px;
          transition: var(--transition);
        }

        .login-input-group {
          position: relative;
          margin-bottom: 24px;
        }

        .login-input {
          width: 100%;
          padding: 16px;
          background: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          color: var(--text-title);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .login-input:focus {
          border-color: var(--color-primary);
          background: var(--bg-card);
          box-shadow: 0 0 0 4px rgba(0, 150, 255, 0.1);
        }

        .login-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-primary);
          opacity: 0.8;
          transition: 0.3s;
          pointer-events: none;
          z-index: 2;
        }

        .login-input:focus + .login-icon {
          opacity: 1;
          color: var(--color-accent);
        }


        .submit-btn {
          width: 100%;
          padding: 16px;
          background: var(--grad-primary);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s;
          box-shadow: 0 10px 20px -5px rgba(0, 150, 255, 0.4);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 15px 30px -10px rgba(0, 150, 255, 0.6);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .loader {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="login-card">
        <div className="flex flex-column items-center mb-10">
          <div style={{
            padding: '4px',
            borderRadius: '24px',
            marginBottom: '20px',
            width: '100px',
            height: '100px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-page)',
            border: '1px solid var(--border-color)'
          }}>
            <img
              src={logo}
              alt="AirFix AI"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px'
              }}
            />
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-title)', letterSpacing: '-1.5px', marginBottom: '4px' }}>
            Air<span className="gradient-text">Fix</span> AI
          </h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.95rem' }}>
            System Administration Portal
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="login-input-group">
            <input
              type="email"
              className="login-input"
              placeholder="Email Address"
              required
              autoComplete="email"
            />
          </div>

          <div className="login-input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div style={{ marginBottom: '32px' }}></div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <div className="loader"></div> : (
              <>
                <span>Sign In to Engine</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            Empowering AC Maintenance with Intelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
