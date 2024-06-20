class Player {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.width = gameScreen.clientWidth * 0.06;
        this.height = gameScreen.clientHeight * 0.06;
        this.initialLeft = (this.gameScreen.clientWidth - this.width) / 2; 
        this.initialTop = this.gameScreen.clientHeight - this.height - 50;
        this.left = this.initialLeft;
        this.top = this.initialTop;
        this.speed = 1;
        this.directionX = 0;
        this.directionY = 0;

        this.element = document.createElement('img');
        this.element.src = 'images/blind4.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.zIndex = 10;

        this.gameScreen.appendChild(this.element);
    }

    move() {
        this.left += this.directionX * this.speed;
        this.top += this.directionY * this.speed;

        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        if (this.left < 0) {
            this.left = 0;
        }

        if (this.left > (this.gameScreen.clientWidth - this.width)) {
            this.left = (this.gameScreen.clientWidth - this.width);
        }

        if (this.top < 0) {
            this.top = 0;
        }

        if (this.top > (this.gameScreen.clientHeight - this.height * 1.8)) {
            this.top = (this.gameScreen.clientHeight - this.height * 1.8);
        }
    }

    accident(vehicle) {
        const playerRect = this.element.getBoundingClientRect();
        const vehicleRect = vehicle.element.getBoundingClientRect();

        const playerLowerPartRect = {
            left: playerRect.left,
            right: playerRect.right,
            top: playerRect.bottom - playerRect.height * 0.1, 
            bottom: playerRect.bottom - playerRect.height * 0.05 
        };

        const playerLeftPartRect = {
            left: playerRect.left,
            right: playerRect.left + playerRect.width * 0.4, 
            top: playerRect.top,
            bottom: playerRect.bottom
        };

        const collisionLowerPart = (
            playerLowerPartRect.left < vehicleRect.right &&
            playerLowerPartRect.right > vehicleRect.left &&
            playerLowerPartRect.top < vehicleRect.bottom &&
            playerLowerPartRect.bottom > vehicleRect.top
        );

        const collisionLeftPart = (
            playerLeftPartRect.left < vehicleRect.right &&
            playerLeftPartRect.right > vehicleRect.left &&
            playerLeftPartRect.top < vehicleRect.bottom &&
            playerLeftPartRect.bottom > vehicleRect.top
        );

        return collisionLowerPart && collisionLeftPart;
    }

    resetPosition() {
        this.left = this.initialLeft;
        this.top = this.initialTop;
        this.directionX = 0; 
        this.directionY = 0; 
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
}
