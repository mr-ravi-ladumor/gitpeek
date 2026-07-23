import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Home.css';
import SearchFilter from '../SearchFilter/SearchFilter.jsx';
import Repolist from '../Repo/Repolist.jsx';

function Home({
  repos,
  selectedStar,
  setSelectedStar,
  selectedLanguages,
  setSelectedLanguages,
  selectedTopics,
  setSelectedTopics,
  selectedSort,
  setSelectedSort,
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-badge">
          <span>10k+ Curated Open Source Repositories</span>
        </div>
        <h1 className="hero-title">Explore GitHub Repositories</h1>
        <p className="hero-description">
          Discover top open-source projects, filter by programming languages, stars, or topics, and bookmark your favorites.
        </p>
      </div>

      <SearchFilter
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

      <Repolist repos={repos} />

      {repos.length > 0 && (
        <div className="pagination-wrapper">
          <div className="pagination-controls">
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <FiChevronLeft />
              <span>Previous</span>
            </button>
            
            <span className="pagination-info">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>

            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage >= totalPages || repos.length < 30}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <span>Next</span>
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


export default Home;
