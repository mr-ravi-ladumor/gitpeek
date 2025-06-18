import { useState, useEffect } from 'react';
import { RouterProvider, Route,createBrowserRouter,  createRoutesFromElements , useLocation, Outlet } from 'react-router-dom';
import './App.css';

// import Components
import BookmarkList from './components/Repo/BookmarkList.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';

// import utility functions
import { getBookmarkedRepos } from './utils/helpers.js';

function App() {
  
  function Layout(){
      return (
        <>
          <Navbar />
          <Outlet />
        </>
      )
  }

  const router =  createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
          <Route index path='' 
            element={
              <Home/>
            } 
          />
          <Route path='about' element={<><p>THis is about page </p></>} />
          <Route path='bookmark'
            element={<BookmarkList/>}
            loader= {getBookmarkedRepos}
          />
      </Route>
    )
  )

  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
    );
}

export default App;
