import dotenv from 'dotenv'
dotenv.config({ path: './variables.env'});

import express from 'express';
import mongoose from 'mongoose';


const PORT = process.env.PORT || 8080;

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
	console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import all of our models
import Book from './models/Book';

const app = express();

import apiRoutes from './routes/api';
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

