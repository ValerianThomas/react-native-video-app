import { createStackNavigator, createAppContainer } from 'react-navigation'
import Main from '../Screens/Main'
import Video from '../Screens/Video'
import Camera from '../Screens/Camera'
const Stack = createStackNavigator({
  Main,
  Video,
  Camera
})
const Router = createAppContainer(Stack)
export default Router
