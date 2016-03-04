/*
 *  ParticleBridge.js
 *
 *  David Janes
 *  IOTDB.org
 *  2016-03-03
 *
 *  Copyright [2013-2016] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

var iotdb = require('iotdb');
var _ = iotdb._;

var Particle = require('particle-io');

var logger = iotdb.logger({
    name: 'homestar-particle',
    module: 'ParticleBridge',
});

/**
 *  See {iotdb.bridge.Bridge#Bridge} for documentation.
 *  <p>
 *  @param {object|undefined} native
 *  only used for instances, should be 
 */
var ParticleBridge = function (initd, native) {
    var self = this;

    self.initd = _.defaults(initd,
        iotdb.keystore().get("bridges/ParticleBridge/initd"), {
            name: null,
            token: null,
        }
    );

    if (_.is.Empty(self.initd.token)) {
        logger.error({
            method: "ParticleBridge",
            cause: "caller must initialize with an 'token' - try homestar set /bridges/ParticleBridge/initd/token <yourkey>",
        }, "missing initd.token");

        throw new Error("ParticleBridge: expected 'initd.token'");
    }
    if (_.is.Empty(self.initd.name)) {
        logger.error({
            method: "ParticleBridge",
            cause: "caller must initialize with an 'name' - try homestar set /bridges/ParticleBridge/initd/name <yourkey>",
        }, "missing initd.name");

        throw new Error("ParticleBridge: expected 'initd.name'");
    }

    self.native = native;   // the thing that does the work - keep this name
    if (self.native) {
        self.queue = _.queue("ParticleBridge");
        self.pinds = [];
    }
};

ParticleBridge.prototype = new iotdb.Bridge();

ParticleBridge.prototype.name = function () {
    return "ParticleBridge";
};

/* --- lifecycle --- */

/**
 *  See {iotdb.bridge.Bridge#discover} for documentation.
 */
ParticleBridge.prototype.discover = function () {
    var self = this;

    logger.info({
        method: "discover"
    }, "called");

    self._board(function(error, board) {
        if (error) {
            logger.error({
                method: "discover",
                name: self.initd.name,
                error: _.error.message(error),
            }, "error connecting to the board");

            return;
        }

        self.discovered(new ParticleBridge(_.d.clone.shallow(self.initd), board));
    });
};


/**
 *  See {iotdb.bridge.Bridge#connect} for documentation.
 */
ParticleBridge.prototype.connect = function (connectd) {
    var self = this;
    if (!self.native) {
        return;
    }

    self._validate_connect(connectd);

    self.connectd = _.d.compose.shallow(connectd, {
        init: {
        },
    });

    _.mapObject(self.connectd.init, function(pind, code) {
        _.mapObject(pind, function(pin, mode) {
            var read = null;
            var write = null;

            if (mode === "din") {
                mode = self.native.MODES.INPUT;
            } else if (mode === "dout") {
                mode = self.native.MODES.OUTPUT;
                write = function(value) {
                    self.native.digitalWrite(pin, value ? true : false);
                };
            } else if (mode === "ain") {
                mode = self.native.MODES.ANALOG;
            } else if (mode === "aout") {
                mode = self.native.MODES.PWM;
                write = function(value) {
                    self.native.analogWrite(pin, value);
                };
            } else if (mode === "servo") {
                mode = self.native.MODES.SERVO;
            } else {
                logger.error({
                    method: "connect",
                    pind: d,
                    cause: "likely a user error when initially connecting to the Model",
                }, "unknown pin 'mode' -- ignoring, but this is very bad");
                return;
            }

            self.pinds.push({
                code: code,
                pin: ("" + pin).toUpperCase(),
                mode: mode,
                read: read,
                write: write,
            });
        });
    });

    logger.info({
        pinds: self.pinds,
    }, "pin definitions");

    self.pinds.map(function(pind) {
        self.native.pinMode(pind.pin, pind.mode);
    });

    self.pull();
};

ParticleBridge.prototype._forget = function () {
    var self = this;
    if (!self.native) {
        return;
    }

    logger.info({
        method: "_forget"
    }, "called");

    self.native = null;
    self.pulled();
};

/**
 *  See {iotdb.bridge.Bridge#disconnect} for documentation.
 */
ParticleBridge.prototype.disconnect = function () {
    var self = this;
    if (!self.native || !self.native) {
        return;
    }

    self._forget();
};

/* --- data --- */

/**
 *  See {iotdb.bridge.Bridge#push} for documentation.
 */
ParticleBridge.prototype.push = function (pushd, done) {
    var self = this;
    if (!self.native) {
        done(new Error("not connected"));
        return;
    }

    self._validate_push(pushd, done);

    logger.info({
        method: "push",
        pushd: pushd
    }, "push");

    _.mapObject(pushd, function(value, code) {
        for (var pi in self.pinds) {
            var pind = self.pinds[pi];
            if ((pind.code === code) && pind.write) {
                pind.write(value);
                break;
            }
        }
    });

    return done(null, null);
};

/**
 *  See {iotdb.bridge.Bridge#pull} for documentation.
 */
ParticleBridge.prototype.pull = function () {
    var self = this;
    if (!self.native) {
        return;
    }
};

/* --- state --- */

/**
 *  See {iotdb.bridge.Bridge#meta} for documentation.
 */
ParticleBridge.prototype.meta = function () {
    var self = this;
    if (!self.native) {
        return;
    }
    
    return {
        "iot:thing-id": _.id.thing_urn.unique_hash("Particle", self.native.name),
        "schema:name": self.native.name || "Particle",

        // "iot:thing-number": self.initd.number,
        // "iot:device-id": _.id.thing_urn.unique("Particle", self.native.uuid),
        // "schema:manufacturer": "",
        // "schema:model": "",
    };
};

/**
 *  See {iotdb.bridge.Bridge#reachable} for documentation.
 */
ParticleBridge.prototype.reachable = function () {
    return this.native !== null;
};

/**
 *  See {iotdb.bridge.Bridge#configure} for documentation.
 */
ParticleBridge.prototype.configure = function (app) {};

/* -- internals -- */
var __boardd = {};
var __pendingsd = {};

/**
 *  This returns a connection object per ( host, port, tunnel_host, tunnel_port )
 *  tuple, ensuring the correct connection object exists and is connected.
 *  It calls back with the connection object
 *
 *  The code is complicated because we have to keep callbacks stored 
 *  in '__pendingsd' until the connection is actually made
 */
ParticleBridge.prototype._board = function (callback) {
    var self = this;

    var board_key = self.initd.name;

    // board existings
    var board = __boardd[board_key];
    if (board) {
        return callback(null, board);
    }

    // queue exists
    var pendings = __pendingsd[board_key];
    if (pendings) {
        pendings.push(callback);
        return;
    }

    // brand new queue
    pendings = [];
    __pendingsd[board_key] = pendings;

    pendings.push(callback);

    var _connect = function (error) {
        delete __pendingsd[board_key];

        if (error) {
            logger.error({
                method: "_board",
                npending: pendings.length,
                name: self.initd.name,
                error: _.error.message(error),
            }, "creating web server");

            pendings.map(function (pending) {
                pending(error, null);
            });
            return;
        }

        __boardd[board_key] = board;

        pendings.map(function (pending) {
            pending(null, board);
        });
    };

    logger.info({
        method: "_board",
        npending: pendings.length,
        name: self.initd.name,
    }, "connect to Particle");

    var board = new Particle({
        token: self.initd.token,
        deviceId: self.initd.name,
    });
    board.on("ready", _connect);
    board.on("error", _connect);
};

/*
 *  API
 */
exports.Bridge = ParticleBridge;
