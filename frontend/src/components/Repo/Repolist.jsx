import { useMemo } from 'react'
import Repocard from './Repocard' 
import './Repolist.css'


function Repolist({reposlist,bookmarks, onToggleBookmark}) {

  const renderedRepos = useMemo(() => (
  reposlist.map(repo => (
    <div key={repo.id} className="repo-card-container">
      <Repocard repo={repo}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
       />
    </div>
  ))
), [reposlist]);

return (
  <div className="container">
    <h2 className="repolist-title">Repositories</h2>  
    <div className="repolist-container">
      {reposlist.length === 0 ? (
        <p>No repositories found. Please Try to Refresh Page </p>
      ) : renderedRepos}
    </div>
  </div>
);

}

export default Repolist
