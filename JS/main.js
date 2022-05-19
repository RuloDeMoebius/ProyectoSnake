let gameInterval;

const bodySnake = [];
const movement = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
}
class Snake {
    constructor(color, usuarioVelocidad, lenghtSnake, usuarioSnake, skin, secondaryColor) {
        this.color = color;
        this.velocidad = usuarioVelocidad;
        this.lenghtSnake = lenghtSnake;
        this.owner = usuarioSnake;
        this.skin = skin;
        this.secondaryColor = secondaryColor;
    }
}
class SnakeCell {
    constructor(posX, posY, vectorMov) {
        this.posX = posX;
        this.posY = posY;
        this.vectorMov = vectorMov;
    }
}
let food = {
    x: Math.round(Math.random() * 47 + 1) * (10),
    y: Math.round(Math.random() * 47 + 1) * (10),
}

function startGame() {
    gameInterval = setInterval(gameLoop, snakeChoice.velocidad);

    bodySnake.unshift(new SnakeCell(250, 20, movement.DOWN));
    bodySnake.push(new SnakeCell(250, 10, movement.DOWN));
    bodySnake.push(new SnakeCell(250, 0, movement.DOWN));
}

//__________________________________________________________________________________________________________________________________________//

// Ingreso de datos para la seleccion de la serpiente a utilizar.
const score = document.querySelector(".score");

const startButton = document.querySelector("#btn-startGame");

const startOptions = document.querySelector(".btn-start");

startButton.addEventListener('click', () => {
    startOptions.style.display = 'none';
    //En new los datos de la serpiente tienen que ser los ingresados por el panel lateral que tengo que agregar.

    startGame();
});


snakeChoice = new Snake("#0F0E0E", 120, 3, true, false, "#DCE85B");



//snakeChoice = new Snake("#D94945", 90, 3, true, false, "#D94945")
//snakeChoice = new Snake("#0F0E0E", 120, 3, true, false, "#DCE85B");

//snakeChoice = new Snake("#4D86B6", 60, 3, true, false, "#0F0E0E");

//snakeChoice = new Snake("#2A662B", (1000 / 15), 3, true, false, "#79820B");

//snakeChoice = new Snake("#484848", 75, 3, false, false, "#484848");



//Hasta acá el código corresponde a la identificación del usuario y el ingreso de su 'Snake'

//__________________________________________________________________________________________________________________________________________//

//Uso del canvas para tomar datos y dibujar los elementos necesarios.

let canvas = document.getElementById("mainScreenPlay");
let ctx = canvas.getContext("2d");

const drawBorder = () => {
    ctx.strokeStyle = "#6A6A6C";
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(490, 10);
    ctx.lineTo(490, 490);
    ctx.lineTo(10, 490);
    ctx.lineTo(10, 10);
    ctx.stroke();
    ctx.closePath();
}

let clearCanva = () => {
    ctx.clearRect(0, 0, 500, 500);
    drawBorder();

}

const drawBox = (xi, yi, color, secondaryColor) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(xi, yi);
    ctx.lineTo((xi + 10), yi);
    ctx.lineTo((xi + 10), (yi + 10));
    ctx.lineTo(xi, (yi + 10));
    ctx.fill();

    ctx.strokeStyle = secondaryColor;
    ctx.beginPath();
    ctx.moveTo((xi - 1), (yi - 1));
    ctx.lineTo(((xi - 1) + 10), (yi - 1));
    ctx.lineTo(((xi - 1) + 10), ((yi - 1) + 10));
    ctx.lineTo((xi - 1), ((yi - 1) + 10));
    ctx.lineTo((xi - 1), (yi - 1));
    ctx.stroke();
    ctx.closePath();
}

const drawFood = () => {
    drawBox(food.x, food.y, "#254925", "#254925");

    let empySlot = true;
    for (i = 0; i < bodySnake.length; i++) {
        if (food.x == bodySnake[i].posX && food.y == bodySnake[i].posY) {
            food.x = Math.round(Math.random() * 47 + 1) * (10);
            food.y = Math.round(Math.random() * 47 + 1) * (10);
            empySlot = false;
            break;
        }
    }
    if (empySlot == true) {
        drawBox(food.x, food.y, "#254925", "#254925");
    } else drawFood();
}

let drawSnake = () => {
    for (const cell of bodySnake) {
        drawBox(cell.posX, cell.posY, snakeChoice.color, snakeChoice.secondaryColor);
    }
}

//__________________________________________________________________________________________________________________________________________//

