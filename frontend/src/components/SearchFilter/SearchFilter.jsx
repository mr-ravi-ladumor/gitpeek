import { useState, useRef, useEffect } from "react";
import {
  FiFilter,
  FiChevronDown,
  FiSearch,
  FiX,
  FiCheck,
  FiRotateCcw,
  FiStar,
  FiCode,
  FiTag,
  FiArrowUpRight,
  FiCalendar,
  FiShuffle,
} from "react-icons/fi";
import { GoStar, GoRepoForked, GoIssueOpened } from "react-icons/go";
import "./SearchFilter.css";
import {
  starOptions,
  languages,
  topics,
  sortOptions,
} from "../../utils/constants.js";

const renderSortIcon = (iconName) => {
  switch (iconName) {
    case "star":
      return <GoStar className="sort-icon-item star-color" />;
    case "fork":
      return <GoRepoForked className="sort-icon-item fork-color" />;
    case "issue":
      return <GoIssueOpened className="sort-icon-item issue-color" />;
    case "calendar":
      return <FiCalendar className="sort-icon-item calendar-color" />;
    default:
      return <FiShuffle className="sort-icon-item shuffle-color" />;
  }
};

function SearchFilter({
  selectedStar,
  setSelectedStar,
  selectedLanguages,
  setSelectedLanguages,
  selectedTopics,
  setSelectedTopics,
  selectedSort,
  setSelectedSort,
  setCurrentPage,
}) {
  const [showStarDropdown, setShowStarDropdown] = useState(false);
  const [languageQuery, setLanguageQuery] = useState("");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [topicQuery, setTopicQuery] = useState("");
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const starRef = useRef();
  const langRef = useRef();
  const topicRef = useRef();
  const sortRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (starRef.current && !starRef.current.contains(e.target))
        setShowStarDropdown(false);
      if (langRef.current && !langRef.current.contains(e.target))
        setShowLangDropdown(false);
      if (topicRef.current && !topicRef.current.contains(e.target))
        setShowTopicDropdown(false);
      if (sortRef.current && !sortRef.current.contains(e.target))
        setShowSortDropdown(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleSelection = (item, selectedItems, setItems) => {
    setItems(
      selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item]
    );
    setCurrentPage(1);
  };

  const handleStarSelect = (option) => {
    setSelectedStar(option);
    setShowStarDropdown(false);
    setCurrentPage(1);
  };

  const handleSortSelect = (opt) => {
    setSelectedSort(
      opt.value ? { value: opt.value, order: opt.order } : { value: "", order: "" }
    );
    setShowSortDropdown(false);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedStar("Any");
    setSelectedLanguages([]);
    setSelectedTopics([]);
    setSelectedSort({ value: "", order: "" });
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedStar !== "Any" ||
    selectedLanguages.length > 0 ||
    selectedTopics.length > 0 ||
    Boolean(selectedSort?.value);

  const currentSortOpt = sortOptions.find(
    (opt) =>
      (!opt.value && !selectedSort?.value) ||
      (opt.value === selectedSort?.value && opt.order === selectedSort?.order)
  );

  const isCustomSort = Boolean(selectedSort?.value);

  return (
    <div className="filter-wrapper">
      <div className="filter-toolbar">
        <div className="filter-toolbar-header">
          <FiFilter className="filter-header-icon" />
          <span>Filter & Sort</span>
        </div>

        <div className="filter-controls-group">
          {/* Stars Dropdown */}
          <div className="filter-dropdown-container" ref={starRef}>
            <button
              type="button"
              className={`filter-btn ${selectedStar !== "Any" ? "active" : ""} ${showStarDropdown ? "open" : ""}`}
              onClick={() => setShowStarDropdown((prev) => !prev)}
            >
              <FiStar className="btn-icon" />
              <span>{selectedStar === "Any" ? "Stars" : `${selectedStar}+ stars`}</span>
              <FiChevronDown className={`chevron-icon ${showStarDropdown ? "open" : ""}`} />
            </button>

            {showStarDropdown && (
              <div className="dropdown-menu">
                <div className="dropdown-menu-header">Minimum Stars</div>
                {starOptions.map((option) => (
                  <div
                    key={option}
                    className={`dropdown-menu-item ${selectedStar === option ? "selected" : ""}`}
                    onClick={() => handleStarSelect(option)}
                  >
                    <span>{option === "Any" ? "Any Stars" : `${option}+ stars`}</span>
                    {selectedStar === option && <FiCheck className="check-icon" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Languages Dropdown */}
          <div className="filter-dropdown-container" ref={langRef}>
            <button
              type="button"
              className={`filter-btn ${selectedLanguages.length > 0 ? "active" : ""} ${showLangDropdown ? "open" : ""}`}
              onClick={() => setShowLangDropdown((prev) => !prev)}
            >
              <FiCode className="btn-icon" />
              <span>Languages</span>
              {selectedLanguages.length > 0 && (
                <span className="badge">{selectedLanguages.length}</span>
              )}
              <FiChevronDown className={`chevron-icon ${showLangDropdown ? "open" : ""}`} />
            </button>

            {showLangDropdown && (
              <div className="dropdown-menu dropdown-menu-wide">
                <div className="search-input-wrapper">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    className="dropdown-search-input"
                    value={languageQuery}
                    onChange={(e) => setLanguageQuery(e.target.value)}
                    placeholder="Search languages..."
                    autoFocus
                  />
                  {languageQuery && (
                    <button type="button" className="clear-search-btn" onClick={() => setLanguageQuery("")}>
                      <FiX />
                    </button>
                  )}
                </div>
                <div className="dropdown-scroll-area">
                  {(() => {
                    const filtered = languages.filter((l) =>
                      l.toLowerCase().includes(languageQuery.toLowerCase())
                    );
                    if (filtered.length === 0) {
                      return <div className="dropdown-no-results">No languages found</div>;
                    }
                    return filtered.map((lang) => {
                      const isSelected = selectedLanguages.includes(lang);
                      return (
                        <div
                          key={lang}
                          className={`dropdown-menu-item ${isSelected ? "selected" : ""}`}
                          onClick={() => toggleSelection(lang, selectedLanguages, setSelectedLanguages)}
                        >
                          <div className="checkbox-box">{isSelected && <FiCheck />}</div>
                          <span>{lang}</span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* Topics Dropdown */}
          <div className="filter-dropdown-container" ref={topicRef}>
            <button
              type="button"
              className={`filter-btn ${selectedTopics.length > 0 ? "active" : ""} ${showTopicDropdown ? "open" : ""}`}
              onClick={() => setShowTopicDropdown((prev) => !prev)}
            >
              <FiTag className="btn-icon" />
              <span>Topics</span>
              {selectedTopics.length > 0 && (
                <span className="badge">{selectedTopics.length}</span>
              )}
              <FiChevronDown className={`chevron-icon ${showTopicDropdown ? "open" : ""}`} />
            </button>

            {showTopicDropdown && (
              <div className="dropdown-menu dropdown-menu-wide">
                <div className="search-input-wrapper">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    className="dropdown-search-input"
                    value={topicQuery}
                    onChange={(e) => setTopicQuery(e.target.value)}
                    placeholder="Search topics..."
                    autoFocus
                  />
                  {topicQuery && (
                    <button type="button" className="clear-search-btn" onClick={() => setTopicQuery("")}>
                      <FiX />
                    </button>
                  )}
                </div>
                <div className="dropdown-scroll-area">
                  {(() => {
                    const filtered = topics.filter((t) =>
                      t.toLowerCase().includes(topicQuery.toLowerCase())
                    );
                    if (filtered.length === 0) {
                      return <div className="dropdown-no-results">No topics found</div>;
                    }
                    return filtered.map((topic) => {
                      const isSelected = selectedTopics.includes(topic);
                      return (
                        <div
                          key={topic}
                          className={`dropdown-menu-item ${isSelected ? "selected" : ""}`}
                          onClick={() => toggleSelection(topic, selectedTopics, setSelectedTopics)}
                        >
                          <div className="checkbox-box">{isSelected && <FiCheck />}</div>
                          <span>{topic}</span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="filter-dropdown-container" ref={sortRef}>
            <button
              type="button"
              className={`filter-btn ${isCustomSort ? "active" : ""} ${showSortDropdown ? "open" : ""}`}
              onClick={() => setShowSortDropdown((prev) => !prev)}
            >
              <FiArrowUpRight className="btn-icon" />
              <span>
                {isCustomSort ? `Sort: ${currentSortOpt?.shortLabel || currentSortOpt?.label}` : "Sort By"}
              </span>
              <FiChevronDown className={`chevron-icon ${showSortDropdown ? "open" : ""}`} />
            </button>

            {showSortDropdown && (
              <div className="dropdown-menu dropdown-menu-sort">
                <div className="dropdown-menu-header">Sort Repositories</div>
                <div className="dropdown-scroll-area">
                  {sortOptions.map((opt) => {
                    const isSelected =
                      (!opt.value && !selectedSort?.value) ||
                      (selectedSort?.value === opt.value && selectedSort?.order === opt.order);
                    return (
                      <div
                        key={`${opt.value}-${opt.order}-${opt.label}`}
                        className={`dropdown-menu-item sort-dropdown-item ${isSelected ? "selected" : ""}`}
                        onClick={() => handleSortSelect(opt)}
                      >
                        <div className="sort-item-left">
                          {renderSortIcon(opt.icon)}
                          <div className="sort-item-info">
                            <span className="sort-item-label">{opt.label}</span>
                            {opt.hint && <span className="sort-item-hint">{opt.hint}</span>}
                          </div>
                        </div>
                        <div className="sort-item-right">
                          {opt.direction && (
                            <span className="sort-direction-badge">{opt.direction}</span>
                          )}
                          {isSelected && <FiCheck className="check-icon" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Tag Bar */}
      {hasActiveFilters && (
        <div className="active-filters-bar">
          <span className="active-filters-label">Active filters:</span>
          <div className="active-tags-list">
            {selectedStar !== "Any" && (
              <span className="filter-tag">
                <span>⭐ {selectedStar}+ stars</span>
                <button
                  type="button"
                  className="tag-remove-btn"
                  onClick={() => handleStarSelect("Any")}
                >
                  <FiX />
                </button>
              </span>
            )}

            {selectedLanguages.map((lang) => (
              <span className="filter-tag" key={lang}>
                <span>{lang}</span>
                <button
                  type="button"
                  className="tag-remove-btn"
                  onClick={() => toggleSelection(lang, selectedLanguages, setSelectedLanguages)}
                >
                  <FiX />
                </button>
              </span>
            ))}

            {selectedTopics.map((topic) => (
              <span className="filter-tag" key={topic}>
                <span>#{topic}</span>
                <button
                  type="button"
                  className="tag-remove-btn"
                  onClick={() => toggleSelection(topic, selectedTopics, setSelectedTopics)}
                >
                  <FiX />
                </button>
              </span>
            ))}

            {isCustomSort && (
              <span className="filter-tag sort-tag">
                <span>Sort: {currentSortOpt?.shortLabel || currentSortOpt?.label}</span>
                <button
                  type="button"
                  className="tag-remove-btn"
                  onClick={() => handleSortSelect({ value: "", order: "" })}
                >
                  <FiX />
                </button>
              </span>
            )}

            <button type="button" className="clear-all-btn" onClick={clearAllFilters}>
              <FiRotateCcw className="clear-icon" />
              <span>Clear all</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchFilter;
