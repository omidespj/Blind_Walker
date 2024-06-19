class Vehicle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
        this.width = 200
        this.element = document.createElement('img')
        this.element.left = 0
        this.left = 0
        this.speed = 5

        this.element.src = 'images/car.png'
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`
        this.element.style.top = `200px`
        this.element.style.left = `200px`

        this.gameScreen.appendChild(this.element)
    }

    move () {
        this.left += this.speed
        this.element.style.left = `${this.left}px`
    }
}