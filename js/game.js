class Game {
    constructor() {
        this.startScreen = document.querySelector('#intro')
        this.gameScreen = document.querySelector('#screen')
        this.endScreen = document.querySelector('#end')
        this.width = 1000
        //this.height = 200
    }


    start() {
        this.gameScreen.style.width = `${this.width}px`
        //this.gameScreen.style.height = `${this.length}px`

        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'
        this.endScreen.style.display = 'none'
    }
}