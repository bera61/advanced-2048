const score = document.getElementById('score');
const canvas= document.querySelector('.board');
const undoButtons = document.querySelectorAll('.remainUndoBonus');
const resetButton=document.querySelector('.reset-button');
let width = 4;
let board=[];
startGame();
let value = 0;
let undo = false;
let previousBoard = [];
let previousScore = 0;
let undoBonus= 3;

function startGame(){
    createBoard();
    addNewTile();
    addNewTile();
    setInterval(() => {
        addColor();
    },50);
}
function createBoard(){
    for (let i=0; i<width*width; i++){
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.innerHTML= '0';
    canvas.appendChild(tile);
    board.push(tile);
}
}
function moveUp() {
    for(let col=0; col<4; col++){
         let column = [
            parseInt(board[col].innerHTML),
            parseInt(board[col+4].innerHTML),
            parseInt(board[col+8].innerHTML),
            parseInt(board[col+12].innerHTML)
        ];
        let filteredColumn = column.filter(num => num !== 0);
        for(let j = 0; j < filteredColumn.length - 1; j++){
            if(filteredColumn[j] === filteredColumn[j+1]){
                let score = filteredColumn[j] *= 2;
                filteredColumn[j+1] = 0;
                updateScore(score);
            }
        }
        filteredColumn = filteredColumn.filter(num => num !== 0);
        while(filteredColumn.length < 4){
            filteredColumn.push(0);
        }
        board[col].innerHTML = filteredColumn[0];
        board[col+4].innerHTML = filteredColumn[1];
        board[col+8].innerHTML = filteredColumn[2];
        board[col+12].innerHTML = filteredColumn[3];
    }
}
function moveDown() {
    for(let col=0; col<4; col++){
         let column = [
            parseInt(board[col].innerHTML),
            parseInt(board[col+4].innerHTML),
            parseInt(board[col+8].innerHTML),
            parseInt(board[col+12].innerHTML)
        ];
        let filteredColumn = column.filter(num => num !== 0);
        // Aynı olanları aşağıda birleştir
        for(let j = filteredColumn.length - 1; j > 0; j--){
            if(filteredColumn[j] === filteredColumn[j-1]){
                let score = filteredColumn[j] *= 2;
                filteredColumn[j-1] = 0;
                updateScore(score);
            }
        }
        // Tekrar sıfırları çıkar
        filteredColumn = filteredColumn.filter(num => num !== 0);
        // Sıfırları yukarı ekle (aşağı yasla)
        while(filteredColumn.length < 4){
            filteredColumn.unshift(0);
        }
        // Sonucu board'a yaz
        board[col].innerHTML = filteredColumn[0];
        board[col+4].innerHTML = filteredColumn[1];
        board[col+8].innerHTML = filteredColumn[2];
        board[col+12].innerHTML = filteredColumn[3];
    }
}
function moveLeft() {
    for(let i=0; i<16; i+=4){
        let row = [
            parseInt(board[i].innerHTML),
            parseInt(board[i+1].innerHTML),
            parseInt(board[i+2].innerHTML),
            parseInt(board[i+3].innerHTML)
        ];
        // Sıfırları çıkar (sağa kaydır)
        let filteredRow = row.filter(num => num !== 0);
        // Aynı olanları sağda birleştir
        for(let j = 0; j < filteredRow.length - 1; j++){
            if(filteredRow[j] === filteredRow[j+1]){
                let score=filteredRow[j] *= 2;
                filteredRow[j+1] = 0;
                updateScore(score);
            }
        }
        // Tekrar sıfırları çıkar
        filteredRow = filteredRow.filter(num => num !== 0);
        // Sıfırları başa ekle (sağa yasla)
        while(filteredRow.length < 4){
            filteredRow.push(0);
        }
        board[i].innerHTML = filteredRow[0];
        board[i+1].innerHTML = filteredRow[1];
        board[i+2].innerHTML = filteredRow[2];
        board[i+3].innerHTML = filteredRow[3];
    }
}
function addNewTile() {
    const emptyTiles = board.filter(tile => tile.innerHTML === '0');
    if(emptyTiles.length === 0) return;
    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    randomTile.innerHTML = Math.random() < 0.8 ? '2' : '4';
}
function updateScore(value) {
    let merged = parseInt(score.innerHTML);
    score.innerHTML = merged + value;
    
}
function checkGameOver() {
    for(let i=0; i<16; i++){
        if(board[i].innerHTML === '0') {
            return false;
        }if(i%4 !== 3 && board[i].innerHTML === board[i+1].innerHTML){
            return false;
        }if(i<12 && board[i].innerHTML === board[i+4].innerHTML){
            return false;
        }  
    }return true;
}
function resetGame() {
    board.forEach(tile => {
        tile.innerHTML = '0';
        tile.style.backgroundColor = '#96887bff';
    });
    undoButtons.forEach(button => {
        button.classList.remove('remove');
        button.classList.add('active');
    });
    addNewTile();
    addNewTile();
    undoBonus=3;
}
function addColor(){
    for(let i=0; i<16; i++){
        if(board[i].innerHTML === '0') {
            board[i].style.backgroundColor = '#96887bff';
        }else if(board[i].innerHTML === '2') {
            board[i].style.backgroundColor = '#eee4da';
        }else if(board[i].innerHTML === '4') {
            board[i].style.backgroundColor = '#ede0c8';
        }else if(board[i].innerHTML === '8') {
            board[i].style.backgroundColor = '#f2b179';
        }else if(board[i].innerHTML === '16') {
            board[i].style.backgroundColor = '#f59563';
        }else if(board[i].innerHTML === '32') {
            board[i].style.backgroundColor = '#f67c5f';
        }else if(board[i].innerHTML === '64') {
            board[i].style.backgroundColor = '#f65e3b';
        }else if(board[i].innerHTML === '128') {
            board[i].style.backgroundColor = '#edcf72';
        }else if(board[i].innerHTML === '256') {
            board[i].style.backgroundColor = '#edcc61';
        }else if(board[i].innerHTML === '512') {
            board[i].style.backgroundColor = '#edc850';
        }else if(board[i].innerHTML === '1024') {
            board[i].style.backgroundColor = '#edc53f';
        }else if(board[i].innerHTML === '2048') {
            board[i].style.backgroundColor = '#edc22e';
        }}
}
function moveRight() {
    for(let i=0; i<16; i+=4){
        let row = [
            parseInt(board[i].innerHTML),
            parseInt(board[i+1].innerHTML),
            parseInt(board[i+2].innerHTML),
            parseInt(board[i+3].innerHTML)
        ];
        // Sıfırları çıkar (sağa kaydır)
        let filteredRow = row.filter(num => num !== 0);
        // Aynı olanları sağda birleştir
        for(let j = filteredRow.length - 1; j > 0; j--){
            if(filteredRow[j] === filteredRow[j-1]){
                let score= filteredRow[j] *= 2;
                filteredRow[j-1] = 0;
                updateScore(score);
            }
        }
        // Tekrar sıfırları çıkar
        filteredRow = filteredRow.filter(num => num !== 0);
        // Sıfırları başa ekle (sağa yasla)
        while(filteredRow.length < 4){
            filteredRow.unshift(0);
        }
        board[i].innerHTML = filteredRow[0];
        board[i+1].innerHTML = filteredRow[1];
        board[i+2].innerHTML = filteredRow[2];
        board[i+3].innerHTML = filteredRow[3];
    }
}
function saveState(){
    previousBoard = board.map(tile => tile.innerHTML);
    previousScore = parseInt(score.innerHTML) || 0;
}
function undoMove(){
    if(previousBoard.length=== 16){
        for(let i=0; i<16; i++){
            board[i].innerHTML = previousBoard[i];
        }
        score.innerHTML = previousScore;
        addColor(); // renkleri geri yükle
    }
}
window.addEventListener('keydown', (event) => {
    let moved = false;
    if(event.key === 'ArrowRight' || event.key === 'd') {
        saveState();
        moveRight();
        moved = true;
    }
    if(event.key === 'ArrowDown' || event.key === 's') {
        saveState();
        moveDown();
        moved = true;
    }
    if(event.key === 'ArrowUp' || event.key === 'w') {
        saveState();
        moveUp();
        moved = true;
    }
    if(event.key === 'ArrowLeft' || event.key === 'a') {
        saveState();
        moveLeft();
        moved = true;
    }

    // Sadece hareket olduysa yeni tile ekle
    if (moved) {
        addNewTile();
        addColor();
        if(checkGameOver()) {
            alert('Game Over!');
            resetGame();
        }
    }
});

resetButton.addEventListener('click', () => {
    score.innerHTML = '0';
    resetGame();
});

document.querySelector('.undo').addEventListener('click', () => {
    if(undoBonus > 0){
        undoBonus--;
        undoMove();
        undoBoxesChange();
    }
});

function undoBoxesChange() {
    undoButtons.forEach((button, index) => {
        if(index < undoBonus) {
            button.classList.remove('remove');
        } else{            
          button.classList.add('remove');
        }
    });
}
