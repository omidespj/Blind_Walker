class Player {
    constructor(gameScreen){
        this.gameScreen = gameScreen
        this.width = 160
        this.height = 80

        this.element = document.createElement('img')

        this.element.src = '../images/blind4.png'
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`
        this.element.style.left = `200px`

        this.gameScreen.appendChild(this.element)

    }
}