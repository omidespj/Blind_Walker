class Game {
    constructor() {
        this.startScreen = document.querySelector('#intro');
        this.gameScreen = document.querySelector('#screen');
        this.endScreen = document.querySelector('#end');
        this.width = 580;
        this.height = 387;

        this.player = null;
        this.vehicles = [];
        this.count = 0;
        this.heart = 3;
        this.intervalId = null;
    }

    start() {
        // Reset game state
        this.resetGame();

        this.gameScreen.style.width = `${this.width}px`;
        this.gameScreen.style.height = `${this.height}px`;

        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.endScreen.style.display = 'none';

        this.player = new Player(this.gameScreen);

        this.intervalId = setInterval(() => {
            this.count++;

            this.player.move();
            this.vehicles.forEach(vehicle => vehicle.move());

            if (this.count % 50 === 0) { // Decrease interval to increase vehicle population
                this.createVehicle();
            }

            this.vehicles = this.vehicles.filter(vehicle => {
                if (this.player.accident(vehicle)) {
                    vehicle.element.remove();
                    this.heart--;
                    this.player.resetPosition();
                    return false; // Remove the vehicle that caused the accident
                }
                // Remove vehicle if it moves off-screen
                if (vehicle.left > this.gameScreen.clientWidth || vehicle.left < -vehicle.width) {
                    vehicle.element.remove();
                    return false;
                }
                return true; // Keep the vehicle
            });

            document.getElementById('heart').innerText = this.heart;

            if (this.heart <= 0) {
                clearInterval(this.intervalId);
                this.gameScreen.style.display = 'none';
                this.endScreen.style.display = 'block';
            }
        }, 1000 / 60);
    }

    resetGame() {
        // Clear existing vehicles
        this.vehicles.forEach(vehicle => vehicle.element.remove());
        this.vehicles = [];

        // Remove all child elements from the game screen
        while (this.gameScreen.firstChild) {
            this.gameScreen.removeChild(this.gameScreen.firstChild);
        }

        // Reset game variables
        this.count = 0;
        this.heart = 3;

        // Clear interval if it exists
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    createVehicle() {
        // Attempt to create a new vehicle with proper spacing
        for (let i = 0; i < 5; i++) { // Try up to 5 times
            const newVehicle = new Vehicle(this.gameScreen);

            // Check for overlap
            const overlap = this.vehicles.some(vehicle => {
                return (
                    newVehicle.left < vehicle.left + vehicle.width &&
                    newVehicle.left + newVehicle.width > vehicle.left &&
                    newVehicle.top < vehicle.top + vehicle.height &&
                    newVehicle.top + newVehicle.height > vehicle.top
                );
            });

            if (!overlap) {
                this.vehicles.push(newVehicle);
                break;
            } else {
                // Remove the new vehicle element if overlap occurs
                newVehicle.element.remove();
            }
        }
    }
}
