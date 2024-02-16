// ViewAllPostsPage.jsx
import React, { useState, useEffect } from 'react';
import './ViewAllPostsPage.css';
import PostCard from '../../components/PostCard/PostCard';

const ViewAllPostsPage = ({ user }) => {
  const [posts, setPosts] = useState([]);

  const handleEdit = async (editedPost) => {
    try {
      const response = await fetch(`/api/posts/${editedPost._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPost),
      });

      if (!response.ok) {
        console.error('Error editing post:', response.statusText);
        return;
      }

      // Update state
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === editedPost._id ? editedPost : post))
      );

      console.log('Post edited successfully:', editedPost);
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Error deleting post:', response.statusText);
        return;
      }

      // Update state by removing the deleted post
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));

      console.log('Post deleted successfully:', postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="view-all-posts-container">
      <div className="title-container">
        <h1>InstaProjects Feed</h1>
        <hr />
      </div>
      {user ? (
        <div className="posts-container">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <h2>Please sign in to view all posts</h2>
      )}
    </div>
  );
};

export default ViewAllPostsPage;






