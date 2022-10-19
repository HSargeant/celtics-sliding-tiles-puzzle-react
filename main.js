const gameGrid = [["https://images4.imagebam.com/b8/6c/28/MEFDFFL_o.png","https://images4.imagebam.com/40/68/bc/MEFDFFK_o.png","https://images4.imagebam.com/6e/73/53/MEFDFFJ_o.png"],["https://images4.imagebam.com/ef/91/bf/MEFDFFI_o.png","https://images4.imagebam.com/bd/ce/07/MEFDFFH_o.png","https://images4.imagebam.com/4e/a9/4d/MEFDFFG_o.png"],["https://images4.imagebam.com/cc/be/2e/MEFDFFF_o.png","https://images4.imagebam.com/a0/8a/db/MEFDFFE_o.png","https://images4.imagebam.com/c4/91/a3/MEFDFFD_o.png"]]
// const gameGrid = [["https://i.imgur.com/zhpfEVe.png","https://i.imgur.com/u10nOUw.png","https://i.imgur.com/sEQOcGq.png"],["https://i.imgur.com/ggUqmPE.png","https://i.imgur.com/0GB90f6.png","https://i.imgur.com/nN4kAp6.png"],["https://i.imgur.com/cj9s8XS.png","https://i.imgur.com/G1kBgAO.png","https://i.imgur.com/BOkhyd6.png"]]


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
    <h2>You won! It took you {props.moves} moves!</h2>
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

const Game = () => {
    const [grid, setGrid] = React.useState([...gridWithBlank].map(x => [...x]))
    const [isWin, setIsWin] = React.useState(false)
    const [moveCount, setMoveCount] = React.useState(0)
    
    const blankSubArr = grid.findIndex(x => x.includes(blankUrl))
    const blankIndex = grid[blankSubArr].indexOf(blankUrl)
    
    // insert Day1 function 'checkWin' here
    // instead of return true or return false, use setIsWin(true) or setIsWin(false)
    function checkWin(arr1,arr2){
    if (!arr1.length || !arr2.length) return setIsWin(false);
    if (arr1.length !== arr2.length) return setIsWin(false);
    for(i=0; i<arr1.length;i++){
      for(j=0;j<arr1.length;j++){
        if(arr1[i][j]!==arr2[i][j]) return setIsWin(false)
      }
    }
    return setIsWin(true)
}

    // insert Day2 move left function 'moveBlankLeft(curGrid, blankChar)' here
    // just before return, add this 'checkWin(gridWithBlank, curGrid)'
    // should return mutated array that was passed in (curGrid)
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
  

    
    // insert Day2 move right function 'moveBlankRight(curGrid, blankChar)' here
    // just before return, add this 'checkWin(gridWithBlank, curGrid)'
    // should return mutated array that was passed in (curGrid)
const moveBlankRight=(curGrid,blankChar)=>{
  console.log(curGrid,blankChar)
    let index = curGrid.indexOf(blankChar)
    if(curGrid[index+1]){
    let temp = curGrid[index]
    curGrid[index] = curGrid[index+1]
    curGrid[index+1] = temp
    }
    console.log(curGrid,"----------")
    checkWin(gridWithBlank, curGrid)
    return curGrid
}

    // insert Day4 move up function 'moveBlankUp(curGrid, blankGrid) here'
    // just before return, add this 'checkWin(gridWithBlank, curGrid)'
    // should return mutated array that was passed in (curGrid)
  function moveBlankUp(curGrid,blankGrid){
  let j
  for(i=0; i<curGrid.length;i++){
      if(curGrid[i].includes(blankGrid)){
          j=curGrid[i].indexOf(blankGrid)
          break
      }
  } 
  if(curGrid[i-1]){
      let temp = curGrid[i][j]
      curGrid[i][j] = curGrid[i-1][j]
      curGrid[i-1][j]=temp
  }
      checkWin(gridWithBlank, curGrid)
  return curGrid
  }
    
    // insert Day4 move down function 'moveBlankDown(curGrid, blankGrid) here'
    // just before return, add this 'checkWin(gridWithBlank, curGrid)'
    // should return mutated array that was passed in (curGrid)
  
  function moveBlankDown(curGrid,blankGrid){
  let j
  for(i=0; i<curGrid.length;i++){
      if(curGrid[i].includes(blankGrid)){
          j=curGrid[i].indexOf(blankGrid)
          break
      }
  }  
  if(curGrid[i+1]){
      let temp = curGrid[i][j]
      curGrid[i][j] = curGrid[i+1][j]
      curGrid[i+1][j]=temp
  }
    checkWin(gridWithBlank, curGrid)
  return curGrid
  }

    
   // My found and modified Day5 shuffle function
    // Uses Durstenfeld shuffle algorithm
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
    
    ReactDOM.render(<Game />, document.getElementById("root"))
    
    // 