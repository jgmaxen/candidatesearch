import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import CandidateSearch from "./pages/CandidateSearch";
import SavedCandidates from "./pages/SavedCandidates";
import NotFound from "./pages/NotFound"; // Ensure this file exists

function App() {
  return (
    <>
      <Nav />
      <main style={mainStyle}>
        <Routes>
          <Route path="/" element={<CandidateSearch />} />
          <Route path="/saved" element={<SavedCandidates />} />
          {/* Catch-all wildcard route for invalid paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

const mainStyle = {
  padding: "20px",
  maxWidth: "800px",
  margin: "0 auto",
};

export default App;
