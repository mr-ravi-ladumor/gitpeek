import {useState ,useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Repocard from "./Repocard.jsx"
import './BookmarkList.css'; 
import { onToggleBookmark } from '../../utils/helpers.js';


function BookmarkList() {

  const [repos, setRepos] = useState(useLoaderData());
  console.log(repos);

  // useEffect(() => {
  //   async function fetchRepos() {
  //     const results = [];
  //     for (const id of bookmarks) {
  //       try {
  //         const response = await fetch(`http://localhost:5000/api/github/repo/${id}`);
  //         if (!response.ok) continue;
  //         const data = await response.json();
  //         if (data.repo) results.push(data.repo);
  //       } catch {
  //         console.error(`Failed to fetch repo with ID ${id}`);
  //         continue;
  //       }
  //     }
  //     setRepos(results);
  //   }
  //   fetchRepos();
  // },[]);


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
                  />
                ))}
              </div>
            )}
        </section>
      </div>
);
}

export default BookmarkList;