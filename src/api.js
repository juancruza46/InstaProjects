const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getLikesDataFromStorage = () => {
  const storedLikesData = localStorage.getItem('likesData');
  return storedLikesData ? JSON.parse(storedLikesData) : {};
};

const saveLikesDataToStorage = (data) => {
  localStorage.setItem('likesData', JSON.stringify(data));
};

const likesData = getLikesDataFromStorage();

export const fetchGitHubUserDetails = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  return data;
};

export const fetchGitHubRepoDetails = async (owner, repo) => {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  const data = await response.json();
  return data;
};

export const likePost = async (postId, userId) => {
  await delay(500);

  if (!likesData[postId]) {
    likesData[postId] = [];
  }

  if (!likesData[postId].includes(userId)) {
    likesData[postId].push(userId);
  }

  saveLikesDataToStorage(likesData);

  // Returning the updated likes count
  return likesData[postId].length;
};

export const unlikePost = async (postId, userId) => {
  await delay(500);

  if (likesData[postId]) {
    likesData[postId] = likesData[postId].filter((id) => id !== userId);
    saveLikesDataToStorage(likesData);
  }

  // Returning the updated likes count
  return likesData[postId] ? likesData[postId].length : 0;
};

export const getPostLikes = async (postId) => {
  await delay(500);
  return likesData[postId] || [];
};

  