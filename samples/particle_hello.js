/*
 *  This tests particle-io firmata library.
 *  Make sure you've Flashed the Spark
 *  as per the README.md in this project
 *
 *  No IOTDB component except for getting configuration.
 */

"use strict";

const assert = require("assert");
const iotdb = require("iotdb");
const _ = iotdb._;

const Particle = require("particle-io");

const initd = iotdb.settings().get("bridges/ParticleBridge/initd");
assert.ok(_.is.String(initd.token));
assert.ok(_.is.String(initd.name));

const board = new Particle({
    token: initd.token,
    deviceId: initd.name,
});
 
board.on("ready", function() {
    console.log("+", initd.name, "device ready");
    this.pinMode("D7", this.MODES.OUTPUT);

    let byte = 0;

    // This will "blink" the on board led 
    setInterval(function() {
        this.digitalWrite("D7", (byte ^= 1));
    }.bind(this), 500);
});
board.on("error", function(error) {
    console.log("#", initd.name, "error", _.error.message(error));
});
