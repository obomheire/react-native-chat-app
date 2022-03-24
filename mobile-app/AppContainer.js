import { createAppContainer, createSwitchNavigator} from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import FriendListScreen from "./screens/FriendListScreen"
import ChatScreen from "./screens/ChatScreen"
import JoinScreen from "./screens/JoinScreen"

const AppStack = createStackNavigator(
    {
        Home: FriendListScreen,
        Chat: ChatScreen
    }
    )

export default createAppContainer(
    createSwitchNavigator(
        {
            App: AppStack,
            Join: JoinScreen
        },
        {
           initialRouteName: 'Join' 
        }
    )
)