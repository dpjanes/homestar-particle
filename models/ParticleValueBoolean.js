/*
 *  ParticleValueBoolean.js
 *
 *  David Janes
 *  IOTDB
 *  2016-08-25
 */

"use strict";

exports.binding = {
    model: require('./particle-value-boolean.json'),
    bridge: require('../ParticleBridge').Bridge,
    discover: false,
    initd: {
        pin: null,
        init: {
            "value": {
                "dout": "{{ pin|:D6 }}",
            },
        }
    },
};
