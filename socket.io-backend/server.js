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
    socket.broadcast.emit("message", message);
  });
});

io.listen(3001);

//EXAMPLE 

//import { Server } from "socket.io";

// const io = new Server({});

// io.on("connection", (socket) => {
  
//   let countConnect = io.engine.clientsCount
//   console.log(socket.id)
//   console.log(`${countConnect} devise(s) connected`)
//   socket.on('message', message => {

//     //Receive the message
//     console.log(message)

//     //Return a response
//     io.emit('message', message)
//   })
// });

// io.listen(3001);

