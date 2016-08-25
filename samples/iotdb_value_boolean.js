/*
 *  Demonstrate blinking an LED using the boolean model
 *  Connect an LED to D6.
 */

"use strict";

const iotdb = require('iotdb');
iotdb.use("homestar-particle");

const things = iotdb.connect('ParticleValueBoolean', {
    pin: "D6",
    /*
     *  This is the really complicated way
     *  of doing it, just FYI more than anything
    init: {
        "on": {
            "dout": "D6",
        },
    }
    */
});
things.on("meta", function(thing) {
    console.log("+", "meta", thing.thing_id(), "\n ", thing.state("meta"));
});
things.on("thing", function(thing) {
    console.log("+", "discovered", thing.thing_id(), "\n ", thing.state("meta"));

    let count = 0;
    setInterval(function() {
        thing.set(":value", count++ % 2);
    }, 1000);
});
