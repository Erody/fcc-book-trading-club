import dotenv from 'dotenv'
dotenv.config({ path: './variables.env'});

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import SocketIO from 'socket.io';
import http from 'http';
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
const server = http.Server(app);
// create socketio server instance
export const io = SocketIO(server);
// initialize socketio handling file
require('./socketio'); // Using require, because there is nothing to import in socketio.js

app.use(bodyParser.json());

import apiRoutes from './routes/api';
import apiAuthRoutes from './routes/apiAuth';
import apiUserRoutes from './routes/user';
app.use('/api', apiRoutes);
app.use('/api/auth', apiAuthRoutes);
app.use('/api/user', apiUserRoutes);

// error handling
app.use(notFound);



server.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});



