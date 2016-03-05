/*
 *  This will send values 0...255 to the LED
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
            "value": {
                "ain": "A0",
            },
        },
    });

    /*
    var value = 0;
    var step = 20;
    setInterval(function() {
        bridge.push({
            "value": value,
        }, _.noop);

        value += step;
        value %= 255;
    }, 1000);
    */
};
exemplar.discover();
