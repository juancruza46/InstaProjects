//github api details
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

  