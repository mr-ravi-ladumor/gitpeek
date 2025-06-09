import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import BookmarkList from './components/repos/BookmarkList';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  // Filter and pagination state
  const [selectedStar, setSelectedStar] = useState('Any');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedSort, setSelectedSort] = useState({
    value: '',
    order: ''
  });


  // Bookmark state
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  function onToggleBookmark(repoId) {
    setBookmarks(prev => {
      let updated;
      if (prev.includes(repoId)) {
        updated = prev.filter(id => id !== repoId);
      } else {
        updated = [...prev, repoId];
      }
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  }

  // Use location to determine if we are on the home page
  const location = useLocation();

  // Fetch repos when filters or page changes
  useEffect(() => {
    if (location.pathname !== '/') return;

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
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              repos={repos}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              selectedStar={selectedStar}
              setSelectedStar={setSelectedStar}
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              totalPages={totalPages}
              bookmarks={bookmarks}
              onToggleBookmark={onToggleBookmark}
            />
          }
        />
        <Route path="/about" element={<div style={{ padding: 20 }}><h2>About</h2><p>This is a simple GitHub repo explorer.</p></div>} />
        <Route path="/contact" element={<div style={{ padding: 20 }}><h2>Contact</h2><p>Contact us at example@email.com</p></div>} />
        <Route path="/discover" element={<div style={{ padding: 20 }}><h2>Discover</h2><p>Discover more features soon!</p></div>} />
        <Route
          path="/bookmark"
          element={
            <BookmarkList
              bookmarks={bookmarks}
              onToggleBookmark={onToggleBookmark}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
