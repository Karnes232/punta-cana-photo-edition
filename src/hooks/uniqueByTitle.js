const uniqueByTitle = (objects) => {
  const seenTitles = new Set();

  return objects.filter((obj) => {
    // Check if we've seen this title before
    if (seenTitles.has(obj.title)) {
      // Already seen, so filter it out
      return false;
    } else {
      // New title, add to set and keep it
      seenTitles.add(obj.title);
      return true;
    }
  });
};

export default uniqueByTitle;
