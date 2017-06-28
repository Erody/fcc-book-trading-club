import dotenv from 'dotenv'
dotenv.config({ path: './variables.env'});

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { notFound } from './handlers/errorHandlers';


const PORT = process.env.PORT || 8080;

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
	console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import all of our models
import Book from './models/Book';
import User from './models/User';

const app = express();

app.use(bodyParser.json());

import apiRoutes from './routes/api';
import apiAuthRoutes from './routes/apiAuth';
app.use('/api', apiRoutes);
app.use('/api/auth', apiAuthRoutes);

// error handling
app.use(notFound);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

