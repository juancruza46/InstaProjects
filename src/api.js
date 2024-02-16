// api.js
// Existing GitHub API details
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
  
  // New likes API
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const likesData = {};
  
  export const likePost = async (postId, userId) => {
    await delay(500);
  
    if (!likesData[postId]) {
      likesData[postId] = [];
    }
  
    if (!likesData[postId].includes(userId)) {
      likesData[postId].push(userId);
    }
  
    // Returning the updated likes count
    return likesData[postId].length;
  };
  
  export const unlikePost = async (postId, userId) => {
    await delay(500);
  
    if (likesData[postId]) {
      likesData[postId] = likesData[postId].filter((id) => id !== userId);
    }
  
    // Returning the updated likes count
    return likesData[postId].length;
  };
  
  export const getPostLikes = async (postId) => {
    await delay(500);
    return likesData[postId] || [];
  };
  
  