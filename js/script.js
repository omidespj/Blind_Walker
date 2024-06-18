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
      })
}