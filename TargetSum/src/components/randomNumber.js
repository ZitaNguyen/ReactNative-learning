import React, { Component } from "react"
import PropTypes from "prop-types"
import { StyleSheet, Text, TouchableOpacity } from "react-native"


export default class RandomNumber extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
  }

  handlePress = () => {
      if (this.props.isDisabled) {return}
      this.props.onPress(this.props.id)
  }
  
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  random: {
    fontSize: 40,
    color: "#000",
    margin: 30,
    padding: 20,
    textAlign: "center",
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 100 / 2,
    borderColor: "#01BFFF",
   
  },
  disabled: {
    opacity: 0.3
  }
})
