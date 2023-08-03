const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d");
const bricks = [];

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
    this.position.y += 2;
  }
}

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "purple";
  c.fillRect(0, 0, canvas.width, canvas.height);

  bricks.forEach((brick, index) => {
    brick.move();
    if (brick.position.y > canvas.height) {
      bricks.splice(index, 1);
    }
  });
}

(function () {
  setInterval(() => {
    const rand = Math.floor(Math.random() * 100);
    const positionX = (canvas.width / 100) * rand;
    const brick = new Brick({ x: positionX, y: 0 });
    bricks.push(brick);
    brick.draw();
  }, 3000);
})();

animate();
