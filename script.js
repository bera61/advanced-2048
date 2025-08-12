const score = document.getElementById('score');
const canvas= document.querySelector('.board');
let width = 4;
let board=[];
startGame();


function startGame(){
    createBoard();
    addNewTile();
    addNewTile();
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
function moveUp() {}
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
                filteredColumn[j] *= 2;
                filteredColumn[j-1] = 0;
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
    addNewTile();
}
function moveLeft() {}

function addNewTile() {
    const randomNumber = Math.floor(Math.random()*board.length);
    if(board[randomNumber].innerHTML === '0') {
        board[randomNumber].innerHTML = Math.random() < 0.8 ? '2' : '4';
    }
}
function updateScore(value) {}
function checkGameOver() {}
function resetGame() {}
function addColor(){}

console.log(board);
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
                filteredRow[j] *= 2;
                filteredRow[j-1] = 0;
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
    addNewTile();
}

window.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowRight' || event.key === 'd') {
        moveRight();
    }
    if(event.key === 'ArrowDown' || event.key === 'S') {
        moveDown();
    }
});