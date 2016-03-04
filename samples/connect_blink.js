/*
 *  This will send blink the default LED.
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
        /*
    bridge.push({
        "value1": "the first",
        "value2": "la deuxième",
        "value3": "der dritte",
    }, _.noop);
        */
};
exemplar.discover();
