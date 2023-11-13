import './App.css';
import React, { useState } from "react"
import { Box, Button, Container, Grid, } from '@mui/material';
import blankUrl from "./images/IGnmVTp.png"
import MEFDFFD_o from "./images/MEFDFFD_o.png"
import MEFDFFE_o from "./images/MEFDFFE_o.png"
import MEFDFFF_o from "./images/MEFDFFF_o.png"
import MEFDFFG_o from "./images/MEFDFFG_o.png"
import MEFDFFH_o from "./images/MEFDFFH_o.png"
import MEFDFFI_o from "./images/MEFDFFI_o.png"
import MEFDFFK_o from "./images/MEFDFFK_o.png"
import MEFDFFL_o from "./images/MEFDFFL_o.png"
import MEFDFFJ_o from "./images/MEFDFFJ_o.png"

const gameGrid = [
  [MEFDFFL_o, MEFDFFK_o, MEFDFFJ_o], [MEFDFFI_o, MEFDFFH_o, MEFDFFG_o], [MEFDFFF_o, MEFDFFE_o, MEFDFFD_o]
]
const blankSpace = [0, gameGrid[0].length - 1]
const gridWithBlank = gameGrid.map((subArray, ind) => {
  if (ind === blankSpace[0]) {
    const sub = subArray.map(x => x)

    return sub.map((val, i) => {
      if (i === blankSpace[1]) {
        return blankUrl
      }
      return val
    })
  }
  return subArray.map(x => x)
})

