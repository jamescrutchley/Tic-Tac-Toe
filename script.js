const gridUI = document.querySelectorAll('.cell');
const warning = document.querySelector('.warning');
const gameStatus = document.querySelector('.gameStatus');
const resetButton = document.querySelector('.reset')

const Gameboard = (() => {
    let state = [null, null, null, null, null, null, null, null, null];
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

    const checkWin = () => {
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (state[a] && state[a] === state[b] && state[a] === state[c]) {
                console.log(state[a]);
                Game.win(state[a]);
                return true;
            }
        }
        return null;
    }

    const refreshBoard = (marker=null, position=null) => {
        marker ? gridUI[position].classList.add(marker) : wipeBoard;
    }
    const updateBoard = (marker, position) => {
        if (!(state[position])) {
            state[position] = marker;
            refreshBoard(marker, position);
            return true;
        } else {
            alert('Invalid Move');
        }
    }
// is wipeboard necessary? Just refresh page?
    const wipeBoard = () => {
        for (let i = 0; i < state.length; i++) {
            state[i] = null;
          }        
          gridUI.forEach(cell => cell.classList.remove('blue', 'green'));
        }

    return { updateBoard, wipeBoard, refreshBoard, checkWin, state };
})()

const CreatePlayer = (marker) => {
    const myMarker = marker;
    const move = (selection) => {
        if (Gameboard.updateBoard(marker, selection)) {
            return true;
        }
    }
    return { move, myMarker }
}

const green = CreatePlayer('green');
const blue = CreatePlayer('blue');




const Game = (() => {
    let turn = blue;
    const currentTurn = (selection) => {
        console.log(selection);
        if (turn.move(selection)) {
            if (Gameboard.checkWin()) {
                return null;
            } else {
                nextTurn();
            }
        }
    }
    const nextTurn = () => {
        // check for winners - congratulate then set-timeeout for a window.reload...?
        (turn == blue) ? turn = green : turn = blue;
        gameStatus.textContent = `Awaiting Move: ${turn.myMarker}`
    }

    const win = (winner) => {
        gameStatus.textContent = `The winner is ${winner}!`;
        restart();
    }

    const restart = () => {
        console.log('restarting in 5 seconds');
        setTimeout(location.reload.bind(window.location), 5000);
    }

    return { currentTurn, turn, win, restart }
})()


gridUI.forEach(div => div.addEventListener('click', function() {
    Game.currentTurn(div.dataset.index);
}));

resetButton.addEventListener('click', Game.restart);