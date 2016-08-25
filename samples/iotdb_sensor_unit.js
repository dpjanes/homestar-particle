/*
 *  Demonstrate reading an analog value, between 0 and 1.
 *  Don't forget to reset the board before testing (sorry).
 *
 *  This is the best way to do this.
 */

"use strict";

var iotdb = require('iotdb');

var things = iotdb.connect('ParticleSensorUnit', {
    pin: "A3",
    sensitity: 0.05,
});
things.on("istate", function(thing) {
    console.log("+", "istate", thing.thing_id(), "\n ", thing.state("istate"));
});
things.on("meta", function(thing) {
    console.log("+", "meta", thing.thing_id(), "\n ", thing.state("meta"));
});
things.on("thing", function(thing) {
    console.log("+", "discovered", thing.thing_id(), "\n ", thing.state("meta"));
});
