# Drones4Corrientazo

This project contains the module `@corrientazo-domicilios/drones`, which allows simulating the behaviour of drones flying around the neighbourhood around _"El corrientazo domicilios"_. Spec is [here](docs/backend-dev-technical-test-.pdf)

## Installing

This module needs no dependencies. However, just in case you need to enable development environment, just run:

```sh
npm install
```

## Configuring

You can use environment variables to set operational parameters:

|Name|Type|Description|
|:---|:---|:----------|
|BLOCK_SIZE|Number|The size of the block the drone is limited to|
|MAX_ORDERS|Number|The number of maximum concurrent orders a Drone can manage in a single run|

## Usage

First, import and define a new Drone

```js
import { Drone } from './lib/drone.js';

const drone = new Drone();
```

The drone will be initialized at `(0, 0)` heading towards _North_.

### .executeCommands(commands)

The easiest way to manipulate the drone is by running commands. This method receives an array of `Number`s, each one representing a command. The possible commands are:

1. **0**: Move forward.
2. **-1**: Rotate to the left.
3. **1**: Rotate to the right.

### #move()

Moves the drone one step at a time.

### #rotate(position)

Rotates the drone a number of positions. Receives an integer indicating how many rotations the drone should do. Each rotation represents a 90º clockwise (positive integers) or counter-clockwise (negative integers) change.
