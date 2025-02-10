import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={navStyle}>
      <h1>GitHub Candidate Search</h1>
      <ul style={navListStyle}>
        <li>
          <Link to="/" style={linkStyle}>Search Candidates</Link>
        </li>
        <li>
          <Link to="/saved" style={linkStyle}>Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

// Basic inline styles (optional, replace with CSS if needed)
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#282c34",
  color: "white",
};

const navListStyle = {
  listStyle: "none",
  display: "flex",
  gap: "20px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
};

export default Nav;
