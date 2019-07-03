import React, { Component } from "react"
import PropTypes from "prop-types"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import RandomNumber from './randomNumber'
import shuffle from 'lodash.shuffle'

export default class Game extends Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired, 
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired
  }

  state = {
    selectedIds: [],
    remainingSeconds: this.props.initialSeconds,
  }

  gameStatus = 'PLAYING'

  randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  )

  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0)

shuffledRandomNumbers = shuffle(this.randomNumbers)

componentDidMount() {
    this.intervalId = setInterval(() => {
        this.setState((prevState) => {
            return { remainingSeconds: prevState.remainingSeconds - 1 }
        }, () => {
            if (this.state.remainingSeconds === 0) {
                clearInterval(this.intervalId)
            }
        })
    }, 1000)
}

componentWillMount() {
    clearInterval(this.intervalId)
}

isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0
}

selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
        selectedIds: [...prevState.selectedIds, numberIndex] 
    }))
}

componentWillUpdate(nextProps, nextState) {
    if (
        nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0
        ) {
        this.gameStatus = this.calcgameStatus(nextState)
        if (this.gameStatus !== 'PLAYING') {
            clearInterval(this.intervalId)
        }
    }
}

calcgameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
        return acc + this.shuffledRandomNumbers[curr]
    }, 0)
    if (nextState.remainingSeconds === 0) {
        return 'LOST'
    }
    if (sumSelected < this.target) {
        return 'PLAYING'
    }
    if (sumSelected === this.target) {
        return 'WON'
    }
    if (sumSelected > this.target) {
        return 'LOST'
    }
}

  render() {
    const gameStatus = this.gameStatus
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <Text>{this.state.remainingSeconds}</Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => (
              <RandomNumber 
                key={index} 
                id={index}
                number={randomNumber} 
                isDisabled={
                    this.isNumberSelected(index) || gameStatus !== 'PLAYING'
                }
                onPress={this.selectNumber}
              />
          ))}
        </View>
        { this.gameStatus !== 'PLAYING' && (
            <TouchableOpacity 
                style={styles.button} 
                onPress={this.props.onPlayAgain}
            >
                <Text style={styles.buttonTitle}>Play Again</Text>
            </TouchableOpacity>
        )}
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#96DDFF",
    flex: 1
  },
  target: {
    fontSize: 40,
    color: "#fff",
    backgroundColor: "#01BFFF",
    padding: 10,
    marginTop: 50,
    marginLeft: 30,
    marginRight: 30,
    textAlign: "center"
  },
  randomContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap'
  },
  STATUS_PLAYING: {
    backgroundColor: "#01BFFF",
  },
  STATUS_WON: {
    backgroundColor: "green",
  },
  STATUS_LOST: {
    backgroundColor: "orange",
  },
  button: {
      height: 50,
      backgroundColor: '#01BFFF', 
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 80,
      marginVertical: 50
  },
  buttonTitle: {
    color: '#fff',
    fontSize: 40
  }
})
