import {useState ,useEffect } from "react";
import './BookmarkList.css'; 
import Repocard from "./Repocard"


function BookmarkList({ bookmarks, onToggleBookmark }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function fetchRepos() {
      const results = [];
      for (const id of bookmarks) {
        try {
          const response = await fetch(`http://localhost:5000/api/github/repo/${id}`);
          if (!response.ok) continue;
          const data = await response.json();
          if (data.repo) results.push(data.repo);
        } catch {
          console.error(`Failed to fetch repo with ID ${id}`);
          continue;
        }
      }
      setRepos(results);
    }
    fetchRepos();
  },[]);

  function handleToggleBookmark(repoId) {
    onToggleBookmark(repoId); // updates bookmarks in App
    setRepos(prev => prev.filter(r => r.id !== repoId)); // remove from local state
  }

  return (
      <div className="container">
          <section className="bookmark-list">
            <h2 className="bookmark-title">Bookmarked Repos</h2>
            {repos.length === 0 ? (
              <p className="message">No Bookmarks yet.</p>
            ) : (
              <div className="bookmark-cards">
                {repos.map(repo => (
                  <Repocard
                    key={repo.id}
                    repo={repo}
                    bookmarks={bookmarks}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            )}
        </section>
      </div>
);
}

export default BookmarkList;