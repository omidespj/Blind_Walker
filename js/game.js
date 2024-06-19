class Game {
    constructor() {
        this.startScreen = document.querySelector('#intro')
        this.gameScreen = document.querySelector('#screen')
        this.endScreen = document.querySelector('#end')
        this.width = 580
        this.height = 387

        this.player
        this.vehicle
        this.count = 0
        this.heart = 3
    }


    start() {
        this.gameScreen.style.width = `${this.width}px`
        this.gameScreen.style.height = `${this.height}px`

        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'
        this.endScreen.style.display = 'none'

        this.player = new Player(this.gameScreen)
        this.vehicle = new Vehicle(this.gameScreen)

        const intervalId = setInterval(() => {
            this.count++

            this.player.move()
            this.vehicle.move()

            if (this.count%200 === 0) {
                this.vehicle = new Vehicle(this.gameScreen)
                this.vehicle.move()
            }
            if(this.player.accident(this.vehicle)){
                this.vehicle.element.remove()
                this.heart--
            }
            document.getElementById('heart').innerText = this.heart

        }, 1000/60)
    }
}