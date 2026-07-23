import { useState, useEffect } from 'react';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, Outlet } from 'react-router-dom';
import './App.css';
import BookmarkList from './components/Repo/BookmarkList.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import { getBookmarkedRepos } from './utils/helpers.js';

function App() {
  const [repos, setRepos] = useState([]);
  const [selectedStar, setSelectedStar] = useState('Any');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSort, setSelectedSort] = useState({ value: '', order: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedStar !== 'Any') params.append('stars', selectedStar);
    if (selectedLanguages.length > 0) params.append('languages', selectedLanguages.join(','));
    if (selectedTopics.length > 0) params.append('topics', selectedTopics.join(','));
    params.append('page', currentPage);
    if (selectedSort.value && selectedSort.order) {
      params.append('sort', selectedSort.value);
      params.append('order', selectedSort.order);
    }

    (async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000"}/api/github/repos`;
        const response = await fetch(`${apiUrl}?${params}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setRepos(data.repos);
        setTotalPages(Math.ceil(data.total_count / 30) || 1);
      } catch (error) {
        console.log('Error fetching repos:', error.message);
      }
    })();
  }, [selectedStar, selectedLanguages, selectedTopics, currentPage, selectedSort]);

  function Layout() {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route
          index
          element={
            <Home
              repos={repos}
              selectedStar={selectedStar}
              setSelectedStar={setSelectedStar}
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
              selectedTopics={selectedTopics}
              setSelectedTopics={setSelectedTopics}
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          }
        />
        <Route path='about' element={<About />} />
        <Route path='bookmark' element={<BookmarkList />} loader={getBookmarkedRepos} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
