export const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4e54c8, #8f94fb)",
    padding: "20px",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },

  field: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
    fontSize: "14px",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#4e54c8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    marginTop: "10px",
  },

  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "10px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },

  th: {
    background: "#4e54c8",
    color: "white",
    padding: "10px",
  },

  td: {
    padding: "10px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
  },
};
