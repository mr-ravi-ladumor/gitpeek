import { useMemo } from 'react'
import Repocard from './Repocard' 
import './Repolist.css'


function Repolist({reposlist,bookmarks, onToggleBookmark}) {
  // return (
  //     <div className="container">
  //       <h2 className="repolist-title">Repositories</h2>  
  //       <div className="repolist-container">
  //     {
  //       reposlist.length === 0 ? (
  //         <p>No repositories found.</p>
  //       ) :
  //       reposlist.map((repo) => {
  //         return (
  //           <div key={repo.id} className="repo-card-container">
  //             <Repocard repo={repo} />
  //           </div>
  //         )
  //       })
  //     }
  //   </div>
  //     </div>
  // )


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
        <p>No repositories found.</p>
      ) : renderedRepos}
    </div>
  </div>
);

}

export default Repolist
