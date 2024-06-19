class Player {
    constructor(gameScreen){
        this.gameScreen = gameScreen
        this.width = gameScreen.clientWidth * 0.1
        this.height = gameScreen.clientHeight * 0.1
        this.left = (this.gameScreen.clientWidth - this.width) / 2; // Center horizontally
        this.top = this.gameScreen.clientHeight - this.height - 50;
        this.speed = 5
        this.directionX = 0
        this.directionY = 0

        this.element = document.createElement('img')

        this.element.src = 'images/blind4.png'
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`
        //this.element.style.height = `${this.height}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`

        this.gameScreen.appendChild(this.element)

    }

    move() {
        this.left += this.directionX*this.speed
        this.top += this.directionY*this.speed

        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`


        if (this.left < 0) {
            this.left = 0
          }

        if (this.left > (this.gameScreen.clientWidth - this.width)) {
            this.left = (this.gameScreen.clientWidth - this.width)
          }

          if (this.top < 0) {
            this.top = 0
          }

          if (this.top > (this.gameScreen.clientHeight -this.height*1.8 )) {
            this.top = (this.gameScreen.clientHeight -this.height*1.8)
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