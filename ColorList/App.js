import React, {Component} from 'react';
import { StyleSheet, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import ColorButton from './components/ColorButton'
import ColorForm from './components/ColorForm'

export default class App extends Component {
  constructor() {
    super()
    const availableColors = []
    this.state = {
      backgroundColor: 'blue',
      availableColors
    }
    this.changeColor = this.changeColor.bind(this)
    this.newColor = this.newColor.bind(this)
  }

  componentDidMount() {
    getColor = async () => {
      try {
        const value = await AsyncStorage.getItem('@ColorListStore')
        setValue(value)
      } catch (err) {
        console.error('Error loading colors', err)
      }
    }
  }

  saveColor = async () => {
    try {
      await AsyncStorage.setItem('@ColorListStore', this.state.availableColors)
    } catch (err) {
      console.error('Error loading colors', err)
    }
  }

  changeColor(backgroundColor) {
    this.setState({backgroundColor})
  }

  newColor(color) {
    const availableColors = [
      // copy all old array into this new array
      ...this.state.availableColors,
      {color}
    ]
    this.setState({availableColors})
    this.saveColor({availableColors})
  }

  render() {
    const { backgroundColor } = this.state
    return (
      <FlatList data = {this.state.availableColors} 
        renderItem = {({item}) => 
          <ColorButton backgroundColor={item.color}
          // redundant code, can be changed as below
          // onSelect={(color) => this.changeColor(color)} 
          onSelect={this.changeColor} />
        }
        keyExtractor = {(item, index) => index.toString()}
        ListHeaderComponent = {() => <ColorForm onNewColor={this.newColor} /> }
        style={[ styles.container, { backgroundColor }]}>
      </FlatList>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
})