const Winner = (props) => {
  props.setShowMoves(false)
  return (
    <h2 >You Solved it! It took you {props.moves} moves!</h2>
  )
}
const GameBoard = (props) => {
  return (
    <Grid container id='gameBoard'>
      {props.grid.map((arr, arrInd) => {
        return (
          arr.map((val, valInd) => {
            return (

              <div className='gameSquare' onClick={() => {
                return props.onMove(arrInd, valInd)
              }}>
                <img src={val} alt={`Tile ${valInd + 1}`} id={val} />
              </div>

            )
          })
        )
      })}
    </Grid>
  )
}
const App = () => {
  const [grid, setGrid] = useState([...gridWithBlank].map(x => [...x]))
  const [isWin, setIsWin] = useState(false)
  const [moveCount, setMoveCount] = useState(0)
  const [showMoves, setShowMoves] = useState(false)

  const blankSubArr = grid.findIndex(x => x.includes(blankUrl))
  const blankIndex = grid[blankSubArr].indexOf(blankUrl)


  function checkWin(arr1, arr2) {
    if (!arr1.length || !arr2.length) return setIsWin(false);
    if (arr1.length !== arr2.length) return setIsWin(false);
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr1.length; j++) {
        if (arr1[i][j] !== arr2[i][j]) return setIsWin(false)
      }
    }
    return setIsWin(true)
  }


  const moveBlankLeft = (curGrid, blankChar) => {
    let index = curGrid.indexOf(blankChar)
    if (curGrid[index - 1]) {
      let temp = curGrid[index]
      curGrid[index] = curGrid[index - 1]
      curGrid[index - 1] = temp
    }
    checkWin(gridWithBlank, curGrid)
    return curGrid
  }


  const moveBlankRight = (curGrid, blankChar) => {
    let index = curGrid.indexOf(blankChar)
    if (curGrid[index + 1]) {
      let temp = curGrid[index]
      curGrid[index] = curGrid[index + 1]
      curGrid[index + 1] = temp
    }
    checkWin(gridWithBlank, curGrid)
    return curGrid
  }

  const moveBlankUp = (curGrid, blankGrid) => {
    let j, index
    for (let i = 0; i < curGrid.length; i++) {
      if (curGrid[i].includes(blankGrid)) {
        j = curGrid[i].indexOf(blankGrid)
        index = i
        break
      }
    }
    if (curGrid[index - 1]) {

      let temp = curGrid[index][j]
      curGrid[index][j] = curGrid[index - 1][j]
      curGrid[index - 1][j] = temp
    }
    checkWin(gridWithBlank, curGrid)
    return curGrid
  }



  const moveBlankDown = (curGrid, blankGrid) => {
    let j, index
    for (let i = 0; i < curGrid.length; i++) {
      if (curGrid[i].includes(blankGrid)) {
        j = curGrid[i].indexOf(blankGrid)
        index = i
        break
      }
    }
    if (curGrid[index + 1]) {
      let temp = curGrid[index][j]
      curGrid[index][j] = curGrid[index + 1][j]
      curGrid[index + 1][j] = temp
    }
    checkWin(gridWithBlank, curGrid)
    setShowMoves(true)
    return curGrid
  }

  const shuffleGrid = () => {
    setMoveCount(0)
    setIsWin(false)
    const tempFlatGrid = ([...grid].map(x => [...x])).flat()

    for (let i = tempFlatGrid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = tempFlatGrid[i];
      tempFlatGrid[i] = tempFlatGrid[j];
      tempFlatGrid[j] = temp;
    }

    const tempGrid = []
    while (tempFlatGrid.length) {
      tempGrid.push(tempFlatGrid.splice(0, 3))
    }

    setGrid(tempGrid)
  }

  const resetGame = () => {
    setGrid([...gridWithBlank].map(x => [...x]))
    setIsWin(false)
    setMoveCount(0)
    setShowMoves(false)
  }

  const handleMove = (arrInd, valInd) => {
    const newGrid = [...grid].map(x => [...x])

    if (arrInd === blankSubArr) {
      const gridDimension = newGrid.length
      if (valInd - blankIndex === 1) {
        // move right
        const modifiedArr = []
        for (let i = 0; i < newGrid.length; i++) {
          if (i === blankSubArr) {
            modifiedArr.push(moveBlankRight(newGrid[i], blankUrl))
          } else {
            modifiedArr.push(newGrid[i])
          }
        }

        checkWin(gridWithBlank, modifiedArr)
        setGrid([...modifiedArr].map(x => x))
        setMoveCount(moveCount + 1)
        setShowMoves(true)
      } else if (valInd - blankIndex === -1 && blankIndex % gridDimension) {
        // move left
        const modifiedArr = []
        for (let i = 0; i < newGrid.length; i++) {
          if (i === blankSubArr) {
            modifiedArr.push(moveBlankLeft(newGrid[i], blankUrl))
          } else {
            modifiedArr.push(newGrid[i])
          }
        }

        checkWin(gridWithBlank, modifiedArr)
        setGrid([...modifiedArr].map(x => x))
        setMoveCount(moveCount + 1)
        setShowMoves(true)
      }
    } else if (arrInd !== blankSubArr && valInd === blankIndex) {
      if (arrInd - blankSubArr === 1) {
        // move down
        setGrid([...moveBlankDown(newGrid, blankUrl)].map(x => x))
        setMoveCount(moveCount + 1)
      } else if (arrInd - blankSubArr === -1) {
        // move up
        setGrid([...moveBlankUp(newGrid, blankUrl)].map(x => x))
        setMoveCount(moveCount + 1)
        setShowMoves(true)
      }
    }
  }
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item  >

        <h1 style={{ margin: "1px auto" }}>Boston Celtics Sliding Puzzle</h1>
      </Grid>
      <Grid item pt={2} pb={2} >
        <Button variant="contained" className="button" onClick={() => shuffleGrid(grid)} style={{ backgroundColor: "#222" }}>Shuffle</Button>
        <Button variant="contained" style={{ marginLeft: "10px", backgroundColor: "#222" }} onClick={resetGame}>New Game</Button>

      </Grid>
      <Grid item  >
        {showMoves && <span >Moves: {moveCount}</span>}
        {!showMoves && <p style={{ marginBottom: 22 }}></p>}

      </Grid>

      <Grid item container justifyContent="center"
        alignItems="center" xl={2}>
        {isWin ?
          <Winner moves={moveCount} setShowMoves={setShowMoves} /> :
          <GameBoard onMove={(arrInd, valInd) => handleMove(arrInd, valInd)} grid={grid} />
        }
      </Grid>
      <footer>
        <p>By <a href="https://hendersonsargeant.netlify.app/">Henderson Sargeant</a></p>
      </footer>
    </Grid>
  )

}

export default App;
