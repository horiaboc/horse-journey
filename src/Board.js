import React from 'react'
import './Board.css'
import Tile from './Tile'
import Context from './Context'

class Board extends React.Component {

  constructor(props) {
    super(props)
    let boardArray = this.createArray(Context.rows, Context.columns, 0)
    this.state = {
      board: boardArray,
      solutions: 0,
    }
  }

  createArray(x, y, value) {
    let array = []
    for (let i = 0; i < x; i++) {
      array.push([])
      for (let j = 0; j < y; j++) {
        array[i].push(value)
      }
    }
    return array
  }

  cloneArray(array){
    let newArray = []
    for (let i = 0; i < array.length; i++) {
      newArray.push([])
      for (let j = 0; j < array[i].length; j++) {
        newArray[i].push(array[i][j])
      }
    }
    return newArray
  }

  componentDidMount() {
    console.log('preparing...')
    this.startGame()
    console.log(`showing ${Context.boards.length} steps.`)
    this.drawNext()
  }

  componentDidUpdate() {
    setTimeout(()=>{
      this.drawNext()
    },Context.speed)
  }

  drawNext() {
    console.log(`${Context.boards.length} remaining steps...`)
    do {
      // waiting
    } while (Context.boards.length === 0)
    let currentBoard = Context.boards.shift()
    let newState = this.state
    newState.board = currentBoard
    if(this.checkGame(currentBoard)) newState.solutions++
    if(Context.boards.length === 0) newState.solutions = newState.solutions + ' ---- FINISHED!'
    this.setState(newState)

  }

  checkGame(board){
    for (let i in board) {
      for (let j in board[i]) {
        if (board[i][j] === 0) {
          return false
        }
      }
    }
    return true
  }

  startGame() {

    let moveTo = (i, j) => {
      if (i < 0 || j < 0 || i >= Context.rows || j >= Context.columns || newBoard[i][j] > 0) return

      newBoard[i][j] = 1
      Context.boards.push(this.cloneArray(newBoard))

      newBoard[i][j] = 2

      moveTo(i + 1, j + 2)
      moveTo(i + 2, j + 1)
      moveTo(i - 1, j + 2)
      moveTo(i - 2, j + 1)
      moveTo(i + 1, j - 2)
      moveTo(i + 2, j - 1)
      moveTo(i - 1, j - 2)
      moveTo(i - 2, j - 1)

      newBoard[i][j] = 1
      Context.boards.push(this.cloneArray(newBoard))
      newBoard[i][j] = 0

    }

    let newBoard = this.cloneArray(this.state.board)
    Context.boards.push(this.cloneArray(newBoard))
    moveTo(0, 0)

  }

  render() {
    const plusStyle = {
      gridTemplateColumns: `repeat(${Context.columns}, 1fr)`,
      width: `${Context.columns * (Context.tileSize + Context.gap) + Context.gap}px`,
      height: `${Context.rows * (Context.tileSize + Context.gap) + Context.gap}px`
    }

    let tiles = []
    for (let i = 0; i < Context.rows; i++) {
      for (let j = 0; j < Context.columns; j++) {
        let id = `id_${i}_${j}`
        let color = '#ffffff'
        if (i % 2 === 0) {
          color = j % 2 === 0 ? '#ffffff' : '#000000'
        } else {
          color = j % 2 === 0 ? '#000000' : '#ffffff'
        }
        let content = ''
        if (this.state.board[i][j] === 1) {
          content = 'horse'
        }
        if (this.state.board[i][j] === 2) {
          content = 'circle'
        }
        tiles.push(<Tile key={id} color={color} content={content} />)
      }
    }

    return (
      <>
      <div id="board" style={plusStyle}>
        { tiles }
      </div>
      <div id='solutions'> Solutions: { this.state.solutions }</div>
      </>
    )
  }



}

export default Board
