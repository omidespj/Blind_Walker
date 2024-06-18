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
}