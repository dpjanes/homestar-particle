/*
 *  ParticleSensorPercent.js
 *
 *  David Janes
 *  IOTDB
 *  2016-03-03
 *  "Jacqui's Birthday"
 */

"use strict";

var iotdb = require("iotdb")

exports.binding = {
    model: require('./particle-sensor-percent.json'),
    bridge: require('../ParticleBridge').Bridge,
    discover: false,
    initd: {
        pin: null,
        init: {
            "on": {
                "dout": "A1",
            },
        }
    },
    discoverd: {
        data_in: function(paramd) {
            if (paramd.rawd.value) {
                paramd.cookd.value = Math.round(paramd.rawd.value / 255.0 * 100);
            }
        },
    },
};
