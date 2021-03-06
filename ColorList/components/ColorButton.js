import React from "react"
import { StyleSheet, Text, View, TouchableHighlight } from "react-native"

// stateless functional component
// f=>f prevent app from crashing when user presses on button
// because it's not a required function, we set it a default function
const ColorButton = ({backgroundColor, onSelect=f=>f }) => (
  <TouchableHighlight
    style={styles.button}
    onPress={() => onSelect()}
    underlayColor="orange"
  >

    <View style={styles.row}>
      {/* color indicator on the left of a button */}
      <View style={[styles.sample, {backgroundColor}]} />
      {/* color name */}
      <Text style={styles.text}>{backgroundColor}</Text>
    </View>

  </TouchableHighlight>
)

const styles = StyleSheet.create({
    button: {
      margin: 10,
      padding: 10,
      borderWidth: 2,
      borderRadius: 10,
      alignSelf: 'stretch',
      backgroundColor: 'rgba(255,255,255,.8)'
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    sample: {
      height: 20,
      width: 20,
      borderRadius: 10,
      margin: 5, 
      backgroundColor: 'white'
    },
    text: {
      fontSize: 30,
      margin: 5
    }
  })

  export default ColorButton
