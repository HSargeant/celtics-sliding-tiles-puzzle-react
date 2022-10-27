import './App.css';
import React from "react"

const App = () => {
  const gameGrid = [["https://images4.imagebam.com/b8/6c/28/MEFDFFL_o.png","https://images4.imagebam.com/40/68/bc/MEFDFFK_o.png","https://images4.imagebam.com/6e/73/53/MEFDFFJ_o.png"],["https://images4.imagebam.com/ef/91/bf/MEFDFFI_o.png","https://images4.imagebam.com/bd/ce/07/MEFDFFH_o.png","https://images4.imagebam.com/4e/a9/4d/MEFDFFG_o.png"],["https://images4.imagebam.com/cc/be/2e/MEFDFFF_o.png","https://images4.imagebam.com/a0/8a/db/MEFDFFE_o.png","https://images4.imagebam.com/c4/91/a3/MEFDFFD_o.png"]]


  const blankSpace = [0,gameGrid[0].length-1]
  
  const blankUrl = 'https://i.imgur.com/IGnmVTp.png'
  
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
    return (
      <h2>You Solved it! It took you {props.moves} moves!</h2>
    )
  }
  
  
  const GameBoard = (props) => {
      return(
          <section id='gameBoard'>
              {props.grid.map((arr, arrInd) => {
                  return (
                      arr.map((val, valInd) => {
                          return (
                              <div className='gameSquare' onClick={() => {
                                return props.onMove(arrInd,valInd)
                              }}>
                                <img src={val} alt={`Tile ${valInd+1}`} id={val} />
                              </div>
                          )
                      })
                  )
              })}
          </section>
      )
  }

  const [grid, setGrid] = React.useState([...gridWithBlank].map(x => [...x]))
  const [isWin, setIsWin] = React.useState(false)
  const [moveCount, setMoveCount] = React.useState(0)
  
  const blankSubArr = grid.findIndex(x => x.includes(blankUrl))
  const blankIndex = grid[blankSubArr].indexOf(blankUrl)
  
 
  function checkWin(arr1,arr2){
  if (!arr1.length || !arr2.length) return setIsWin(false);
  if (arr1.length !== arr2.length) return setIsWin(false);
  for(let i=0; i<arr1.length;i++){
    for(let j=0;j<arr1.length;j++){
      if(arr1[i][j]!==arr2[i][j]) return setIsWin(false)
    }
  }
  return setIsWin(true)
}


const moveBlankLeft=(curGrid,blankChar)=>{
  let index = curGrid.indexOf(blankChar)
  if(curGrid[index-1]){
  let temp = curGrid[index]
  curGrid[index] = curGrid[index-1]
  curGrid[index-1] = temp
}
  checkWin(gridWithBlank, curGrid)
  return curGrid
}


const moveBlankRight=(curGrid,blankChar)=>{
  let index = curGrid.indexOf(blankChar)
  if(curGrid[index+1]){
  let temp = curGrid[index]
  curGrid[index] = curGrid[index+1]
  curGrid[index+1] = temp
  }
  checkWin(gridWithBlank, curGrid)
  return curGrid
}

function moveBlankUp(curGrid,blankGrid){
  let j,index
for(let i=0; i<curGrid.length;i++){
    if(curGrid[i].includes(blankGrid)){
        j=curGrid[i].indexOf(blankGrid)
        index=i
        break
    }
} 
if(curGrid[index-1]){

    let temp = curGrid[index][j]
    curGrid[index][j] = curGrid[index-1][j]
    curGrid[index-1][j]=temp
}
    checkWin(gridWithBlank, curGrid)
return curGrid
}
  


function moveBlankDown(curGrid,blankGrid){
let j,index
for(let i=0; i<curGrid.length;i++){
    if(curGrid[i].includes(blankGrid)){
        j=curGrid[i].indexOf(blankGrid)
          index=i
        break
    }
}  
if(curGrid[index+1]){
    let temp = curGrid[index][j]
    curGrid[index][j] = curGrid[index+1][j]
    curGrid[index+1][j]=temp
}
  checkWin(gridWithBlank, curGrid)
return curGrid
}


  const shuffleGrid = () => {
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
        tempGrid.push(tempFlatGrid.splice(0,3))
      }

      setGrid(tempGrid)
    }
      
      const resetGame = () => {
        setGrid([...gridWithBlank].map(x => [...x]))
        setIsWin(false)
        setMoveCount(0)
      }
      
      const handleMove = (arrInd, valInd) => {
        const newGrid = [...grid].map(x => [...x])
  
        if (arrInd === blankSubArr) {
          const gridDimension = newGrid.length
          if (valInd - blankIndex === 1) {
            // move right
            const modifiedArr = []
            for (let i=0; i<newGrid.length; i++) {
              if (i === blankSubArr) {
                modifiedArr.push(moveBlankRight(newGrid[i], blankUrl))
              } else {
                modifiedArr.push(newGrid[i])
              }
            }
  
            checkWin(gridWithBlank, modifiedArr)
            setGrid([...modifiedArr].map(x=>x))
            setMoveCount(moveCount + 1)
          } else if (valInd - blankIndex === -1  && blankIndex % gridDimension) {
            // move left
            const modifiedArr = []
            for (let i=0; i<newGrid.length; i++) {
              if (i === blankSubArr) {
                modifiedArr.push(moveBlankLeft(newGrid[i], blankUrl))
              } else {
                modifiedArr.push(newGrid[i])
              }
            }
  
            checkWin(gridWithBlank, modifiedArr)
            setGrid([...modifiedArr].map(x=>x))
            setMoveCount(moveCount + 1)
          }
        } else if (arrInd !== blankSubArr && valInd === blankIndex) {
          if (arrInd - blankSubArr === 1) {
            // move down
            setGrid([...moveBlankDown(newGrid, blankUrl)].map(x=>x))
            setMoveCount(moveCount + 1)
          } else if (arrInd - blankSubArr === -1) {
            // move up
            setGrid([...moveBlankUp(newGrid, blankUrl)].map(x=>x))
            setMoveCount(moveCount + 1)
          }
        }
      }
      
      return (
            <div className="container">
          <div>
              <button onClick={() => shuffleGrid(grid)}>Shuffle</button>
              <button onClick={() => resetGame()}>New Game</button>
          </div>
          
              {isWin ?
                <Winner moves={moveCount} /> :
                <GameBoard onMove={(arrInd, valInd) => handleMove(arrInd, valInd)} grid={grid} />
              }
            </div>
      )
      
  }

export default App;
