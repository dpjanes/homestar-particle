# homestar-particle
[IOTDB](https://github.com/dpjanes/node-iotdb) Bridge for [Particle](https://www.particle.io/) boards.

<img src="https://raw.githubusercontent.com/dpjanes/iotdb-homestar/master/docs/HomeStar.png" align="right" />

# About

* [Read about Bridges](https://github.com/dpjanes/node-iotdb/blob/master/docs/bridges.md)

# Installation and Configuration

* [Read this first](https://github.com/dpjanes/node-iotdb/blob/master/docs/install.md)
* [Read about installing Home☆Star](https://github.com/dpjanes/node-iotdb/blob/master/docs/homestar.md) 

Then:

    $ npm install -g homestar    ## may require sudo
    $ homestar setup
    $ npm install homestar-particle

You'll also need to save your Access Token. 
To get your Access Token, go to [Particle Build](https://build.particle.io/build/),
log in, and click on Settings (the cog in the lower right corner).

Copy the Access Token and use it as follows

    $ homestar set /bridges/ParticleBridge/initd/key 8888888888888888888888888888888888888888

If you only have the one Particle device, you can save that too.
If you have multiple devices, you'll need to specify the name when connecting.

    $ homestar set /bridges/ParticleBridge/initd/name elrond
        
# Important Note

Because this is using [particle-io](https://www.npmjs.com/package/particle-io), 
the machine you are running on has to be IP reachable from the Particle. 
I hope to change this in a future version.

Furthermore, you seem to need to press the Rest button on the Particle
to properly do Analog Inputs. This is a bug somewhere in the 
Libraries we are using (and a huge problem).

# Use

Turn on the built in LED

    var iotdb = require('iotdb')
    iotdb.use("homestar-particle")

    const things = iotdb.connect('ParticleOn');
    things.set(':on', true);

Turn on the built in LED, specifying both the Access Token
and the Board Name as parameters

    const things = iotdb.connect('ParticleOn', {
        "key": "8888888888888888888888888888888888888888",
        "name": "elrond",
    });
    things.set(':on', true);

Turn on LED on D6

    const things = iotdb.connect('ParticleOn', {
        pin: 'D6',
    });
    things.set(':on', true);

Turn the LED on A4 to 50% brightness

    const things = iotdb.connect('ParticleValuePercent', {
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