//Creación de los bucles e iteraciones para generar el movimiento de la serpiente.

const movementKey = (e) => {
    if (e.code === "ArrowUp" && bodySnake[0].vectorMov !== movement.DOWN) {
        bodySnake[0].vectorMov = movement.UP;
    } else if (e.code === "ArrowDown" && bodySnake[0].vectorMov !== movement.UP) {
        bodySnake[0].vectorMov = movement.DOWN;
    } else if (e.code === "ArrowLeft" && bodySnake[0].vectorMov !== movement.RIGHT) {
        bodySnake[0].vectorMov = movement.LEFT;
    } else if (e.code === "ArrowRight" && bodySnake[0].vectorMov !== movement.LEFT) {
        bodySnake[0].vectorMov = movement.RIGHT;
    } else if (e.code === "Enter") startGame();
    else return;
}
document.addEventListener("keydown", movementKey);


const ajustPosition = () => {
    let cabezaPosX = bodySnake[0].posX;
    let cabezaPosY = bodySnake[0].posY;
    let vecMov = bodySnake[0].vectorMov;

    if (bodySnake[0].vectorMov === movement.UP) {

        cabezaPosY -= 10;

    } else if (bodySnake[0].vectorMov === movement.DOWN) {

        cabezaPosY += 10;

    } else if (bodySnake[0].vectorMov === movement.LEFT) {

        cabezaPosX -= 10;

    } else if (bodySnake[0].vectorMov === movement.RIGHT) {

        cabezaPosX += 10;

    } else ajustPosition();

    bodySnake.unshift(new SnakeCell(cabezaPosX, cabezaPosY, vecMov));

    return bodySnake.pop();
}

//__________________________________________________________________________________________________________________________________________//

//Condiciones de finalización y continuidad del juego.

const ajustScore = () => {
    let result = (snakeChoice.lenghtSnake - 3);

    let h3 = document.querySelector(".score h3")
    h3.remove();

    let newScore = document.createElement("h3");
    newScore.innerHTML = `Score: ${result}`;
    score.appendChild(newScore);
}

const endGame = () => {
    ctx.font = "30px Press Start";
    ctx.fillText("Game over!!", 190, 250);
    ctx.fillText(`Score: ${snakeChoice.lenghtSnake - 3}`, 210, 300);

    clearInterval(gameInterval);
}

const checkPosition = () => {
    //Verificamos que la cabeza de la serpiente no se encuentre en superposición con el resto del cuerpo
    for (i = 0; i < bodySnake.length; i++) {
        for (j = 0; j < bodySnake.length; j++) {
            if (bodySnake[i] != bodySnake[j]) {
                if (bodySnake[i].posX == bodySnake[j].posX && bodySnake[i].posY == bodySnake[j].posY) {

                    endGame();

                    console.log("¡¡Game Over!! Press F5 for play again");
                }
            }
        }
    }
    //Verificamos que la cabeza de la serpiente no se encuentre fuera del margen del juego delimitado por esas posiciones
    if (bodySnake[0].posX < 10 || bodySnake[0].posX + 10 > 490 || bodySnake[0].posY < 10 || bodySnake[0].posY + 10 > 490) {

        endGame();
        
        console.log("¡¡Game Over!! Press F5 for play again");
    }
    //Verificamos si la cabeza de la serpiente coincide con la posicion de la comida; en caso de que coincidan aumentamos la longitud de la serpiente, y redefinimos una nueva posicion para la serpiente
    if (bodySnake[0].posX == food.x && bodySnake[0].posY == food.y) {
        snakeChoice.lenghtSnake++;
        bodySnake.push(new SnakeCell(500, 500, movement.DOWN));
        food.x = Math.round(Math.random() * 47 + 1) * (10);
        food.y = Math.round(Math.random() * 47 + 1) * (10);
        drawFood();
        ajustScore();
    }
}

//__________________________________________________________________________________________________________________________________________//

//Loop del juego para que se repita dependiendo de la frecuencia condicionada por al serpiente elegida.

function gameLoop() {
    clearCanva();
    drawFood();
    ajustPosition();
    checkPosition();
    drawSnake();
}


console.log(snakeChoice);

//__________________________________________________________________________________________________________________________________________//

//Créditos:

//FunFunFunction: https://www.youtube.com/watch?v=jRstJFiWnDQ

//Appdelante: Daniel Macario: https://www.youtube.com/watch?v=GbPAYZ7tXUY

//Juego de AppDelante: https://culebrita-appdelante.vercel.app/juego.html

//__________________________________________________________________________________________________________________________________________//