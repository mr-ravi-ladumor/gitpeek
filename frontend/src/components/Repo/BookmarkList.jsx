import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Repocard from "./Repocard.jsx";
import './BookmarkList.css'; 
import { getBookmarks } from '../../utils/helpers.js';
import { FiBookmark, FiInbox } from 'react-icons/fi';


function BookmarkList() {
  const [bookmarkedRepos, setBookmarkedRepos] = useState(useLoaderData() || []);
  const bookmarks = getBookmarks();

  return (
    <div className="bookmark-page-section">
      <div className="bookmark-page-header">
        <div className="title-group">
          <FiBookmark className="title-icon" />
          <h2 className="bookmark-title">Bookmarked Repositories</h2>
        </div>
        <span className="bookmark-count">{bookmarkedRepos.length} saved</span>
      </div>

      {bookmarkedRepos.length === 0 ? (
        <div className="bookmark-empty-state">
          <FiInbox className="empty-icon" />
          <h3>No bookmarks saved yet</h3>
          <p>Explore projects and click the bookmark button on any repository card to save it here for quick access.</p>
        </div>
      ) : (
        <div className="bookmark-grid">
          {bookmarkedRepos.map(repo => (
            <Repocard
              key={repo.id}
              repo={repo}
              isBookmark={bookmarks.has(repo.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookmarkList;