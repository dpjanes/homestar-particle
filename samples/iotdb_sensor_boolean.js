/*
 *  Demonstrate reading a boolean value
 *  Don't forget to reset the board before testing (sorry).
 *
 *  This is the best way to do this.
 */

"use strict";

const iotdb = require('iotdb');

const things = iotdb.connect('ParticleSensorBoolean', {
    pin: "D3",
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
