import { useState, useEffect } from "react";

interface Candidate {
  login: string;
  name: string | null;
  avatar_url: string;
  email: string | null;
  company: string | null;
  location: string | null;
  html_url: string;
}

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
  }, []);

  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== login);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
    setSavedCandidates(updatedCandidates); // ✅ Update state after removal
  };

  return (
    <main>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.login} className="card">
              <img src={candidate.avatar_url} alt={candidate.name || "Candidate"} width="100" />
              <h2>{candidate.name || "No Name Provided"} ({candidate.login})</h2>
              <p><strong>Location:</strong> {candidate.location || "Not available"}</p>
              <p><strong>Company:</strong> {candidate.company || "Not available"}</p>
              <p>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
              </p>
              <button className="reject" onClick={() => removeCandidate(candidate.login)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved candidates.</p>
      )}
    </main>
  );
};

export default SavedCandidates;
