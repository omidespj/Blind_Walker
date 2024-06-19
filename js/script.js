window.onload = function () {
    const strtBtn = document.querySelector("#start-game")
    const rtry = document.querySelector("#retry")

    let game;
    function startGame(){
        game = new Game()
        game.start()
    }

    strtBtn.addEventListener('click', function() {
        startGame();
    })

    rtry.addEventListener('click', function() {
        startGame();
    })

    document.addEventListener('keydown', event => {
        if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
          // Move to the left
          game.player.directionX = -1
        }
        if (event.code === 'KeyD' || event.code === 'ArrowRight') {
          // Move to the right
          game.player.directionX = 1
        }
        if (event.code === 'KeyW' || event.code === 'ArrowUp') {
          // Move to the left
          game.player.directionY = -1
        }
        if (event.code === 'KeyS' || event.code === 'ArrowDown') {
          // Move to the right
          game.player.directionY = 1
        }
      })

      document.addEventListener('keyup', event => {
        if (event.code === 'KeyA' ||
          event.code === 'ArrowLeft' ||
          event.code === 'KeyD' ||
          event.code === 'ArrowRight'
          ) {
            game.player.directionX = 0
          }
        if (event.code === 'KeyW' ||
          event.code === 'ArrowUp' ||
          event.code === 'KeyS' ||
          event.code === 'ArrowDown') {
            game.player.directionY = 0
          }
      })
}