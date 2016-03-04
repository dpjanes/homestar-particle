# homestar-particle
IOTDB / Home☆Star Module for [Particle]().

<img src="https://raw.githubusercontent.com/dpjanes/iotdb-homestar/master/docs/HomeStar.png" align="right" />

# Installation

[Install Home☆Star first](https://homestar.io/about/install).

Then:

    $ homestar install homestar-particle

# Testing

## IOTDB

Turn on Particle.

	$ node
	>>> iotdb = require('iotdb')
	>>> things = iotdb.connect("Particle")
	>>> things.set(":on", true);
	
## [IoTQL](https://github.com/dpjanes/iotdb-iotql)

Change to HDMI1 

	$ homestar install iotql
	$ homestar iotql
	> SET state:on = true WHERE meta:model-id = "particle";

## Home☆Star

Do:

	$ homestar runner browser=1
	
You may have to refresh the page, as it may take a little while for your Things to be discovered. If your TV is not on it won't show up.

# Models
## Particle

See [Particle.iotql](https://github.com/dpjanes/homestar-particle/blob/master/models/Particle.iotql)
