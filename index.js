class MineField {
  boardItens = 9;
  totalMine = 4;
  totalWin = 5;
  countMine = 0;
  countWin = 0;

  endGame = false;

  // CAMPO VAZIO =  1
  // CAMPO MINADO = 0
  isMineArray = [];
  clickedItem = [];

  board = document.getElementById("campo_minado");

  constructor() {
    this.drawBoard();
  }

  drawBoard() {
    this.randomMine();

    for (let i = 1; i <= this.boardItens; i++) {
      this.createElement(i);
    }
  }

  randomMine() {
    for (let i = 1; i <= this.boardItens; i++) {
      const random = Math.random();

      if (random < 0.5 && this.countItens(0) !== 4) {
        this.isMineArray.push(0);
      } else {
        this.isMineArray.push(1);
      }
    }
  }

  createElement(index) {
    const divBoardItem = document.createElement("div");

    divBoardItem.className = "board-item";

    divBoardItem.innerText = index;

    divBoardItem.onclick = (e) => {
      this.findMine(e, index - 1);
    };

    this.board.appendChild(divBoardItem);
  }

  findMine(e, index) {
    if (this.endGame) return;

    const isMine = this.isMineArray[index];

    const boardItemElement = e.toElement;

    if (this.clickedItem.includes(index)) return;

    this.clickedItem.push(index);

    if (isMine) return this.avoidedBomb(boardItemElement);

    this.blownBomb(boardItemElement);
  }

  avoidedBomb(element) {
    element.classList.add("acertou");

    this.countWin++;

    if (this.countWin === this.totalWin) {
      if (confirm("Parabéns você finalizou o jogo, tentar novamente?")) {
        this.resetGame();
      }

      this.endGame = true;
    }
  }

  blownBomb(element) {
    this.countMine++;

    element.classList.add("estorou");

    if (this.countMine === this.totalMine) {
      this.endGame = true;
      if (confirm("Você perdeu, gostaria de tentar novamente?")) {
        this.resetGame();
      }
    }
  }

  resetGame() {
    this.countMine = 0;
    this.countWin = 0;
    this.clickedItem = [];
    this.isMineArray = [];

    this.removeAllChildNodes(this.board);

    this.endGame = false;
  }

  countItens(i) {
    return this.isMineArray.filter((item) => item === i).length;
  }

  removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }

    this.drawBoard();
  }
}