import { useState } from 'react';
import './Repocard.css';

import { FiEye } from "react-icons/fi";            // for watchers icon
import { GoIssueOpened } from "react-icons/go";    // for issues icon
import { GoStar } from "react-icons/go";           // for star icon
import { ImGithub } from "react-icons/im";         // for GitHub icon
import { GoRepoForked } from "react-icons/go";     // for fork icon
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

import { formatCount, onToggleBookmark } from '../../utils/helpers.js'; 
import { languageColors } from '../../utils/constants.js';


function Repocard({ repo, isBookmark}) {
  const [isBookmarked, setIsBookmarked] = useState(isBookmark);

  const onClickBookmark = () => {
    onToggleBookmark(repo.id, isBookmarked);
    setIsBookmarked(!isBookmarked);
  };

  const langColor = languageColors[repo.language] || '#8b949e';

  return (
    <div className="repo-card">
      <div className="repo-card-header">
        <h3 className="repo-title" title={repo.name}>
          <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
        </h3>
        <div className="repo-stars-badge" title={`${repo.starsCount} Stars`}>
          <GoStar className="star-icon" />
          <span>{formatCount(repo.starsCount)}</span>
        </div>
      </div>

      <p className="repo-description">
        {repo.description || "No description provided for this repository."}
      </p>

      <div className="repo-meta-row">
        <div className="meta-item language-item" title={`Language: ${repo.language || 'N/A'}`}>
          <span className="lang-color-dot" style={{ backgroundColor: langColor }}></span>
          <span className="lang-text">{repo.language || 'N/A'}</span>
        </div>

        <div className="meta-stats-group">
          <div className="meta-item" title={`${repo.forksCount} Forks`}>
            <GoRepoForked />
            <span>{formatCount(repo.forksCount)}</span>
          </div>

          <div className="meta-item" title={`${repo.watchersCount} Watchers`}>
            <FiEye />
            <span>{formatCount(repo.watchersCount)}</span>
          </div>

          <div className="meta-item" title={`${repo.openIssuesCount} Open Issues`}>
            <GoIssueOpened />
            <span>{formatCount(repo.openIssuesCount)}</span>
          </div>
        </div>
      </div>

      <div className="repo-card-footer">
        <button 
          type="button"
          className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={onClickBookmark}
          title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
        >
          {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
          <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>

        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link-btn"
        >
          <span>View on</span>
          <ImGithub />
        </a>
      </div>
    </div>
  );
}

export default Repocard;
