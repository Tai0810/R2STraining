const movePostToTop = (posts, index) => {
  if (index < 0 || index >= posts.length) {
    return posts; 
  }
  const newPosts = [...posts];
  const [postToMove] = newPosts.splice(index, 1);
  newPosts.unshift(postToMove);
  return newPosts;
};

export default movePostToTop;