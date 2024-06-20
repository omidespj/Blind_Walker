class Game {
    constructor(difficulty) {
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

        this.startTime = null;
        this.elapsedTime = null;
        this.score = 0;
        this.maxScore = 10000; // Adjust as needed
        this.timerDuration = 100; // Set the timer duration in seconds

        this.difficulty = difficulty;
        this.vehicleRate = this.getVehicleRate(difficulty);
    }

    getVehicleRate(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 40; // 20% rate for easy
            case 'intermediate':
                return 30; // 30% rate for intermediate
            case 'hard':
                return 20; // 40% rate for hard
            default:
                return 40; // Default to easy if no valid difficulty provided
        }
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

        this.startTime = performance.now(); // Start the timer

        this.intervalId = setInterval(() => {
            this.count++;

            this.player.move();
            this.vehicles.forEach(vehicle => vehicle.move());

            if (this.count % this.vehicleRate === 0) {
                this.createVehicle();
            }

            this.vehicles = this.vehicles.filter(vehicle => {
                if (this.player.accident(vehicle)) {
                    vehicle.element.remove();
                    this.heart--;
                    this.player.resetPosition();
                    return false;
                }
                if (vehicle.left > this.gameScreen.clientWidth || vehicle.left < -vehicle.width) {
                    vehicle.element.remove();
                    return false;
                }
                return true;
            });

            document.getElementById('heart').innerText = this.heart;

            // Update the timer display
            this.updateTimer();

            // Check if player reached the top
            this.checkPlayerPosition();

            if (this.heart <= 0 || this.timerDuration <= 0) {
                clearInterval(this.intervalId);
                this.gameScreen.style.display = 'none';
                this.endScreen.style.display = 'block';
                document.getElementById('final-score').innerText = Math.floor(this.score);
            }
        }, 1000 / 60);
    }

    resetGame() {
        this.vehicles.forEach(vehicle => vehicle.element.remove());
        this.vehicles = [];

        while (this.gameScreen.firstChild) {
            this.gameScreen.removeChild(this.gameScreen.firstChild);
        }

        this.count = 0;
        this.heart = 3;

        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        this.startTime = null;
        this.elapsedTime = null;
        this.score = 0;
        this.timerDuration = 100; // Reset the timer duration
    }

    createVehicle() {
        for (let i = 0; i < 5; i++) {
            const newVehicle = new Vehicle(this.gameScreen);

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
                newVehicle.element.remove();
            }
        }
    }

    updateTimer() {
        // Calculate elapsed time in milliseconds
        this.elapsedTime = performance.now() - this.startTime;

        // Convert elapsed time to seconds and calculate remaining time
        const elapsedTimeInSeconds = Math.floor(this.elapsedTime / 1000);
        const remainingTime = Math.max(0, this.timerDuration - elapsedTimeInSeconds);

        // Update timer display
        document.getElementById('timer').innerText = remainingTime;
    }

    checkPlayerPosition() {
        if (this.player.top <= 0) {
            // Calculate elapsed time in milliseconds
            this.elapsedTime = performance.now() - this.startTime;

            // Convert elapsed time to seconds and calculate remaining time
            const elapsedTimeInSeconds = Math.floor(this.elapsedTime / 1000);
            const remainingTime = Math.max(0, this.timerDuration - elapsedTimeInSeconds);

            // Calculate the score based on the remaining time
            this.score = Math.max(0, this.maxScore - (100 - remainingTime) * 100);

            // Update score display
            document.getElementById('score').innerText = Math.floor(this.score);

            // Display final score on the end screen
            clearInterval(this.intervalId);
            this.gameScreen.style.display = 'none';
            this.endScreen.style.display = 'block';
        }
    }
}
