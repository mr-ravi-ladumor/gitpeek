import React, {useState, useEffect} from 'react';

import './Home.css';
import SeachFilter from '../SearchFilter/SearchFilter.jsx';
import Repolist from '../Repo/RepoList.jsx';

function Home() {
  // State to hold fetched repositories
  const [repos, setRepos] = useState([]);

  // Filter states
  const [selectedStar, setSelectedStar] = useState('Any');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSort, setSelectedSort] = useState(
    {
        value: '',
        order: ''
    }
);

  // Pagination states  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // Fetch repos when filters or page changes
  useEffect(() => {

    const params = new URLSearchParams();

    if (selectedStar !== 'Any') params.append('stars', selectedStar);
    if (selectedLanguages.length > 0) params.append('languages', selectedLanguages.join(','));
    if (selectedTopics.length > 0) params.append('topics', selectedTopics.join(','));
    params.append('page', currentPage);
    params.append('per_page', 30);
    if (selectedSort.value && selectedSort.order) {
      params.append('sort', selectedSort.value);
      params.append('order', selectedSort.order);
    }

    (async () => {
      try {
        // Fetch repos from the backend API
        const response = await fetch(`http://localhost:5000/api/github/repos?${params}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setRepos(data.repos);
        setTotalPages(Math.ceil(data.total_count / 30));
      } catch (error) {
        console.log('Error fetching repos:', error.message);
      }
    })();
  }, [ selectedStar, selectedLanguages, selectedTopics, currentPage, selectedSort]);


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
      <Repolist repos={repos}  />
      <div className="pagination-controls">
        <button className="prev-button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
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
