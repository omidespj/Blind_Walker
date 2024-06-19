class Player {
    constructor(gameScreen){
        this.gameScreen = gameScreen
        this.width = 80
        this.height = 80
        this.left = (this.gameScreen.clientWidth - this.width) / 2
        this.top = this.top = this.gameScreen.clientHeight - this.height - 100

        this.speed = 1
        this.directionX = 0
        this.directionY = 0

        this.element = document.createElement('img')

        this.element.src = 'images/blind4.png'
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`
        //this.element.style.height = `${this.height}px`
        this.element.style.left = `200px`
        this.element.style.top = `200px`

        this.gameScreen.appendChild(this.element)

    }

    move() {
        this.left += this.directionX*this.speed
        this.top += this.directionY*this.speed

        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`


        if (this.left < -20) {
            this.left = -20
          }

        if (this.left > (this.gameScreen.clientWidth - this.width +40)) {
            this.left = (this.gameScreen.clientWidth - this.width +40)
          }

          if (this.top < -50) {
            this.top = -50
          }

          if (this.top > (this.gameScreen.clientHeight -160 )) {
            this.top = (this.gameScreen.clientHeight -160)
          }

    }

    accident(vehicle) {
        const playerRect = this.element.getBoundingClientRect()
        const vehicleRect = vehicle.element.getBoundingClientRect()

        if (
        playerRect.left < vehicleRect.right &&
        playerRect.right > vehicleRect.left &&
        playerRect.top < vehicleRect.bottom &&
        playerRect.bottom > vehicleRect.top
        ) {
        console.log('Crash!')

        return true
        } else {
        return false
        }


    }
}