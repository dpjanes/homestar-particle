# homestar-particle
IOTDB / Home☆Star Module for [Particle]().

<img src="https://raw.githubusercontent.com/dpjanes/iotdb-homestar/master/docs/HomeStar.png" align="right" />

# Installation

[Install Home☆Star first](https://homestar.io/about/install).

Then:

    $ homestar install homestar-particle

You'll also need to save your Access Token. 
To get your Access Token, go to [Particle Build](https://build.particle.io/build/),
log in, and click on Settings (the cog in the lower right corner).

Copy the Access Token and use it as follows

    $ homestar set /bridges/ParticleBridge/initd/key 8888888888888888888888888888888888888888

If you only have the one Particle device, you can save that too.
If you have multiple devices, you'll need to specify the name when connecting.

    $ homestar set /bridges/ParticleBridge/initd/name elrond
        

# Testing

## IOTDB

Turn on the built in LED

    var iotdb = require('iotdb')
    var things = iotdb.connect('ParticleOn');
    things.set(':on', true);

Turn on the built in LED, specifying both the Access Token
and the Board Name as parameters

    var iotdb = require('iotdb')
    var things = iotdb.connect('ParticleOn', {
        "key": "8888888888888888888888888888888888888888",
        "name": "elrond",
    });
    things.set(':on', true);

Turn on LED on D6

    var iotdb = require('iotdb')
    var things = iotdb.connect('ParticleOn', {
        pin: 'D6',
    });
    things.set(':on', true);

Turn the LED on A4 to 50% brightness

    var iotdb = require('iotdb')
    var things = iotdb.connect('ParticleValuePercent', {
        pin: 'D6',
    });
    things.set(':value', true);

# Models

## Generic Actuators
### ParticleOn
### ParticleOpen
### ParticleValueBoolean
### ParticleValueUnit
### ParticleValuePercent
## Generic Sensors
## "Real" Devices
