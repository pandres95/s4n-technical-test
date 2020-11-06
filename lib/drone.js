/**
 * @typedef DroneDirection Defines a direction that a drone can be pointing to.
 * @property {String} label A human-readable name of the position.
 * @property {Number[]} vector The position vector.
 */

/**
 * Represents a Drone
 */
export class Drone {
    /**
     * @type {DroneDirection[]}
     */
    static #movementDirections = [
        {
            label: 'Norte',
            vector: [0, 1]
        },
        {
            label: 'Oriente',
            vector: [1, 0]
        },
        {
            label: 'Sur',
            vector: [0, -1]
        },
        {
            label: 'Occidente',
            vector: [-1, 0]
        }
    ];

    /**
     * Applies a command into a Drone.
     * @param {Drone} drone The drone to command.
     * @param {Number[]} commands A list of commands to apply.
     */
    static executeOrders (drone, commands = []) {
        for (const command of commands) {
            if (command) {
                drone.rotate(command);
            } else {
                drone.move();
            }
        }
    }

    #position = [0, 0];
    #direction = 0;

    /**
     * Moves the Drone inside the grid, one step at a time.
     */
    move () {
        const [x, y] = this.#position;
        const [mx, my] = Drone.#movementDirections[this.#direction].vector;
        const [nx, ny] = [x + mx, y + my];

        if (nx < -10 || nx > 10 || ny < -10 || ny > 10) {
            throw new Error('Exceeded block limits');
        }

        this.#position = [nx, ny];
    }

    /**
     * Rotates the drone direction, 90deg at a time.
     * @param {Number} newDirection The new direction to move to. -1 for left, 1 for right.
     */
    rotate (newDirection) {
        this.#direction = (this.#direction + newDirection + 4) % 4;
    }

    /**
     * Retrieves the current position
     * @returns {Number[]} A Point representing the current position.
     */
    get position () {
        return this.#position;
    }

    /**
     * Retrieves the current direction
     * @returns {DroneDirection} An object representing the current drone's direction.
     */
    get direction () {
        return Drone.#movementDirections[this.#direction];
    }

    toString () {
        const [x, y] = this.position;
        return `(${x}, ${y}) dirección ${this.direction.label}`;
    }
}
