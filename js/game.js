class Game {
    constructor() {
        this.startScreen = document.querySelector('#intro')
        this.gameScreen = document.querySelector('#screen')
        this.endScreen = document.querySelector('#end')
        this.width = 1000
        //this.height = 200

        this.player
        this.vehicle
        this.count = 0
    }


    start() {
        this.gameScreen.style.width = `${this.width}px`
        //this.gameScreen.style.height = `${this.length}px`

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

        }, 1000/60)
    }
}