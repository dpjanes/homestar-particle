/*
 *  ParticleValueUnit.js
 *
 *  David Janes
 *  IOTDB
 *  2016-08-25
 */

"use strict";

exports.binding = {
    model: require('./particle-value-unit.json'),
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
        data_in: paramd => {
            if (paramd.rawd.value) {
                paramd.cookd.value = Math.round((paramd.rawd.value / 1024.0) * 1000)/1000;
            }
        },
    },
};
