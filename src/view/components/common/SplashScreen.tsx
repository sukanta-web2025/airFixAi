import React, { useEffect, useState } from 'react';
import logo from '../../../assets/airFixAi_logo.jpeg';

export const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    // Completely remove after fade out animation (0.5s)
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--bg-page)', // Solid opaque base
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.6s ease-in-out',
      opacity: isFading ? 0 : 1,
      pointerEvents: isFading ? 'none' : 'all'
    }}>
      {/* Opaque Gradient Overlay that follows theme */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--bg-app)',
        opacity: 1, // Ensure it's opaque
        zIndex: -1
      }}></div>
      {/* Dynamic Background Shapes with Accent Color tint */}
      <div className="global-bg-shape global-shape-1" style={{ opacity: 0.1, background: 'var(--color-primary)' }}></div>
      <div className="global-bg-shape global-shape-2" style={{ opacity: 0.1, background: 'var(--color-accent)' }}></div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        animation: 'splashPulse 2s ease-in-out infinite'
      }}>
        <div style={{
          width: '160px',
          height: '160px',
          borderRadius: '40px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          border: '2px solid var(--color-primary)',
          background: 'var(--bg-card)',
          padding: '4px'
        }}>
          <img 
            src={logo} 
            alt="AirFix AI" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px' }} 
          />
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '2.8rem', 
            fontWeight: 900, 
            color: 'var(--text-title)', 
            letterSpacing: '-2px',
            margin: 0
          }}>
            Air<span className="gradient-text">Fix</span> AI
          </h1>
          <p style={{ 
            color: 'var(--text-muted)', 
            fontWeight: 700, 
            fontSize: '0.95rem',
            marginTop: '8px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            opacity: 0.8
          }}>
            Initializing Intelligence
          </p>
        </div>

        {/* Loading Indicator following Accent Color */}
        <div style={{
          marginTop: '40px',
          width: '240px',
          height: '4px',
          background: 'var(--border-color)',
          borderRadius: '10px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            background: 'var(--grad-primary)',
            width: '45%',
            borderRadius: '10px',
            boxShadow: '0 0 10px var(--color-primary)',
            animation: 'splashLoading 1.8s ease-in-out infinite'
          }}></div>
        </div>
      </div>

      <style>{`
        @keyframes splashPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.02); opacity: 0.95; }
        }
        @keyframes splashLoading {
          0% { left: -40%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};
