import { io } from './server';

io.on('connection', (socket) => {
	console.log('A user connected');
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
	socket.on('tradeUpdate', (books) => {
		console.log(books)
	});
});