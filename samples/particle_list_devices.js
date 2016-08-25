/*
 *  These test the Particle API. 
 *
 *  No IOTDB component except for getting configuration.
 */

"use strict";

const Particle = require("particle-api-js");

const assert = require("assert");
const iotdb = require("iotdb");
const _ = iotdb._;

const initd = iotdb.settings().get("bridges/ParticleBridge/initd");
assert.ok(_.is.String(initd.token));
assert.ok(_.is.String(initd.name));

const particle = new Particle()
particle
    .listDevices({
        auth: initd.token,
    })
    .then(
        devices => console.log('+', devices),
        error => console.log("#", error)
    );
