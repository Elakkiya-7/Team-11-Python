import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  const errorStyle = {
    background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)',
    color: '#c53030',
    padding: '24px',
    borderRadius: '16px',
    border: '2px solid #fc8181',
    margin: '20px 0',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(197, 48, 48, 0.15)'
  };

  const buttonStyle = {
    marginTop: '16px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    boxShadow: '0 4px 15px rgba(235, 51, 73, 0.3)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={errorStyle}>
      <div style={{ fontSize: '48px', marginBottom: '12px' }}>⚠️</div>
      <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '18px' }}>Oops! Something went wrong</p>
      <p style={{ margin: 0, fontSize: '15px', opacity: 0.9 }}>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🔄 Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
