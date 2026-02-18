import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px 20px',
    minHeight: '300px'
  };

  const spinnerContainerStyle = {
    position: 'relative',
    width: '80px',
    height: '80px'
  };

  const spinnerStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  const spinnerInnerStyle = {
    position: 'absolute',
    width: '60px',
    height: '60px',
    top: '10px',
    left: '10px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite reverse'
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerContainerStyle}>
        <div style={{
          ...spinnerStyle,
          borderTopColor: '#764ba2'
        }}></div>
        <div style={spinnerInnerStyle}></div>
      </div>
      <p style={{ 
        marginTop: '24px', 
        color: '#667eea',
        fontSize: '16px',
        fontWeight: '600',
        letterSpacing: '0.5px'
      }}>
        {message}
      </p>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
