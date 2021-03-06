import React, { useState } from "react";
import { Text, View, TextInput, Button, Image } from "react-native";
import { useDispatch } from "react-redux";

const JoinScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch()

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require("../assets/chat-icon.png")}
      />
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <TextInput
          onChangeText={setUsername}
          style={{ fontSize: 30, textAlign: "center" }}
          placeholder="Enter Username"
        />
        <Button title="Join Chat" onPress={() => {
          dispatch({ type: 'server/join', data: username})
          navigation.navigate('App')
        }} />
      </View>
    </View>
  );
};

export default JoinScreen;

//EXAMPLE 1

/*
import React, { useState } from "react";
import { Text, View, TextInput, Button, Image } from "react-native";

const JoinScreen = ({ joinChat }) => {
  const [username, setUsername] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require("../assets/chat-icon.png")}
      />
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <TextInput
          onChangeText={setUsername}
          style={{ fontSize: 30, textAlign: "center" }}
          placeholder="Enter Username"
        />
        <Button title="Join Chat" onPress={() => joinChat(username)} />
      </View>
    </View>
  );
};

export default JoinScreen;
*/
