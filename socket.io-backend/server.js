import { Server, Socket } from "socket.io";
import handleMessage from "./handlers/message.handler.js";
import { v4 as uuidv4 } from 'uuid';

const io = new Server({});

let currentUserId = 2;

const users = {};

const creatUserAvatarUrl = () => {
const rand1 = Math.round(Math.random() * 200 + 100)
const rand2 = Math.round(Math.random() * 200 + 100)
  return `https://placeimg.com/${rand1}/${rand2}/any`
}

const createUserOnline = () => {
  const values = Object.values(users)
  const onlyWithUsernames = values.filter(u => u.username !== undefined)
  return onlyWithUsernames
}

io.on("connection", (socket) => {
  let countConnect = io.engine.clientsCount;
  console.log(`${countConnect} devise(s) connected`);
  // console.log(socket.id);
  // users[socket.id] = {userId: currentUserId++};
    users[socket.id] = {userId: uuidv4()};

  socket.on('join', username => {
    users[socket.id].username = username
    users[socket.id].avatar = creatUserAvatarUrl()
    handleMessage(socket, users)
  })

  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('action', {type: 'users_online', data: createUserOnline()})
  })

  socket.on('action', action => {
    switch(action.type){
      case 'server/hello':
        console.log('Got hello event', action.data)
        socket.emit('action', {type: 'message', data: 'Good buy'})
        break;
      case 'server/join':
        console.log('Got join event', action.data)
        users[socket.id].username = action.data
        users[socket.id].avatar = creatUserAvatarUrl()
        io.emit('action', { type: 'users_online', data: createUserOnline() })
        break;
      case 'server/private-message':
        console.log('Got a private message', action.data)
    }
  })
 
});

io.listen(3001);

//EXAMPLE 3

/*
import { Server } from "socket.io";
import handleMessage from "./handlers/message.handler.js";

const io = new Server({});

let currentUserId = 2;

const userIds = {};

io.on("connection", (socket) => {
  let countConnect = io.engine.clientsCount;
  console.log(`${countConnect} devise(s) connected`);
  // console.log(socket.id);
  userIds[socket.id] = currentUserId++;
  handleMessage(socket, userIds)
});

io.listen(3001);
*/

// EXAMPLE 2

/*
import { Server } from "socket.io";

const io = new Server({});

let currentId = 2;
let currentMessageId = 1;
const userIds = {};

const createMessage = (userId, messageText) => {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: userId,
      name: "Test User",
      avatar: "https://placeimg.com/140/140/any",
    },
  };
};

io.on("connection", (socket) => {
  let countConnect = io.engine.clientsCount;
  console.log(`${countConnect} devise(s) connected`);
  console.log(socket.id);
  userIds[socket.id] = currentId++;
  socket.on("message", (messageText) => {
    const userId = userIds[socket.id]
    const message = createMessage(userId, messageText)
    //Receive the message
    console.log(message)
    //Broadcast will send the message to every client exept for the client that is broadcasting
    socket.broadcast.emit("message", message);
  });
});

io.listen(3001);
*/

//EXAMPLE 1

/*
import { Server } from "socket.io";

const io = new Server({});

io.on("connection", (socket) => {
  
  let countConnect = io.engine.clientsCount
  console.log(socket.id)
  console.log(`${countConnect} devise(s) connected`)
  socket.on('message', message => {

    //Receive the message
    console.log(message)

    //Return a response
    io.emit('message', message)
  })
});

io.listen(3001);

*/