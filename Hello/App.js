import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.welcome, {flex: 2}]}>Hello World</Text>
        <Text style={[styles.welcome, {flex: 1}]}>Hello World</Text>
        <Text style={[styles.welcome, {flex: 1}]}>Hello World</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'orange',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor:'white'
  }
})
