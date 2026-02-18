export const styles = {
  // Page Layout
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "0",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  pageLight: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "20px",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  // Container
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px",
  },

  // Cards
  card: {
    background: "white",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    marginBottom: "20px",
    border: "1px solid rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  },

  centerCard: {
    maxWidth: "480px",
    margin: "60px auto",
    background: "white",
    padding: "48px",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  // Dashboard Cards
  dashboardCard: {
    background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
    padding: "32px",
    borderRadius: "16px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "2px solid transparent",
  },

  // Stat Cards with Gradients
  statCardBlue: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.35)",
    transition: "all 0.3s ease",
  },

  statCardOrange: {
    background: "linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)",
    color: "white",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(242, 153, 74, 0.35)",
    transition: "all 0.3s ease",
  },

  statCardGreen: {
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    color: "white",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(56, 239, 125, 0.35)",
    transition: "all 0.3s ease",
  },

  statCardRed: {
    background: "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)",
    color: "white",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(235, 51, 73, 0.35)",
    transition: "all 0.3s ease",
  },

  statCardPurple: {
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    color: "#333",
    padding: "28px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(168, 237, 234, 0.35)",
    transition: "all 0.3s ease",
  },

  // Input Fields
  input: {
    width: "100%",
    padding: "16px 20px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "2px solid #e0e0e0",
    fontSize: "15px",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  },

  // Buttons
  button: {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
    width: "auto",
  },

  buttonSecondary: {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(245, 87, 108, 0.4)",
    width: "auto",
  },

  buttonSuccess: {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(56, 239, 125, 0.4)",
    width: "auto",
  },

  buttonDanger: {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(235, 51, 73, 0.4)",
    width: "auto",
  },

  buttonWarning: {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #f2994a 0%, #f2c94c 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(242, 153, 74, 0.4)",
    width: "auto",
  },

  buttonGray: {
    padding: "16px 32px",
    background: "linear-gradient(135deg, #868f96 0%, #596164 100%)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(134, 143, 150, 0.4)",
    width: "auto",
  },

  buttonOutline: {
    padding: "16px 32px",
    background: "transparent",
    color: "#667eea",
    border: "2px solid #667eea",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    width: "auto",
  },

  // Grid Layouts
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginTop: "24px",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "24px",
    marginTop: "24px",
  },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    marginTop: "24px",
  },

  // Navbar
  navbar: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },

  // Page Header
  pageHeader: {
    marginBottom: "40px",
    paddingBottom: "24px",
    borderBottom: "3px solid #f0f0f0",
  },

  // Responsive breakpoints
  '@media (max-width: 768px)': {
    grid: {
      gridTemplateColumns: "1fr",
    },
    grid3: {
      gridTemplateColumns: "1fr",
    },
    centerCard: {
      padding: "32px 24px",
      margin: "20px",
    },
  },
};

// CSS for hover effects and animations
export const globalStyles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }

  button:active {
    transform: translateY(0);
  }

  input:focus {
    border-color: #667eea;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 48px rgba(0,0,0,0.15);
  }

  .dashboard-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.2);
    border-color: #667eea;
  }

  .stat-card:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
