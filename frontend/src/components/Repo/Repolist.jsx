import { useMemo } from 'react'
import Repocard from './Repocard' 
import './Repolist.css'


function Repolist({repos}) {

  console.log(repos);

  const renderedRepos = useMemo(() => (
  repos.map(repo => (
    <div key={repo.id} className="repo-card-container">
      <Repocard repo={repo}
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
