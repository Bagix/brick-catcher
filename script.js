const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");
const bricks = [];
let points = 0;
const pointsElement = document.querySelector("#points");

class Brick {
  constructor(position) {
    this.position = position;
  }

  draw() {
    c.fillStyle = "white";
    c.fillRect(this.position.x, this.position.y, 10, 10);
  }

  move() {
    this.draw();
    this.position.y += 3;
  }

  remove() {
    c.clearRect(this.position.x, this.position.y, 10, 10);
  }
}

class Player {
  constructor(position) {
    this.position = position;
  }

  draw() {
    c.fillStyle = "#7FFF00";
    c.fillRect(this.position.x, this.position.y, 100, 10);
  }

  moveRight() {
    if (this.position.x < canvas.width - 100) {
      this.draw();
      this.position.x += 10;
    }
  }

  moveLeft() {
    if (this.position.x > 0) {
      this.draw();
      this.position.x -= 10;
    }
  }
}

const player = new Player({
  x: canvas.width / 2 - 50,
  y: canvas.height - 100,
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "purple";
  c.fillRect(0, 0, canvas.width, canvas.height);

  player.draw();

  bricks.forEach((brick, index) => {
    brick.move();

    if (brick.position.y > canvas.height) {
      brick.remove();
      bricks.splice(index, 1);
    }

    if (
      brick.position.y == player.position.y &&
      brick.position.x >= player.position.x &&
      brick.position.x <= player.position.x + 100
    ) {
      brick.remove();
      bricks.splice(index, 1);
      points++;
      pointsElement.innerText = points;
    }
  });
}

(function () {
  setInterval(() => {
    generateBrick();
  }, 3000);
})();

function generateBrick() {
  const rand = Math.floor(Math.random() * 100);
  const positionX = (canvas.width / 100) * rand;
  const brick = new Brick({ x: positionX, y: 0 });
  bricks.push(brick);
  brick.draw();
}

window.addEventListener("keydown", (event) => {
  switch (event.code) {
    case "ArrowRight":
      player.moveRight();
      break;
    case "ArrowLeft":
      player.moveLeft();
      break;
  }
});

animate();
