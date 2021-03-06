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
		socket.to(data.tradePartner._id).emit('trade request', {from: data.from, tradeId: data.uniqueId})
	});
	socket.on('cancel trade request', (data) => {
		socket.to(data.tradePartner.id).emit('cancelled trade request')
	});
	socket.on('accept trade request', (data) => {
		socket.to(data.tradePartner.id).emit('accepted trade request', {tradeId: data.tradeId})
	});
	socket.on('trade complete', (data) => {
		socket.to(data.id).emit('trade complete');
	});
});