document.addEventListener('DOMContentLoaded', ()=>{
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let gameTimerId = setInterval(startGame, 20);

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }
    document.addEventListener('keyup', control)

    function generateObstacles() {
        let obstacleLeft = 500;
        let gap = 460;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;        
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        topObstacle.classList.add('top-obstacle');
        gameDisplay.appendChild(topObstacle);
        gameDisplay.appendChild(obstacle);
        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacles() {
            if(isGameOver) return;
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
            if (obstacleLeft === -60) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            if ((obstacleLeft > 160 && obstacleLeft < 280 && birdBottom < obstacleBottom + 150 || birdBottom === 0) ||
                (obstacleLeft > 160 && obstacleLeft < 280 && birdBottom > obstacleBottom + gap - 200)
            ) {
                gameOver();
                clearInterval(timerId);                           
            }
        }
        let timerId = setInterval(moveObstacles, 20);
        if (!isGameOver) setTimeout(generateObstacles, 3000);
    }
    generateObstacles();

    function gameOver() {        
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        console.log('Game over!');
    }
}
)