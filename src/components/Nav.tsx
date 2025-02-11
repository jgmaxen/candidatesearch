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
    <nav style={navStyle}>
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

// 🔹 Updated Styles - No Background on Buttons
const navStyle = {
  display: "flex",
  justifyContent: "center",
  padding: "10px",
  backgroundColor: "transparent", // ✅ Removes black background
};

const navListStyle = {
  listStyle: "none",
  display: "flex",
  gap: "20px",
  padding: 0,
};

const linkStyle = {
  color: "white",
  background: "none", // ✅ Removes any background
  border: "none",
  fontSize: "18px",
  padding: "8px 12px",
  cursor: "pointer",
  transition: "color 0.3s",
};

// 🔹 Highlights Active Page with Text Only (No Background)
const activeLinkStyle = {
  ...linkStyle,
  fontWeight: "bold",
  textDecoration: "underline", // ✅ Highlights text instead of background
};

export default Nav;
