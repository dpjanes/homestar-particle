/*
 *  ParticleOn.js
 *
 *  David Janes
 *  IOTDB
 *  2016-03-03
 *  "Jacqui's Birthday"
 *
 *  Turn something On / Off.
 */

"use strict";

var iotdb = require("iotdb")

exports.binding = {
    model: require('./particle-on.json'),
    bridge: require('../ParticleBridge').Bridge,
    discover: false,
    initd: {
        "on": {
            "mode": "output",
            "pin": "D7",
        },
    },
    connectd: {
        data_out: function (paramd) {
            if (paramd.cookd.on !== undefined) {
                paramd.rawd.Pin.push([ "write", paramd.cookd.on ? 1 : 0 ]);
            }
        },
    },
};
