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
                "aout": "{{ pin|:A1 }}",
            },
        }
    },
    connectd: {
        data_out: paramd => {
            if (paramd.cookd.value) {
                paramd.rawd.value = Math.round(paramd.cookd.value * 255.0);
            }
        },
    },
};
