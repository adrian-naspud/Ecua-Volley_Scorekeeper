const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    buttonNegative: document.querySelector('#p1Button-negative'),
    display: document.querySelector('#p1Display'),
    label: document.querySelector('#p1label'),
    server: document.querySelector('#p1Serves')
}
const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    buttonNegative: document.querySelector('#p2Button-negative'),
    display: document.querySelector('#p2Display'),
    label: document.querySelector('#p2label'),
    server: document.querySelector('#p2Serves')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
const wScore = document.querySelector('#wScore')
let winningScore = 10;
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('green-text');
            opponent.display.classList.add('red-text');
            player.label.classList.add('green-text');
            opponent.label.classList.add('red-text');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

p1.server.addEventListener('click', function () {
    p1.server.classList.add('active');
    p2.server.classList.remove('active');
    p1.server.innerHTML = ('Player 1 Serves');
    p2.server.innerHTML = ('Player 2 Receives');
    p1.button.disabled = false;
    p2.button.disabled = true;
    p1.button.classList.remove('disabled');
    p2.button.classList.add('disabled');
})

p2.server.addEventListener('click', function () {
    p2.server.classList.add('active');
    p1.server.classList.remove('active');
    p2.server.innerHTML = ('Player 2 Serves');
    p1.server.innerHTML = ('Player 1 Receives');
    p2.button.disabled = false;
    p1.button.disabled = true;
    p2.button.classList.remove('disabled');
    p1.button.classList.add('disabled');
})

p1.button.addEventListener('click', function () {
    updateScores(p1, p2);
    if (p1.score === winningScore - 1 && p2.score === winningScore - 1) {
        winningScore++;
        wScore.innerHTML = (`${winningScore}`);

    };
})
p2.button.addEventListener('click', function () {
    updateScores(p2, p1);
    if (p2.score === winningScore - 1 && p1.score === winningScore - 1) {
        winningScore++;
        wScore.innerHTML = (`${winningScore}`);
    };
})

function updateScoresNegative(player) {
    if (!isGameOver && player.score > 0) {
        player.score -= 1;
        // if (player.score === winningScore) {
        //     isGameOver = true;
        //     player.display.classList.add('green-text');
        //     opponent.display.classList.add('red-text');
        //     player.label.classList.add('green-text');
        //     opponent.label.classList.add('red-text');
        //     player.button.disabled = true;
        //     opponent.button.disabled = true;
        // }
        player.display.textContent = player.score;
    }
}

p1.buttonNegative.addEventListener('click', function () {
    updateScoresNegative(p1);
    if (p1.score === winningScore - 1 && p2.score === winningScore - 1) {
        winningScore++;
        wScore.innerHTML = (`${winningScore}`);

    };
})
p2.buttonNegative.addEventListener('click', function () {
    updateScoresNegative(p2);
    if (p2.score === winningScore - 1 && p1.score === winningScore - 1) {
        winningScore++;
        wScore.innerHTML = (`${winningScore}`);
    };
})

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    // reset();
    wScore.innerHTML = (`${winningScore}`)
})

resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('green-text', 'red-text');
        p.label.classList.remove('green-text', 'red-text');
        p.button.disabled = false
    }
    p1.server.classList.add('active');
    p2.server.classList.remove('active');
    p1.server.innerHTML = ('Player 1 Serves');
    p2.server.innerHTML = ('Player 2 Receives');
    winningScoreSelect.selectedIndex = 0;
    winningScore = 10;
    wScore.innerHTML = (`${winningScore}`);
    p1.button.classList.remove('disabled');
    p2.button.classList.add('disabled');
}