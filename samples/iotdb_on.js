/*
 *  Demonstrate Blink an LED. 
 *  Connect an LED to D6.
 *
 *  This is the best way to do this.
 *  
 *  Note: to work, this package must have been installed by 'homestar install' 
 */

"use strict";

var iotdb = require('iotdb');

var things = iotdb.connect('ParticleOn', {
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
things.on("istate", function(thing) {
    console.log("+", "istate", thing.thing_id(), "\n ", thing.state("istate"));
});
things.on("meta", function(thing) {
    console.log("+", "meta", thing.thing_id(), "\n ", thing.state("meta"));
});
things.on("thing", function(thing) {
    console.log("+", "discovered", thing.thing_id(), "\n ", thing.state("meta"));

    var count = 0;
    setInterval(function() {
        thing.set(":on", count++ % 2);
    }, 1000);
});
