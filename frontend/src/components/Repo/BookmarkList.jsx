import {useState ,useEffect } from "react";
import Repocard from "./Repocard"


function BookmarkList({ bookmarks, onToggleBookmark }) {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    console.log("useEffect")
    async function fetchRepos() {
      const results = [];
      for (const id of bookmarks) {
        try {
          const response = await fetch(`http://192.168.1.69:5000/api/github/repo/${id}`);
          if (!response.ok) continue;
          const data = await response.json();
          if (data.repo) results.push(data.repo);
        } catch {}
      }
      setRepos(results);
    }
    fetchRepos();
  },[]);

  function handleToggleBookmark(repoId) {
    console.log("hadnletoggle")
    onToggleBookmark(repoId); // updates bookmarks in App
    setRepos(prev => prev.filter(r => r.id !== repoId)); // remove from local state
  }

  return (
    <div>
      <h2>Bookmarked Repos</h2>
      {repos.length === 0 ? (
        <p>No Bookmarks yet.</p>
      ) : (
        repos.map(repo => (
          <Repocard
            key={repo.id}
            repo={repo}
            bookmarks={bookmarks}
            onToggleBookmark={handleToggleBookmark}
          />
        ))
      )}
    </div>
  );
}

export default BookmarkList;