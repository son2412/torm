const socketio = require('socket.io');
import * as auth from '../../app/Middleware/AuthMiddleware';
import { User } from '@entity/index';
let io = null;
export function socket(server) {
  try {
    if (!io) {
      io = socketio(server);
      const nsp = io.of('/real-time');
      nsp.on('connection', async function (socket: any) {
        // console.log(`${socket.id} connected`);
        const token = socket.handshake.query.token;
        const [err, decode] = auth.decodeToken(token);
        if (err) {
          socket.disconnect();
          return;
        }
        const user = await User.findOne({ where: { id: decode.data.id } });
        if (err) {
          socket.disconnect();
          return;
        }
        user.isOnline = true;
        user.save();
        // socket.on('client-send-message', function(message: any) {
        //   console.log(message);
        //   nsp.to(1).emit('server-send-message', message);
        // });
        // socket.on('JoinRoom', (roomId) => {
        //   socket.join(roomId);
        //   console.log(`${socket.id} joined room ${roomId}!`);
        //   socket.on('client-send-message', function (message: any) {
        //     nsp.to(roomId).emit('server-send-message', message);
        //   });
        // });
        socket.on('disconnect', async () => {
          const user = await User.findOne({ where: { id: decode.data.id } });
          user.isOnline = false;
          user.save();
          console.log(`${socket.id} disconnected`);
        });
      });
    }
    return io;
  } catch (error) {
    console.log(error);
  }
}
