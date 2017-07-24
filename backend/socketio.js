import { io } from './server';

io.on('connection', (socket) => {
	console.log('A user connected');
	socket.on('disconnect', () => {
		console.log('A user disconnected');
	});
	socket.on('trade', id => {
		socket.join(id.trade)
	});
	socket.on('leave trade', id => {
		socket.leave(id.trade)
	});
	socket.on('tradeUpdate', (data) => {
		socket.to(data.id).emit('tradeUpdate', {books: data.books})
	});
	socket.on('trade status', (data) => {
		socket.to(data.id).emit('trade status', {accepted: data.accepted})
	})
});