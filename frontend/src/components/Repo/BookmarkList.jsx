import {useState ,useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Repocard from "./Repocard.jsx"
import './BookmarkList.css'; 
import { getBookmarks } from '../../utils/helpers.js';

let updateBookmarkList
function BookmarkList() {

  const [bookmarkedRepos, setBookmarkedRepos] = useState(useLoaderData());
  const bookmarks = getBookmarks();
  
  updateBookmarkList = (repoId) => {
    setBookmarkedRepos(prev => prev.filter(repo => repo.id !== repoId));
  }

  return (
      <div className="container">
          <section className="bookmark-list">
            <h2 className="bookmark-title">Bookmarked Repos</h2>
            {bookmarkedRepos.length === 0 ? (
              <p className="message">No Bookmarks yet.</p>
            ) : (
              <div className="bookmark-cards">
                {bookmarkedRepos.map(repo => (
                  <Repocard
                    key={repo.id}
                    repo={repo}
                    isBookmark={bookmarks.includes(repo.id)}
                  />
                ))}
              </div>
            )}
        </section>
      </div>
);
}

export default BookmarkList;
export {updateBookmarkList};
