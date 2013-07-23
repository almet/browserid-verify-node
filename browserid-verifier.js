// ----------------------------------------------------------------------------
//
// browserid-verifier.js - remote or local verification of a browserid assertion
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//
// ----------------------------------------------------------------------------

var https = require('https');
var querystring = require('querystring');

// ----------------------------------------------------------------------------

const VERIFIER_METHOD = 'POST';
const VERIFIER_HOST   = 'verifier.login.persona.org';
const VERIFIER_PATH   = '/verify';

// ----------------------------------------------------------------------------

function verifyRemotely(assertion, audience, callback) {
    if (typeof callback !== 'function') throw "missing required callback argument";

    if (typeof assertion !== 'string' ) {
        process.nextTick(function() {
            callback('assertion should be a string');
        });
        return;
    }

    if (typeof audience !== 'string' ) {
        process.nextTick(function() {
            callback('audience should be a string');
        });
        return;
    }

    // hit the remote verifier
    var req = https.request({
        method: VERIFIER_METHOD,
        host: VERIFIER_HOST,
        path: VERIFIER_PATH
    }, function(resp) {
        // collect up the returned body
        var body = "";

        resp
            .on('data', function(chunk) {
                body += chunk;
            })
            .on('end', function() {
                var response;

                // catch any errors when parsing the returned JSON
                try {
                    response = JSON.parse(body);
                } catch(e) {
                    return callback(new Error("Remote verifier did not return JSON."));
                }

                if ( !response ) {
                    return callback(new Error("Remote verifier did not return any data."));
                }

                if ( response.status !== 'okay' ) {
                    return callback(new Error("Remote verifier status was not okay : " + response.status));
                }

                // pass the email back
                callback(null, response.email);
            })
        ;
    });

    req.setHeader('Content-Type', 'application/x-www-form-urlencoded');

    var data = querystring.stringify({
        assertion : assertion,
        audience  : audience,
    });

    req.setHeader('Content-Length', data.length);
    req.write(data);
    req.end();
}

function verifyLocally(assertion, audience, callback) {
    throw new Error("Program error: this function is not yet implemented. Please use verifyRemotely().");
}

// ----------------------------------------------------------------------------
// until the assertion format is unchanging, default to the remote verification

module.exports          = verifyRemotely; // default
module.exports.remotely = verifyRemotely;
module.exports.locally  = verifyLocally;

// ----------------------------------------------------------------------------
