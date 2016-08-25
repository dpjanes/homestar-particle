/*
 *  Demonstrate chaning the brightness on an LED.
 *  Connect an LED to A4.
 *
 *  Also note that although this Model takes
 *  a unit - a value between 0 and 1 - we can
 *  feed it a percent value AS LONG AS we
 *  delcare that that value is a percent
 *  using iotdb.as.percent()
 */

"use strict";

const iotdb = require('iotdb');
iotdb.use("homestar-particle");

const things = iotdb.connect('ParticleValueUnit', {
    pin: "A4",
    /*
     *  This is the really complicated way
     *  of doing it, just FYI more than anything
    init: {
        "on": {
            "aout": "A4",
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
        thing.set(":value", count, iotdb.as.percent());
        count += 10;
        count %= 100;
    }, 500);
});
