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
        pin: null,
        init: {
            "on": {
                "dout": "D7",
            },
        }
    },
    connectd: {
    },
};
