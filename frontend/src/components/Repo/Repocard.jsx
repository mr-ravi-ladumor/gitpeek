import React, {useState} from 'react';
import './Repocard.css';

import { FiEye } from "react-icons/fi";            // for the eye icon
import { HiCodeBracket } from "react-icons/hi2";   // for the language
import { GoIssueOpened } from "react-icons/go";    // for issues icon
import { GoStar } from "react-icons/go";           // for star icon
import { ImGithub } from "react-icons/im";         // for GitHub icon
import { GoRepoForked } from "react-icons/go";     // for fork icon
import { BsBookmark } from "react-icons/bs";       // for bookmark icon
import { BsBookmarkFill } from "react-icons/bs";   // for filled bookmark icon

import { formatCount, onToggleBookmark} from '../../utils/helpers.js'; 

function Repocard({ repo}) {

  // const [isBookmarked, setIsBookmarked] = useState([bookmarks.includes(repo.id)]);
  const onClickBookmark = () => {
    const bookmarkedReposIDList = onToggleBookmark(repo.id);
    // setIsBookmarked(!isBookmarked);
  }
  
  return (
    <div className="repo-card">
      <div className="repo-title-section">
        <h3 className='title'>{repo.name}</h3>
        <span className="stars">
          <span className='hidden' >stars</span>
          <GoStar /> 
          {formatCount(repo.starsCount)}
        </span>
      </div>

      <div className="description">
        <p >{repo.description}</p>
      </div>

      <div className="details">
        <span className="language">
          <span className='hidden'>language</span>
          <HiCodeBracket /> 
          {repo.language || 'N/A'}
        </span>

        <span className='watchers'>
          <span className='hidden'>watchers</span>
          <FiEye />
          {formatCount(repo.watchersCount)}
        </span>

        <span className="forks">
          <span className='hidden'>forks</span> 
          <GoRepoForked /> 
          {formatCount(repo.forksCount)}
        </span>

        <span className="open-issues"> 
          <span className='hidden'>issues</span>
          <GoIssueOpened /> 
          {formatCount(repo.openIssuesCount)}
        </span>

      </div>

      <div className='button-section'>
          <div className="bookmark-button">
            <button onClick={
                () => {onClickBookmark}}>
                  <BsBookmark/>
                {/* {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />} */}
            </button>
          </div>

          <div className="button-container">
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="github-button"
              >
            <span className="github-btn-content"> View on  <ImGithub /></span>
            </a>
          </div>

          
        </div>
    </div>
  );
}

export default Repocard;
