// Game canvas and context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game states
let gameRunning = false;
let playerScore = 0;
let computerScore = 0;

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 80;
const paddleSpeed = 5;

// Player paddle (left side)
const playerPaddle = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

// Computer paddle (right side)
const computerPaddle = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

// Ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 6,
    dx: 5,
    dy: 5
};

// Input handling
const keys = {};
let mouseY = canvas.height / 2;

// Keyboard input
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Mouse input
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseY = e.clientY - rect.top;
});

// Button event listeners
document.getElementById('startBtn').addEventListener('click', toggleGame);
document.getElementById('resetBtn').addEventListener('click', resetScore);

// Toggle game state
function toggleGame() {
    gameRunning = !gameRunning;
    const btn = document.getElementById('startBtn');
    btn.textContent = gameRunning ? 'Pause Game' : 'Start Game';
}

// Reset score
function resetScore() {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    resetBall();
}

// Reset ball to center
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.dy = (Math.random() - 0.5) * 8;
}

// Update player paddle position (mouse or keyboard)
function updatePlayerPaddle() {
    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        playerPaddle.y = Math.max(0, playerPaddle.y - paddleSpeed);
    }
    if (keys['ArrowDown'] || keys['s'] || keys['S']) {
        playerPaddle.y = Math.min(canvas.height - paddleHeight, playerPaddle.y + paddleSpeed);
    }

    // Mouse control
    const mouseSpeed = 3;
    if (mouseY < playerPaddle.y + paddleHeight / 2) {
        playerPaddle.y = Math.max(0, playerPaddle.y - mouseSpeed);
    } else if (mouseY > playerPaddle.y + paddleHeight / 2) {
        playerPaddle.y = Math.min(canvas.height - paddleHeight, playerPaddle.y + mouseSpeed);
    }
}

// AI for computer paddle
function updateComputerPaddle() {
    const computerAISpeed = 4;
    const computerCenter = computerPaddle.y + paddleHeight / 2;

    if (computerCenter < ball.y - 35) {
        computerPaddle.y = Math.min(canvas.height - paddleHeight, computerPaddle.y + computerAISpeed);
    } else if (computerCenter > ball.y + 35) {
        computerPaddle.y = Math.max(0, computerPaddle.y - computerAISpeed);
    }
}

// Check collision between ball and paddle
function collideWithPaddle(paddle) {
    if (
        ball.x - ball.radius < paddle.x + paddle.width &&
        ball.x + ball.radius > paddle.x &&
        ball.y - ball.radius < paddle.y + paddle.height &&
        ball.y + ball.radius > paddle.y
    ) {
        // Bounce the ball
        ball.dx = -ball.dx * 1.05;

        // Add spin based on where ball hits the paddle
        const hitPos = (ball.y - (paddle.y + paddle.height / 2)) / (paddle.height / 2);
        ball.dy = hitPos * 8;

        // Ensure ball doesn't get stuck
        if (ball.x < canvas.width / 2) {
            ball.x = paddle.x + paddle.width + ball.radius;
        } else {
            ball.x = paddle.x - ball.radius;
        }
    }
}

// Update ball position
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Ball collision with top and bottom walls
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
    }

    // Ball collision with paddles
    collideWithPaddle(playerPaddle);
    collideWithPaddle(computerPaddle);

    // Scoring
    if (ball.x - ball.radius < 0) {
        computerScore++;
        updateScore();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        updateScore();
        resetBall();
    }
}

// Update score display
function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

// Draw functions
function drawPaddle(paddle) {
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawCenterLine() {
    ctx.strokeStyle = '#00ff88';
    ctx.setLineDash([5, 10]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    drawCenterLine();
    drawPaddle(playerPaddle);
    drawPaddle(computerPaddle);
    drawBall();
}

// Main game loop
function gameLoop() {
    if (gameRunning) {
        updatePlayerPaddle();
        updateComputerPaddle();
        updateBall();
    }

    drawGame();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
