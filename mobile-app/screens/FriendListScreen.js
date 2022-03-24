import React from 'react'
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux'

const FriendListScreen = ({ navigation }) => {
    const usersOnline = useSelector(state => state.usersOnline)
    console.log('UserOnLine', usersOnline)

  return (
    <View style={{ flex: 1}}>
      <FlatList
        data={usersOnline}
        renderItem={({ item }) => {
          console.log("item", item);
          return (
            <TouchableOpacity onPress={() => navigation.navigate('Chat', {name: item.username, userId: item.userId})}>
            <View style={itemContainerStyle}>
              <Image style={avatarImageStyle} source={{uri: item.avatar}} />
              <View style={avatarNameViewStyle}>
              <Text>{item.username}</Text>
              </View>
            </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.userId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainerStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  avatarImageStyle: {
    width: 100, 
    height: 100, 
    borderRadius: 50
  },
  avatarNameViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const { itemContainerStyle, avatarImageStyle, avatarNameViewStyle} = styles

export default FriendListScreen
