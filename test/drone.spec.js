import chai from 'chai';
import {
    Drone
} from '../lib/drone.js';

const {
    expect
} = chai;

describe('Drone', () => {
    /**
     * @type {Drone}
     */
    let drone;

    describe('#constructor', () => {
        before(() => (drone = new Drone()));

        it('Is initialized on (0,0) heading North', () => {
            expect(drone.position).to.deep.equal([0, 0]);
            expect(drone.direction).to.deep.property('vector', [0, 1]);
        });
    });

    describe('.executeOrders', () => {
        it('Receives a series of commands and moves the drone', () => {
            Drone.executeOrders(drone, [0, 0, -1, 0]);
        });

        it('The position changes from origin to (-1, 2)', () => {
            expect(drone.position).to.deep.equal([-1, 2]);
        });

        it('The direction changes towards West', () => {
            expect(drone.direction).to.deep.property('vector', [-1, 0]);
        });
    });

    describe('#toString', () => {
        it('Drone outputs human-readable stats', () => {
            expect(drone.toString()).to.eql('(-1, 2) dirección Occidente');
        });
    });

    describe('#move', () => {
        it('Allows moving one step at a time, in the vector of the current direction', () => {
            const [x, y] = drone.position;
            const [mx, my] = drone.direction.vector;
            drone.move();
            const [nx, ny] = drone.position;

            expect(nx).to.eql(x + mx);
            expect(ny).to.eql(y + my);
        });

        it('Throws error when trying to breach a wall', () => {
            for (let i = 0; i < 8; i++) {
                drone.move();
            }
            expect(() => drone.move()).to.throw(/Exceeded block limits/);
        });
    });
});
