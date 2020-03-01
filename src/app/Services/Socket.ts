const socketio = require('socket.io');
let io = null;
export function socket(server) {
  try {
    if (!io) {
      io = socketio(server);
      const nsp = io.of('/chat');
      nsp.on('connection', function(socket: any) {
        console.log(`${socket.id} connected`);
        // socket.on('client-send-message', function(message: any) {
        //   console.log(message);
        //   nsp.to(1).emit('server-send-message', message);
        // });
        socket.on('JoinRoom', roomId => {
          socket.join(roomId);
          console.log(`${socket.id} joined room ${roomId}!`);
          socket.on('client-send-message', function(message: any) {
            nsp.to(roomId).emit('server-send-message', message);
          });
        });
        socket.on('disconnect', () => {
          console.log(`${socket.id} disconnected`);
        });
      });
    }
    return io;
  } catch (error) {
    console.log(error);
  }
}
