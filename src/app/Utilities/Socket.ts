import * as auth from '../Middleware/AuthMiddleware';
import { User } from '@entity/index';
const socketio = require('socket.io');
export enum chanelName {
  REALTIME = '/realtime'
}
export enum SocketEvent {
  SERVER_SEND_MESSAGE = 'server-send-message',
  CLIENT_SEND_MESSAGE = 'client-send-message',
  USER_JOIN_ROOM = 'user-join-room',
  ROOM_COUNT_USER = 'room-count-user',
  USER_LEAVE_ROOM = 'user-leave-room'
}
let io = null;
export function socket(server) {
  try {
    if (!io) {
      io = socketio(server);
      const nsp = io.of(chanelName.REALTIME);
      nsp.on('connection', async function (socket: any) {
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
        user.save();
        socket.on(SocketEvent.USER_JOIN_ROOM, function (data: { targetId: number; type: string }) {
          if (!data) {
            return;
          }
          const roomName = 'any';
          socket.join(roomName);
          const countMember = getRoomConnections(chanelName.REALTIME, roomName);
          createEvent(chanelName.REALTIME, roomName, {
            data: { countMember: countMember },
            event: SocketEvent.ROOM_COUNT_USER
          });
        });
        socket.on(SocketEvent.USER_LEAVE_ROOM, function (data: { targetId: number; type: string }) {
          if (!data) {
            return;
          }
          const roomName = 'any';
          socket.leave(roomName);

          setTimeout(() => {
            const countMember = getRoomConnections(chanelName.REALTIME, roomName);
            createEvent(chanelName.REALTIME, roomName, {
              data: { countMember: countMember },
              event: SocketEvent.ROOM_COUNT_USER
            });
          }, 200);
        });
        socket.on(SocketEvent.CLIENT_SEND_MESSAGE, function (data: { message: string }) {
          if (!data) {
            return;
          }
          const roomName = 'any';
          setTimeout(() => {
            createEvent(chanelName.REALTIME, roomName, {
              data: data,
              event: SocketEvent.SERVER_SEND_MESSAGE
            });
          }, 200);
        });
        socket.on('disconnect', async () => {
          const user = await User.findOne({ where: { id: decode.data.id } });
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

export function createEvent(namespace, room, payload: { data: any; event: string }, callback?) {
  const { data, event } = payload;
  io.of(namespace).to(room).emit(event, data);
  if (typeof callback === 'function') {
    callback();
  }
}

function getRoomConnections(nameSpace, roomName) {
  return io.nsps[nameSpace].adapter.rooms[roomName] ? io.nsps[nameSpace].adapter.rooms[roomName].length : 0;
}

export function getLength(namespace, room) {
  const roomVideo = io.of(namespace).to(room).adapter.rooms[room];
  if (!roomVideo) {
    return 0;
  }
  return roomVideo.length;
}
