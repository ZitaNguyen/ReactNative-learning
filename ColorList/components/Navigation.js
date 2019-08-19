import { createStackNavigator, createAppContainer } from 'react-navigation'

import ColorList from './ColorList'
import ColorInfo from './ColorInfo'

const AppNavigator = createStackNavigator({
    Home: {screen: ColorList},
    Details: {screen: ColorInfo}
})

export default AppContainer = createAppContainer(AppNavigator)
