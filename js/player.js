class Player {
    constructor(gameScreen){
        this.gameScreen = gameScreen
        this.width = 160
        this.height = 80
        this.left = 200
        this.top = 200

        this.speed = 1
        this.directionX = 0
        this.directionY = 0

        this.element = document.createElement('img')

        this.element.src = 'images/blind4.png'
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`
        this.element.style.left = `200px`
        this.element.style.top = `200px`

        this.gameScreen.appendChild(this.element)

    }

    move() {
        this.left += this.directionX*this.speed
        this.top += this.directionY*this.speed

        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`

    }
}