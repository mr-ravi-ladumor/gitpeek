import React from 'react';

import './Home.css';
import SeachFilter from '../SearchFilter/SearchFilter.jsx';
import Repolist from '../Repo/RepoList.jsx';

function Home({
  repos,
  currentPage,
  setCurrentPage,
  selectedStar,
  setSelectedStar,
  selectedLanguages,
  setSelectedLanguages,
  selectedTopics,
  setSelectedTopics,
  selectedSort,
  setSelectedSort,
  totalPages,
  bookmarks,
  onToggleBookmark
}) {
  return (
    <div className='home'>
      <div className="home-header">
        <h1>Welcome to GitPeek</h1>
        <p>Discover and bookmark amazing open-source GitHub projects. Join the community and start contributing today!</p>
        {/* <button className="explore-btn">Explore Projects</button> */}
      </div>
      <SeachFilter
        selectedStar={selectedStar}
        setSelectedStar={setSelectedStar}
        selectedLanguages={selectedLanguages}
        setSelectedLanguages={setSelectedLanguages}
        selectedTopics={selectedTopics}
        setSelectedTopics={setSelectedTopics}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        setCurrentPage={setCurrentPage}
      />
      <Repolist reposlist={repos} bookmarks={bookmarks} onToggleBookmark={onToggleBookmark} />
      <div className="pagination-controls">
        <button className="prev-button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previ
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button className="next-button"
          disabled={repos.length < 30}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home
