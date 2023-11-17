document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const playerXScore = document.getElementById('playerXScore');
    const playerOScore = document.getElementById('playerOScore');

    let currentPlayer = 'X';
    let gameBoard = Array(9).fill('');
    let scores = { X: 0, O: 0 };
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return gameBoard.includes('') ? null : 'T';
    };

    const updateScore = (winner) => {
        if (winner !== 'T') {
            scores[winner]++;
            if (winner === 'X') {
                playerXScore.innerText = `Jogador X: ${scores.X}`;
            } else {
                playerOScore.innerText = `Jogador O: ${scores.O}`;
            }

            const winSound = document.getElementById('winSound');
            winSound.play();
        }
    };

    const handleClick = (index) => {
        if (!gameActive || gameBoard[index]) return;

        gameBoard[index] = currentPlayer;
        const symbol = currentPlayer === 'X' ? 'x-symbol' : 'o-symbol';
        cells[index].innerHTML = `<div class="${symbol}">${currentPlayer}</div>`;

        const winner = checkWinner();

        if (winner) {
            gameActive = false;
            if (winner === 'T') {
                message.innerText = 'Empate! O jogo acabou.';
            } else {
                message.innerText = `Jogador ${winner} venceu!`;
                updateScore(winner);
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.innerText = `É a vez do jogador ${currentPlayer}`;

            const sound = currentPlayer === 'X' ? document.getElementById('xSound') : document.getElementById('oSound');
            sound.play();
        }
    };

    const handleCellClick = (event) => {
        const index = event.target.dataset.index;
        handleClick(index);
    };

    const resetGame = () => {
        gameBoard = Array(9).fill('');
        currentPlayer = 'X';
        cells.forEach((cell) => {
            cell.innerHTML = '';
        });
        message.innerText = 'É a vez do jogador X';
        gameActive = true;
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', handleCellClick);
        cell.dataset.index = index;
    });

    resetButton.addEventListener('click', resetGame);
});
