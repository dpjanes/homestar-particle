/*
 *  Demonstrate reading an analog value, between 0 and 100.
 *  Don't forget to reset the board before testing (sorry).
 *
 *  This is the best way to do this.
 *  
 *  Note: to work, this package must have been installed by 'homestar install' 
 */

"use strict";

var iotdb = require('iotdb');

var things = iotdb.connect('ParticleSensorPercent', {
    pin: "A3",
    sensitity: 5,
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
