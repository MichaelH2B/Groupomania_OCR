const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const helmet = require('helmet');
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');

const corsOptions = {
  origin:'http://localhost:3000', 
  credentials: true,            
  optionSuccessStatus: 200
}

require('dotenv').config();

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((error) => console.log({ error }));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.AUTHORIZED_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(cors(corsOptions));

app.use(express.json());

// app.use(helmet());
app.use(mongoSanitize()); // $ and .

app.use('/images', express.static(path.join(__dirname, 'images')));

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

const postRoutes = require('./routes/post');
app.use('/api/post', postRoutes);

module.exports = app;