export function formatCount(count) {
          if (count >= 1000) {
            return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
          }
          return count;
        }

export function onToggleBookmark(repoId) {
  let bookmarkedReposIDList = JSON.parse(localStorage.getItem("bookmarks")) || [];

  if (bookmarkedReposIDList.includes(repoId)) {
    bookmarkedReposIDList = bookmarkedReposIDList.filter(id => id !== repoId); 
  }
  else {
    bookmarkedReposIDList.push(repoId);
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkedReposIDList));
  return bookmarkedReposIDList;
}

export function getBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  return bookmarks;
}


export async function getBookmarkedRepos(){
  const bookmarkedReposId = JSON.parse(localStorage.getItem("bookmarks")) || [];

  if (bookmarkedReposId.length === 0) return [];

  const results = [];
    for (const id of bookmarkedReposId) {
      try {
        const response = await fetch(`http://localhost:5000/api/github/repo/${id}`);
        if (!response.ok) continue;
        const data = await response.json();
        if (data.repo) results.push(data.repo);
      } catch {
        console.error(`Failed to fetch repo with ID ${id}`);
        continue;
      }
    }
  return results;
}