const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const postRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/images', express.static('images'));
app.use('/api/message', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
