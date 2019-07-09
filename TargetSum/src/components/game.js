import React, { Component } from "react"
import PropTypes from "prop-types"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import RandomNumber from './RandomNumber'
import shuffle from 'lodash.shuffle'

export default class Game extends Component {
  // built-in typechecking abilities of React, help to catch bugs easier
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired, 
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  }

  state = {
    selectedIds: [], // number that player clicked
    remainingSeconds: this.props.initialSeconds, // time left to play
  }

  gameStatus = 'PLAYING' // game status

  // from() method creates a new, shallow-copied Array instance from
  // an array-like or iterable object
  // map() method creates a new array with the results of calling a provided function
  // on every element in the calling array
  // math.floor() function returns the largest integer less than or equal to a given number
  // math.random() returns a floating-point, pseudo-random number in the range 0-1

  // randomNumberCount is a prop in Game component in App.js
  randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(
    () => 1 + Math.floor(10 * Math.random())
  )

  // reduce() method executes a function on each element of the array
  // acc: accumulator, curr: currentValue
  // generate a sum target for the game
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0)

  // shuffle random numbers in different order in the array, not the first 4  
  shuffledRandomNumbers = shuffle(this.randomNumbers)

  // method runs after the component output has been rendered to the DOM
  // we can name it timerID to understand easily
  componentDidMount() {
    this.intervalId = setInterval(() => {
      // if is playing starts timer
      if (this.gameStatus === 'PLAYING') {
        // React recommends using a function inside of setState with (prevState, props)  
        this.setState((prevState) => {
              // timer count down
              return { remainingSeconds: prevState.remainingSeconds - 1 } 
          }, () => {
              if (this.state.remainingSeconds === 0) {
                // stop timer when reach 0 
                clearInterval(this.intervalId) 
              }
          })
      }
    }, 1000)
  }

  // the method is only called one time, before the initial render
  // a chance to handle configuration, update state, ...prepare for the first render
  // reset a timer for a new game
  componentWillMount() {
    // set status default to read instruction and appearance of button START
    this.gameStatus = 'DEFAULT',
    clearInterval(this.intervalId)
  }

  // change game status when pressing on button START
  startGame = () => {
    this.gameStatus = 'PLAYING'
  }

  // indexOf() method returns the position of the first occurrence 
  // of a specified value in a string
  // the method returns -1 if the vaule to search for never occurs
  // function to check if the number has been selected or not
  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0
  }

  // a function to store selected numbers in an array
  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      // spread opeartor (3 dots) expands an array into a list 
      selectedIds: [...prevState.selectedIds, numberIndex] 
    }))
  }

  // method is called every time a re-render is required
  // this.props or this.state is to call old props or state
  // common use: to set a variable based on state changes, dispatching events or starting animations
  componentWillUpdate(nextProps, nextState) {
    // if select another number or time is up
    if (
        nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0
        ) {
        this.gameStatus = this.calcgameStatus(nextState)
        // if not playing, stop the timer
        if (this.gameStatus !== 'PLAYING') {
            clearInterval(this.intervalId)
        }
      }
  }

  // function to know game status
  calcgameStatus = (nextState) => {
    // calculate total of selected numbers
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
        return acc + this.shuffledRandomNumbers[curr]
    }, 0)

    // if time is up: lose
    if (nextState.remainingSeconds === 0) {
        return 'LOST'
    }
    
    // if total is inferieur target value: playing
    if (sumSelected < this.target) {
        return 'PLAYING'
    }
    
    // if total equals target value: win
    if (sumSelected === this.target) {
        return 'WON'
    }
    
    // if total superieur target value: lose
    if (sumSelected > this.target) {
        return 'LOST'
    }
  }

  render() {
    const gameStatus = this.gameStatus
    return (
      <View style={styles.container}>
        {/* game instruction */}
        <Text style={styles.instruction}>
          Choose correct numbers to have a total of the target number showed in the box
        </Text>

        {/* target sum display box */}
        { (this.gameStatus === 'DEFAULT' || this.gameStatus === 'PLAYING') && (
          <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
            {this.target}
          </Text>
          )
        }

        {/* show game status message */}
        { this.gameStatus !== 'DEFAULT' && this.gameStatus !== 'PLAYING' && (
          <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
            {this.gameStatus}
          </Text>
          )
        }
        
        {/* timer */}
        { this.gameStatus !== 'DEFAULT' && (
          <Text style={styles.timer}>Attention: {this.state.remainingSeconds}</Text>
        )}
        
        {/* list of random numbers */}
        <View style={styles.randomContainer}>

          {this.gameStatus !== 'DEFAULT' && this.shuffledRandomNumbers.map((randomNumber, index) => (
              <RandomNumber 
                key={index} 
                id={index}
                number={randomNumber} 
                // if number has been selected or not playing, disabled number to choose
                isDisabled={
                    this.isNumberSelected(index) || gameStatus !== 'PLAYING'
                }
                onPress={this.selectNumber}
              />
          ))}
        </View>

        {/* if not playing yet, show the START GAME button */}
        { this.gameStatus === 'DEFAULT' && (
            <TouchableOpacity 
                style={styles.button} 
                onPress={this.startGame}
            >
                <Text style={styles.buttonTitle}>START</Text>
            </TouchableOpacity>
        )}
        
        {/* if not playing, show the PLAY AGAIN button */}
        { this.gameStatus !== 'DEFAULT' && this.gameStatus !== 'PLAYING' && (
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
    backgroundColor: "#006FC2",
    flex: 1
  },
  instruction: {
    fontSize: 20,
    textAlign: 'justify',
    color: '#CCEBFF',
    marginTop: 10, 
    padding: 25
  },
  target: {
    fontSize: 40,
    color: "#fff",
    backgroundColor: "#01BFFF",
    padding: 10,
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
  STATUS_DEFAULT: {
    backgroundColor: "#01BFFF",
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
  timer: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: '#CCEBFF'
  },
  button: {
      height: 50,
      backgroundColor: '#68C2FF', 
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
