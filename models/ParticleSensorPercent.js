/*
 *  ParticleSensorPercent.js
 *
 *  David Janes
 *  IOTDB
 *  2016-03-03
 *  "Jacqui's Birthday"
 */

"use strict";

exports.binding = {
    model: require('./particle-sensor-percent.json'),
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
        data_out: paramd => {
            if (paramd.rawd.value) {
                paramd.cookd.value = Math.round(paramd.rawd.value / 1024.0 * 100);
            }
        },
    },
};
