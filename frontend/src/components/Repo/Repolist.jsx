import { useMemo } from 'react';
import Repocard from './Repocard';
import './Repolist.css';
import { getBookmarks } from '../../utils/helpers.js';
import { FiInbox } from 'react-icons/fi';

function Repolist({ repos }) {
  const bookmarks = getBookmarks();

  const renderedRepos = useMemo(() => (
    repos.map(repo => (
      <Repocard 
        key={repo.id}
        repo={repo}
        isBookmark={bookmarks.has(repo.id)}
      />
    ))
  ), [repos]);

  return (
    <div className="repolist-section">
      <div className="repolist-header">
        <h2 className="repolist-title">Repositories</h2>
        {repos.length > 0 && (
          <span className="repolist-count">{repos.length} items on this page</span>
        )}
      </div>

      {repos.length === 0 ? (
        <div className="repolist-empty-state">
          <FiInbox className="empty-icon" />
          <h3>No repositories found</h3>
          <p>Try adjusting your search filters or clearing active selections to find repositories.</p>
        </div>
      ) : (
        <div className="repolist-grid">
          {renderedRepos}
        </div>
      )}
    </div>
  );
}

export default Repolist;
