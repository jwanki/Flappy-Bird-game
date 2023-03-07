// Define canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Define bird object
var bird = {
  x: 50,
  y: 150,
  speedY: 0,
  gravity: 0.5,
  size: 20,
  color: "yellow",
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  },
  update: function() {
    this.speedY += this.gravity;
    this.y += this.speedY;
  },
  flap: function() {
    this.speedY = -10;
  }
};

// Define pipe object
var pipe = {
  x: canvas.width,
  y: 0,
  width: 50,
  gap: 150,
  speedX: -2,
  color: "green",
  draw: function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, canvas.height);
    ctx.fillRect(this.x, this.y + canvas.height + this.gap, this.width, canvas.height);
  },
  update: function() {
    this.x += this.speedX;
    if (this.x < -this.width) {
      this.x = canvas.width;
      this.y = Math.floor(Math.random() * (canvas.height - this.gap));
    }
  }
};

// Define score
var score = 0;

// Handle keypress event
document.addEventListener("keypress", function(event) {
  if (event.keyCode == 32) {
    bird.flap();
  }
});

// Define game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update bird and pipe objects
  bird.update();
  pipe.update();

  // Draw bird and pipe objects
  bird.draw();
  pipe.draw();

  // Check for collision between bird and pipe
  if (bird.x + bird.size > pipe.x && bird.x < pipe.x + pipe.width) {
    if (bird.y < pipe.y || bird.y + bird.size > pipe.y + pipe.gap) {
      // Game over
      alert("Game over! Score: " + score);
      location.reload();
    }
  }

  // Check for score
  if (bird.x > pipe.x + pipe.width && bird.x < pipe.x + pipe.width + pipe.speedX) {
    score++;
  }

  // Display score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  // Call game loop function recursively
  requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
