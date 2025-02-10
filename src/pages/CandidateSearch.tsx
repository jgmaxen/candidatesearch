import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";

interface Candidate {
  login: string;
  name: string | null;
  avatar_url: string;
  email: string | null;
  company: string | null;
  location: string | null;
  html_url: string;
}

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCandidate();
  }, []);

  const loadCandidate = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🔍 Fetching candidate list...");
      const users = await searchGithub();

      if (Array.isArray(users) && users.length > 0) {
        const username = users[0].login;
        console.log("📌 Fetching details for:", username);
        const userDetails = await searchGithubUser(username);

        if (userDetails && userDetails.login) {
          setCandidate(userDetails);
        } else {
          throw new Error("⚠️ Invalid candidate data received");
        }
      } else {
        setCandidate(null);
      }
    } catch (err) {
      setError("❌ Failed to load candidate. Please try again.");
      console.error("⚠️ Error fetching candidate:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (candidate) {
      try {
        const savedCandidates: Candidate[] = JSON.parse(localStorage.getItem("savedCandidates") || "[]");

        // Ensure candidate is not already saved
        if (!savedCandidates.some((c) => c.login === candidate.login)) {
          localStorage.setItem("savedCandidates", JSON.stringify([...savedCandidates, candidate]));
          console.log("✅ Candidate saved:", candidate);
        } else {
          console.warn("⚠️ Candidate already saved:", candidate.login);
        }

        loadCandidate(); // Load next candidate after saving
      } catch (err) {
        console.error("⚠️ Error saving candidate:", err);
      }
    }
  };

  return (
    <main>
      <h1>Candidate Search</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
      ) : candidate ? (
        <div className="card">
          <img src={candidate.avatar_url} alt={candidate.name || "Candidate"} width="100%" style={{ borderRadius: "10px" }} />
          <h2>{candidate.name || "No Name Provided"} <em>({candidate.login})</em></h2>
          <p><strong>Location:</strong> {candidate.location || "Not available"}</p>
          <p><strong>Company:</strong> {candidate.company || "Not available"}</p>
          <p><strong>Email:</strong> 
            {candidate.email ? (
              <a href={`mailto:${candidate.email}`} style={{ color: "#00aaff" }}>
                {candidate.email}
              </a>
            ) : "Not available"}
          </p>
          <p>
            <strong>Profile:</strong> 
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" style={{ color: "#00aaff" }}>
              GitHub Profile
            </a>
          </p>
          
          <div className="button-container">
            <button className="reject" onClick={loadCandidate}>−</button>
            <button className="accept" onClick={saveCandidate}>+</button>
          </div>
        </div>
      ) : (
        <p>No candidates available.</p>
      )}
    </main>
  );
};

export default CandidateSearch;
