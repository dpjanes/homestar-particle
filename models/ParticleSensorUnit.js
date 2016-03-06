/*
 *  ParticleSensorUnit.js
 *
 *  David Janes
 *  IOTDB
 *  2016-03-06
 */

"use strict";

var iotdb = require("iotdb")

exports.binding = {
    model: require('./particle-sensor-unit.json'),
    bridge: require('../ParticleBridge').Bridge,
    discover: false,
    initd: {
        pin: null,
        init: {
            "value": {
                "ain": "{{ pin|:A1 }}",
            },
        }
    },
    connectd: {
        data_in: function(paramd) {
            if (paramd.rawd.value) {
                paramd.cookd.value = Math.round((paramd.rawd.value / 1024.0) * 1000)/1000;
            }
        },
    },
};
