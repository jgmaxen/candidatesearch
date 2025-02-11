import { CSSProperties } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <nav style={navStyle as CSSProperties}>
      <ul style={navListStyle}>
        <li>
          <button
            onClick={() => handleNavigate("/")}
            style={location.pathname === "/" ? activeLinkStyle : linkStyle}
          >
            Search Candidates
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigate("/saved")}
            style={location.pathname === "/saved" ? activeLinkStyle : linkStyle}
          >
            Saved Candidates
          </button>
        </li>
      </ul>
    </nav>
  );
};

// 🔹 Fixed TypeScript Styles (Moves Navigation to Top Left)
const navStyle: CSSProperties = {
  position: "absolute", // ✅ Fixes TypeScript error
  top: 10, // ✅ Numbers work without "px"
  left: 20, // ✅ Ensures proper positioning
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "transparent", // ✅ No background
};

const navListStyle: CSSProperties = {
  listStyle: "none",
  display: "flex",
  gap: "15px",
  padding: 0,
  margin: 0,
};

const linkStyle: CSSProperties = {
  color: "white",
  background: "none",
  border: "none",
  fontSize: "18px",
  padding: "8px 12px",
  cursor: "pointer",
  transition: "color 0.3s",
};

// 🔹 Highlights Active Page with Text Only (No Background)
const activeLinkStyle: CSSProperties = {
  ...linkStyle,
  fontWeight: "bold",
  textDecoration: "underline",
};

export default Nav;
