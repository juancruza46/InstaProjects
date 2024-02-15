// routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// POST /api/posts
router.post('/', async (req, res) => {
    try {
      console.log('Received POST request:', req.body);
      const newPost = await Post.create(req.body);
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // PUT /api/posts/:id
  router.put('/:id', async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  // DELETE /api/posts/:id
  router.delete('/:id', async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  module.exports = router;
