export function formatCount(count) {
          if (count >= 1000) {
            return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
          }
          return count;
        }

export function getBookmarks() {
  const bookmarks = new Set(JSON.parse(localStorage.getItem("bookmarks")) || []);
  return bookmarks;
}

export function onToggleBookmark(repoId, isBookmarked) {
  const bookmarkedReposIDList = getBookmarks();

  if (isBookmarked) {

    bookmarkedReposIDList.delete(repoId); 
  }
  else {
    bookmarkedReposIDList.add(repoId);
  }
  localStorage.setItem("bookmarks", JSON.stringify([...bookmarkedReposIDList]));
  return bookmarkedReposIDList;
}


//Fetches all bookmarks simultaneously in parallel
export async function getBookmarkedRepos() {
  const bookmarkedReposId = getBookmarks();
  if (bookmarkedReposId.size === 0) return [];

  const apiUrl = `${import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000"}/api/github/repo`;
  
  const requests = [...bookmarkedReposId].map(id => 
    fetch(`${apiUrl}/${id}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => data?.repo || null)
      .catch(() => null)
  );

  const results = await Promise.all(requests);
  return results.filter(Boolean);
}
