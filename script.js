const gridUI = document.querySelectorAll('.cell');
const warning = document.querySelector('.warning');
const whoseTurn = document.querySelector('.whoseTurn');

const Gameboard = (() => {
    let state = [null, null, null, null, null, null, null, null, null];
    const refreshBoard = (marker=null, position=null) => {
        marker ? gridUI[position].classList.add(marker) : wipeBoard;
    }
    const updateBoard = (marker, position) => {
        if (!(state[position])) {
            state[position] = marker;
            refreshBoard(marker, position);
            return true;
        } else {
            warning.textContent = 'Invalid Move';
        }
    }

    const wipeBoard = () => {
        for (let i = 0; i < state.length; i++) {
            state[i] = null;
          }        
          gridUI.forEach(cell => cell.classList.remove('blue', 'green'));
        }

    return { updateBoard, wipeBoard, refreshBoard, state };
})()

const CreatePlayer = (marker) => {
    const move = (selection) => {
        if (Gameboard.updateBoard(marker, selection)) {
            return true;
        }
    }
    return { move }
}

const green = CreatePlayer('green');
const blue = CreatePlayer('blue');

const Game = (() => {
    let turn = blue;
    const currentTurn = (selection) => {
        console.log(selection);
        if (turn.move(selection)) {
            (turn == blue) ? turn = green : turn = blue;
        }
    }
    return { currentTurn, turn }
})()


gridUI.forEach(div => div.addEventListener('click', function() {
    Game.currentTurn(div.dataset.index);
}));
