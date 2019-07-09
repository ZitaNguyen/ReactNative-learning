import React, {Component} from 'react'
import Game from './src/components/Game'

export default class App extends Component {
  state = {
    gameId: 1,
    score: 0,
  }

  resetGame = () => {
    this.setState((prevState) => {
      return { 
        gameId: prevState.gameId + 1, 
        score: prevState.score 
      }
    })
  }

  render() {
    return (
      <Game 
        key={this.state.gameId} // unique id of each game
        onPlayAgain={this.resetGame} // reset game to play again
        randomNumberCount={6} // quantity of numbers appear in a game to make sum
        initialSeconds={10} // time limited to play game
        score={this.state.score}
      />
    )
  }
}