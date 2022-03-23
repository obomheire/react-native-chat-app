import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import io from "socket.io-client";
import { GiftedChat } from "react-native-gifted-chat";
import JoinScreen from "./JoinScreen";

export default function HomeScreen() {
  const [receiveMessage, setReceiveMessage] = useState([]);
  const [hasJoined, setHasJoined] = useState(false);
  const socket = useRef(null);
  // console.log(messageToSend)

  useEffect(() => {
    socket.current = io("http://192.168.0.107:3001");
    socket.current.on("message", (message) => {
      setReceiveMessage((prevState) => GiftedChat.append(prevState, message));
    });
  }, []);

  const onSave = (messages) => {
    console.log(messages);
    socket.current.emit("message", messages[0].text);
    //This will send along this piece of message eith user id 1 indicating blue for the sender
    setReceiveMessage((prevState) => GiftedChat.append(prevState, messages));
  };

  const joinChat = (username) => {
    socket.current.emit("join", username);
    setHasJoined(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {hasJoined ? (
        <GiftedChat
          renderUsernameOnMessage
          messages={receiveMessage}
          onSend={(messages) => onSave(messages)}
          user={{ _id: 1 }}
        />
      ) : (
        <JoinScreen joinChat={joinChat} />
      )}
    </View>
  );
}

// EXAMPLE 2

// import React, { useEffect, useState, useRef } from 'react'
// import { View, Text, StyleSheet, TextInput } from "react-native";
// import io from 'socket.io-client'
// import { GiftedChat } from 'react-native-gifted-chat'

// export default function HomeScreen() {
//   const [messageToSend, setMessageToSend] = useState('')
//   const [receiveMessage, setReceiveMessage] = useState([])
//   const socket = useRef(null)
//   // console.log(messageToSend)

//   useEffect(() => {
//     socket.current = io("http://192.168.0.107:3001")
//     socket.current.on('message', message => {
//       const testMessage = {
//         _id: 3,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       }
//       testMessage.text = message
//       setReceiveMessage(prevState => GiftedChat.append(prevState, testMessage))
//     })

//       setReceiveMessage([
//         {
//           _id: 1,
//           text: 'Hello developer',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//             avatar: 'https://placeimg.com/140/140/any',
//           },
//         },
//         {
//           _id: 2,
//           text: 'Hello developer',
//           createdAt: new Date(),
//           user: {
//             _id: 1,
//             name: 'React Native',
//             avatar: 'https://placeimg.com/140/140/any',
//           },
//         }
//       ]
//       )
//   },[])

//   return (
// <GiftedChat
//       messages={receiveMessage}
//       onSend={messages => socket.current.emit('message', messages[0].text)}
//       user={{ _id: 1, }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//   flex: 1,
//   justifyContent: "center",
//   alignItems: "center",
//   }
// })

// EXAMPLE 1

// import React, { useEffect, useState, useRef } from 'react'
// import { View, Text, StyleSheet, TextInput } from "react-native";
// import io from 'socket.io-client'

// export default function HomeScreen() {
//   const [messageToSend, setMessageToSend] = useState('')
//   const [receiveMessage, setReceiveMessage] = useState([])
//   const socket = useRef(null)
//   // console.log(messageToSend)

//   useEffect(() => {
//     socket.current = io("http://192.168.0.107:3001")
//     socket.current.on('message', message => {
//       setReceiveMessage(prevState => [...prevState, message])
//     })
//   },[])

//   return (
//     <View style={styles.container}>
//       {receiveMessage.map(msg => <Text key={msg}>{msg}</Text>)}
//       <TextInput
//         value={messageToSend}
//         placeholder="Enter chat message"
//         onChangeText={setMessageToSend}
//         onEndEditing={() => {
//           socket.current.emit('message', messageToSend)
//           setMessageToSend('')
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//   flex: 1,
//   justifyContent: "center",
//   alignItems: "center",
//   }
// })
