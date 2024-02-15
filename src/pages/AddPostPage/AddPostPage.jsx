import React, { useState } from 'react';
import './AddPostPage.css';
import { fetchGitHubRepoDetails } from '../../api';

const AddPostPage = ({ onAddPost }) => {
  const [formData, setFormData] = useState({
    githubLink: '',
    title: '',
    description: '',
  });

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const [owner, repo] = extractOwnerAndRepo(formData.githubLink);
      const repoDetails = await fetchGitHubRepoDetails(owner, repo);

      const newPost = {
        ownerId: owner,
        ownerName: repoDetails.owner.login,
        avatar: repoDetails.owner.avatar_url,
        githubLink: formData.githubLink,
        title: formData.title,
        description: formData.description,
      };

      onAddPost(newPost);

      setFormData({
        githubLink: '',
        title: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const extractOwnerAndRepo = (githubLink) => {
    const parts = githubLink.trim().replace(/\/$/, '').split('/');
    const owner = parts[parts.length - 2];
    const repo = parts[parts.length - 1];
    return [owner, repo];
  };

  return (
    <div>
      <h1 className ="addh1">Add Post</h1>
      <hr />
      <form className="add-project-form" onSubmit={handleSubmit}>
        <label htmlFor="githubLink">GitHub Link:</label>
        <input
          type="text"
          id="githubLink"
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          required
        />

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPostPage;
