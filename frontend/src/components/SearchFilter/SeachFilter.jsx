import React, { useState, useRef, useEffect } from 'react';
import './SeachFilter.css';
import {starOptions, languages,topics, sortOptions } from '../../utils/constants.js';


function SeachFilter({
  selectedStar, setSelectedStar,
  selectedLanguages, setSelectedLanguages,
  selectedTopics, setSelectedTopics,
  selectedSort, setSelectedSort,
  setCurrentPage
}) {
  
  const [showStarDropdown, setShowStarDropdown] = useState(false);

 
  const [languageQuery, setLanguageQuery] = useState('');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const [topicQuery, setTopicQuery] = useState('');
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);

  const [showSortDropdown, setShowSortDropdown] = useState(false);

 

  // Close dropdowns on outside click
  const starRef = useRef();
  const langRef = useRef();
  const topicRef = useRef();
  const sortRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (starRef.current && !starRef.current.contains(e.target)) setShowStarDropdown(false);
      if (langRef.current && !langRef.current.contains(e.target)) setShowLangDropdown(false);
      if (topicRef.current && !topicRef.current.contains(e.target)) setShowTopicDropdown(false);
      if (sortRef.current && !sortRef.current.contains(e.target)) setShowSortDropdown(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleSelection = (item, selectedItems, setItems) => {
    setItems(
      selectedItems.includes(item)
        ? selectedItems.filter(i => i !== item)
        : [...selectedItems, item]
    );
  };

  return (
    <div className="filter-section">
      <div className="filter-title">Filter Projects</div>
      <div className="filter-fields">

        {/* Stars */}
        <div className="filter-dropdown" ref={starRef}>
          <div className="filter-label">Stars</div>
          <div
            className="dropdown-input"
            onClick={() => setShowStarDropdown(prev => !prev)}
          >
            {selectedStar === 'Any' ? 'Any' : `${selectedStar}+`}
            <span className="dropdown-arrow">▼</span>
          </div>
          {showStarDropdown && (
            <div className="dropdown-list">
              {starOptions.map(option => (
                <div
                  key={option}
                  className={`dropdown-item${selectedStar === option ? ' selected' : ''}`}
                  onClick={() => {
                    setSelectedStar(option);
                    setShowStarDropdown(prev => !prev);
                  }}
                >
                  {option === 'Any' ? 'Any' : `${option}+`}
                </div>
              ))}
            </div>
          )}
          {/* stars dropdown ends */}
        </div>

        {/* Languages */}
        <div className="filter-dropdown" ref={langRef}>
          <div className="filter-label">Languages</div>
          <div
            className="dropdown-input"
            onClick={() => setShowLangDropdown(prev => !prev)}
          >
            {selectedLanguages.length === 0
              ? <span className='placeholder'>Select languages...</span>
              : selectedLanguages.map(lang => (
                  <span className="tag" key={lang}>
                    {lang}
                    <span
                      className="tag-close"
                      onClick={e => {
                        e.stopPropagation();
                        toggleSelection(lang, selectedLanguages, setSelectedLanguages);
                        }}
                      >×</span>
                      </span>
                    ))
                  }
                  <span className="dropdown-arrow">▼</span>
                  </div>
                  {showLangDropdown && (
                  <div className="dropdown-list">
                    <input
                      type="text"
                      className="dropdown-search"
                      value={languageQuery}
                      onChange={e => setLanguageQuery(e.target.value)}
                      placeholder="Search language..."
                      onClick={e => e.stopPropagation()}
                    />
                    {
                      (() => {
                        const filteredLanguages = languages.filter(l =>
                        l.toLowerCase().includes(languageQuery.toLowerCase())
                      );
                        if (filteredLanguages.length === 0) {
                          return <div className="dropdown-item no-results">No languages found</div>;
                        }
                        return filteredLanguages.map(lang => (
                          <div
                            key={lang}
                            className={`dropdown-item${selectedLanguages.includes(lang) ? ' selected' : ''}`}
                            onClick={() => toggleSelection(lang, selectedLanguages, setSelectedLanguages)}
                          >
                          <input
                            type="checkbox"
                            checked={selectedLanguages.includes(lang)}
                            readOnly
                          />
                          {lang}
                        </div>
                      ));
                      })()
                    }
                  </div>
                  )}
                  {/* languages dropdown ends */}
        </div>

        {/* Topics */}
        <div className="filter-dropdown" ref={topicRef}>
          <div className="filter-label">Topics</div>
          <div
            className="dropdown-input"
            onClick={() => setShowTopicDropdown(prev => !prev)}
          >
            {selectedTopics.length === 0
              ? <span className="placeholder">Select topics...</span>
              : selectedTopics.map(topic => (
                  <span className="tag" key={topic}>
                    {topic}
                    <span
                      className="tag-close"
                      onClick={e => {
                        e.stopPropagation();
                        toggleSelection(topic, selectedTopics, setSelectedTopics);
                        }}
                      >×</span>
                      </span>
                    ))
                  }
                  <span className="dropdown-arrow">▼</span>
                  </div>
                  {showTopicDropdown && (
                    <div className="dropdown-list">
                      <input
                        type="text"
                        className="dropdown-search"
                        value={topicQuery}
                        onChange={e => setTopicQuery(e.target.value)}
                        placeholder="Search topic..."
                        onClick={e => e.stopPropagation()}
                      />
                        {(() => {
                          const filteredTopics = topics.filter(t =>
                          t.toLowerCase().includes(topicQuery.toLowerCase())
                        );
                        if (filteredTopics.length === 0) {
                          return <div className="dropdown-item no-results">No topics found</div>;
                        }
                        return filteredTopics.map(topic => (
                          <div
                            key={topic}
                            className={`dropdown-item${selectedTopics.includes(topic) ? ' selected' : ''}`}
                            onClick={() => toggleSelection(topic, selectedTopics, setSelectedTopics)}
                          >
                          <input
                              type="checkbox"
                              checked={selectedTopics.includes(topic)}
                              readOnly
                          />
                          {topic}
                        </div>
                      ));
                      })()}
                    </div>
                  )}   
                  {/* /* topics dropdown ends */ }
            </div>

            {/* sort by */}
          <div className="filter-dropdown" ref={sortRef}>
            <div className="filter-label">Sort By</div>
            <div className="dropdown-input" 
              onClick={() => setShowSortDropdown(prev => !prev)}>
                 
              {sortOptions.find(opt => (opt.value && opt.order && opt.value === selectedSort?.value) && opt.order === selectedSort?.order)?.label || 'Sort by...'}
              <span className="dropdown-arrow">▼</span>
            </div>
            {showSortDropdown && (
              <div className="dropdown-list">
                {sortOptions.map(opt => (
                  <div
                    key={opt.label}
                    className={`dropdown-item${selectedSort?.value === opt.value && selectedSort?.order === opt.order ?  ' selected' : ''}`}
                    onClick={() => {
                      setSelectedSort(opt.value && { value: opt.value, order: opt.order});
                      setShowSortDropdown(prev => !prev);
                    }}
                  >
                    {opt.label}  
                  </div>
                ))}
              </div>
            )}
          </div>
      </div >
      
      {/* clear all filter button  */}
      <div className="clear-filters">
        <button  onClick={() => {
          if(selectedStar === 'Any' && selectedLanguages.length === 0 && selectedTopics.length === 0 && !selectedSort.value) return;
            setSelectedStar('Any');
            setSelectedLanguages([]);
            setSelectedTopics([]);
            setSelectedSort({ value: '', order: '' });
            setCurrentPage(1);
          }}>
            Clear All Filters
          </button>
      </div>
    </div>
  );
}

export default SeachFilter;