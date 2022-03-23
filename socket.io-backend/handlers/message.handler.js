let currentMessageId = 1;

const createMessage = (user, messageText) => {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: user.avatar,
    },
  };
};

const handleMessage =  (socket, users) => {

    socket.on("message", (messageText) => {
        const user = users[socket.id]
        const message = createMessage(user, messageText)
        //Receive the message
        console.log(message)
        socket.broadcast.emit("message", message);
      });
}

export default handleMessage

//EXAMPLE 1

/*
let currentMessageId = 1;

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

const handleMessage =  (socket, userIds) => {

    socket.on("message", (messageText) => {
        const userId = userIds[socket.id]
        const message = createMessage(userId, messageText)
        //Receive the message
        console.log(message)
        socket.broadcast.emit("message", message);
      });
}

export default handleMessage
*/