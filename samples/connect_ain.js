/*
 *  Demonstrate Analog Reads. 
 *  Connect a Pot to A1.
 *
 *  Prefer the iotdb_* versions.
 */

"use strict";

var iotdb = require('iotdb');
var _ = iotdb._;

var Bridge = require('../ParticleBridge').Bridge;

var exemplar = new Bridge({
});
exemplar.discovered = function (bridge) {
    console.log("+", "got one", bridge.meta());

    bridge.pulled = function(pulld) {
        console.log("+", "pulled", pulld);
    };

    bridge.connect({
        init: {
            "value": {
                "ain": "A1",
            },
        },
    });
};
exemplar.discover();
