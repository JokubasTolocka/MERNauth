require('dotenv').config()
const express = require('express'),
      app = express(),
      authRoutes = require('./routes/auth'),
      morgan = require('morgan'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      PORT = process.env.PORT = 8000;

//app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cors());

if(process.env.NODE_ENV = 'development') {
    app.use(cors({origin: `http://localhost:3000`}))
}

app.use('/api', authRoutes);

//app middlewares

app.listen(PORT);