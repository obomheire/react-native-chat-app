import React from 'react'
import { View } from "react-native";
import AppContainer from './AppContainer';
// import HomeScreen from './screens/HomeScreen';
import { createStore, applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { Provider } from 'react-redux';

// const socket = io("http://192.168.88.231:3001") //uno
const socket = io("http://192.168.0.107:3001") // office
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

const reducer = (state={}, action) => {
  switch(action.type){
    case 'message':
      return {...state, message: action.data}
    case 'users_online':
      return {...state, usersOnline: action.data}
      default: 
      return state
  }
}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer)
store.subscribe(() => {
  console.log('New state', store.getState())
})

store.dispatch({type: 'server/hello', data: 'hello'})

export default function App() {

  return (
      // <HomeScreen />
      <Provider store={store}>
      <AppContainer />
      </Provider>
  );
}

// EXAMPLE 1

/*
import React from 'react'
import { View } from "react-native";
import AppContainer from './AppContainer';
import HomeScreen from './screens/HomeScreen';

export default function App() {

  return (
      // <HomeScreen />
      <AppContainer />
  );
}
*/