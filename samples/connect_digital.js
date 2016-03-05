/*
 *  Demonstrate Digital Read and Write.
 *  Connect an LED to D6 and a Push Button to D3.
 *
 *  Prefer the iotdb_* versions
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
            "on": {
                "dout": "D6",
                "din": "D3",
            },
        },
    });

    var count = 0;
    setInterval(function() {
        bridge.push({
            "on": count++ % 2,
        }, _.noop);
    }, 1000);
};
exemplar.discover();
