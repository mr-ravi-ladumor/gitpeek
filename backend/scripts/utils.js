import { OPEN_ISSUES_THRESHOLD, PER_PAGE, ALLOWED_LICENSE_KEYS } from './constants.js';

// Utility: delay for rate limiting
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//  GitHub API search URL
export function buildUrl(language, [minStars, maxStars], dateRange, page = 1) {
  const q = `stars:${minStars}..${maxStars}+language:${language}+fork:false+archived:false+${dateRange}`;
  return `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=${PER_PAGE}&page=${page}`;
}

 const LAST_PUSHED_AFTER = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return date;
};

// Filter function to select repos based on criteria
export function filterRepos(repos) {
  return repos.filter((r) => {
    const licenseKey = r.license?.key?.toLowerCase() || r.license?.spdx_id?.toLowerCase();
    return (
      !r.private &&
      !r.fork &&
      !r.disabled &&
      !r.archived &&
      r.allow_forking &&
      r.has_issues &&
      r.open_issues_count >= OPEN_ISSUES_THRESHOLD &&
      r.language &&
      typeof r.stargazers_count === 'number' &&
      typeof r.forks_count === 'number' &&
      typeof r.pushed_at === 'string' &&
      new Date(r.pushed_at) >= LAST_PUSHED_AFTER() && 
      licenseKey &&
      ALLOWED_LICENSE_KEYS.has(licenseKey)
    );
  });
}
