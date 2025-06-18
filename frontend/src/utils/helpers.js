export function formatCount(count) {
          if (count >= 1000) {
            return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
          }
          return count;
        }

export function onToggleBookmark(repoId) {
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