import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import ColorList from './ColorList'

const AppNavigator = createStackNavigator({
    Home: ColorList
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer