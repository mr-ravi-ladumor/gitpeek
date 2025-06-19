import { useMemo } from 'react'
import Repocard from './Repocard' 
import './Repolist.css'
import { getBookmarks } from '../../utils/helpers.js';


function Repolist({repos}) {

  const bookmarks = getBookmarks();

  const renderedRepos = useMemo(() => (
  repos.map(repo => (
    <div key={repo.id} className="repo-card-container">
      <Repocard 
        repo={repo}
        isBookmark={bookmarks.includes(repo.id)}
       />
    </div>
  ))
), [repos]);

return (
  <div className="container">
    <h2 className="repolist-title">Repositories</h2>  
    <div className="repolist-container">
      {repos.length === 0 ? (
        <p>No repositories found. Please Try to Refresh Page </p>
      ) : renderedRepos}
    </div>
  </div>
);

}

export default Repolist
