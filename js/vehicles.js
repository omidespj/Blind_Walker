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

        // Array of image paths
        const images = ['images/car.png', 'images/bus.png'];
        // Randomly select an image
        const selectedImage = images[Math.floor(Math.random() * images.length)];

        // Set sizes based on the selected image
        if (selectedImage === 'images/car.png') {
            this.width = gameScreen.clientWidth * 0.09; // Car width is 7.5% of the screen width
            this.height = gameScreen.clientHeight * 0.09; // Car height is 7.5% of the screen height
        } else if (selectedImage === 'images/bus.png') {
            this.width = gameScreen.clientWidth * 0.18; // Bus width is 15% of the screen width
            this.height = gameScreen.clientHeight * 0.18; // Bus height is 15% of the screen height
        }


        // Randomly choose between the two ranges
        const range = Math.random() < 0.5 ? [top1, top2] : [top3, top4];
        this.top = Math.random() * (range[1] - range[0]) + range[0];

        if (this.top >= top3 && this.top <= top4) {
            // Vehicles between top3 and top4
            this.left = -this.width; // Start from the left
            this.speed = speed; // Positive speed
        } else {
            // Vehicles between top1 and top2
            this.left = gameScreen.clientWidth; // Start from the right
            this.speed = -speed; // Negative speed
            this.element.style.transform = 'rotate(180deg)'; // Rotate 180 degrees
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