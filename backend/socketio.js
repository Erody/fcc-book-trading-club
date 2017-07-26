import { io } from './server';

io.on('connection', (socket) => {
	socket.on('disconnect', () => {
	});
	socket.on('personal channel', (data) => {
		socket.join(data.id);
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
	});
	socket.on('trade request', (data) => {
		console.log('trade request');
		socket.to(data.tradePartner._id).emit('trade request', {from: data.from})
	})
});