const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');

// require dotenv
require('dotenv').config();

// connect to db
require('./config/database');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// auth routes
const authRouter = require('./routes/auth');
app.use('/api', authRouter);

const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

// Import mongoose model for likes
const Like = require('./models/like');

// Like routes
app.post('/api/like', async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const existingLike = await Like.findOne({ postId, userId });

    if (!existingLike) {
      await Like.create({ postId, userId });
    }

    const likesCount = await Like.countDocuments({ postId });

    res.json({ likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/unlike', async (req, res) => {
  const { postId, userId } = req.body;

  try {
    await Like.findOneAndDelete({ postId, userId });

    const likesCount = await Like.countDocuments({ postId });

    res.json({ likesCount });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/postLikes/:postId', async (req, res) => {
  const { postId } = req.params;

  try {
    const likes = await Like.find({ postId }).distinct('userId');

    res.json({ likes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
