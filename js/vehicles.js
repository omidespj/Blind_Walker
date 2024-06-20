const edge = 75


class Vehicle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
        this.width = gameScreen.clientWidth * 0.1
        this.element = document.createElement('img')
        this.element.left = 0
        this.left = -this.width
        const speed =2

        const top1 = edge + this.width*0.5
        const top2 = (this.gameScreen.clientHeight - this.width)/2.1
        const top3 = (this.gameScreen.clientHeight*0.51)
        const top4 = (this.gameScreen.clientHeight - this.width -edge)

        
        const images = ['images/car.png', 'images/bus.png'];

        const selectedImage = images[Math.floor(Math.random() * images.length)];


        if (selectedImage === 'images/car.png') {
            this.width = gameScreen.clientWidth * 0.09; 
            this.height = gameScreen.clientHeight * 0.09; 
        } else if (selectedImage === 'images/bus.png') {
            this.width = gameScreen.clientWidth * 0.18; 
            this.height = gameScreen.clientHeight * 0.18; 
        }


        const range = Math.random() < 0.5 ? [top1, top2] : [top3, top4];
        this.top = Math.random() * (range[1] - range[0]) + range[0];

        if (this.top >= top3 && this.top <= top4) {

            this.left = -this.width; 
            this.speed = speed; 
        } else {
            
            this.left = gameScreen.clientWidth; 
            this.speed = -speed; 
            this.element.style.transform = 'rotate(180deg)'; 
        }

        this.element.src = selectedImage
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`
        this.element.style.top = `${this.top}px`
        this.element.style.left = `${this.left}px`
        this.element.style.zIndex = 5

        this.gameScreen.appendChild(this.element)
    }

    move () {
        this.left += this.speed
        this.element.style.left = `${this.left}px`
    }
}