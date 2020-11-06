import { promises as fs } from 'fs';
import { join } from 'path';
import { Drone } from './lib/drone.js';

const FILENAME_REGEX = /in(?<id>\d+)\.txt/;

/**
 * Reads a filename and gets the drone ID and command lines.
 * @param {String} filename The filename to process
 */
async function getDroneFromFilename (filename) {
    return {
        id: FILENAME_REGEX.exec(filename)?.groups?.id ?? '00',
        commandlines: await fs.readFile(join(process.cwd(), filename), 'utf-8')
    };
}

/**
 * Parse a line of commands sent to a drone.
 * @param {String} commandLine A line of commands to be sent to the drone.
 * @returns {Number[]} An array of commands to
 */
function parseCommandLine (commandLine) {
    const parseMap = {
        A: 0,
        D: 1,
        I: -1
    };

    return commandLine.split('')
        .map(command => parseMap[command]);
}

/**
 * @typedef DroneFileDefinition
 * @property {String} id The drone ID
 * @property {String} commandlines The command lines to be sent into the drone
 */

/**
 * Processes the drone using its file defnition
 * @param {DroneFileDefinition} file The drone file definition
 */
async function processDrone (file) {
    const drone = new Drone();
    const orders = file.commandlines.split('\n')
        .slice(0, Number(process.env.MAX_ORDERS ?? 3))
        .filter(line => line !== '')
        .map(parseCommandLine);
    const output = ['== Reporte de entregas =='];

    for (const order of orders) {
        try {
            Drone.executeOrders(drone, order);
            output.push(`${drone}`);
        } catch (error) {
            output.push(error.message, `${drone}`);
        } finally {
            await fs.writeFile(`out${file.id}.txt`, output.join('\n'));
        }
    }
}

async function main () {
    const files = await fs.readdir(process.cwd());

    const dronefiles = files
        .filter(filename => FILENAME_REGEX.test(filename))
        .map(filename => getDroneFromFilename(filename));

    for await (const file of dronefiles) {
        processDrone(file);
    }
}

main();
