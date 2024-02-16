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

//auth routes
const authRouter = require('./routes/auth');
app.use('/api', authRouter);

const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});
