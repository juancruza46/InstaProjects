// PostCard.jsx
import React, { useState, useEffect, useRef } from 'react';
import './PostCard.css';
import { fetchGitHubUserDetails } from '../../api';

const PostCard = ({ post, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });
  const cardRef = useRef(null);

  useEffect(() => {
    setEditedPost({ ...post });
  }, [post]);

  useEffect(() => {
    // Set font size based on card size
    const cardHeight = cardRef.current.offsetHeight;
    const fontSize = `${cardHeight / 10}px`; // You can adjust the divisor to control the font size
    cardRef.current.style.setProperty('--font-size', fontSize);
  }, [cardRef.current, post]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedPost({ ...post });
  };

  const handleSaveEdit = () => {
    // Perform any validation if needed before saving the edit
    onEdit(editedPost);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`post-card ${isEditing ? 'editing' : ''}`} ref={cardRef}>
      <div className="post-header">
        <img src={post.avatar} alt="User Avatar" />
        <span className="owner-name">{post.ownerName}</span>
      </div>
      <div className="post-content">
        {isEditing ? (
          <>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedPost.title}
              onChange={handleInputChange}
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={editedPost.description}
              onChange={handleInputChange}
            ></textarea>

            <div className="edit-buttons">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-description">{post.description}</p>
            <a
              className="github-link"
              href={post.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit GitHub Repo
            </a>

            <div className="edit-buttons">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={() => onDelete(post._id)}>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;

