window.onload = function () {
  const startBtn = document.querySelector("#start-game");
  const retryBtn = document.querySelector("#retry");
  const difficultySelect = document.querySelector("#difficulty");

  let game;

  function startGame() {
      const difficulty = difficultySelect.value; 
      game = new Game(difficulty);
      game.start();
      container.style.display = 'flex';  // Show the game container
      intro.style.display = 'none';  // Hide the intro screen

  }

  startBtn.addEventListener('click', function() {
      startGame();
  });

  retryBtn.addEventListener('click', function() {
      startGame();
  });

  document.addEventListener('keydown', event => {
      if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
          // Move to the left
          game.player.directionX = -1;
      }
      if (event.code === 'KeyD' || event.code === 'ArrowRight') {
          // Move to the right
          game.player.directionX = 1;
      }
      if (event.code === 'KeyW' || event.code === 'ArrowUp') {
          // Move up
          game.player.directionY = -1;
      }
      if (event.code === 'KeyS' || event.code === 'ArrowDown') {
          // Move down
          game.player.directionY = 1;
      }
  });

  document.addEventListener('keyup', event => {
      if (event.code === 'KeyA' || event.code === 'ArrowLeft' || event.code === 'KeyD' || event.code === 'ArrowRight') {
          game.player.directionX = 0;
      }
      if (event.code === 'KeyW' || event.code === 'ArrowUp' || event.code === 'KeyS' || event.code === 'ArrowDown') {
          game.player.directionY = 0;
      }
  });
}
