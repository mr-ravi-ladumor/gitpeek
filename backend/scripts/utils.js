import { PER_PAGE } from '../constants.js';

// Utility: delay for rate limiting
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// GitHub API search URL
export function buildUrl(language, [minStars, maxStars], page = 1, license = "mit") {
  // Only fetch repos pushed this year, with the given license
  const pushed = `pushed:>2024-01-01`;
  const q = [
    `stars:${minStars}..${maxStars}`,
    `language:${language}`,
    "fork:false",
    "archived:false",
    pushed,
    `license:${license}`
  ].join("+");
  return `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=${PER_PAGE}&page=${page}`;
}

// Filter function to select repos based on criteria
export function filterRepos(repos) {
  return repos.filter((r) =>
    !r.private &&
    !r.fork &&
    !r.disabled &&
    !r.archived &&
    r.allow_forking &&
    r.has_issues &&
    r.language &&
    typeof r.stargazers_count === 'number' &&
    typeof r.forks_count === 'number'
  );
}