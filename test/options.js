// ----------------------------------------------------------------------------

// npm
var test = require('tape');
var nock = require('nock');

// local
var createVerify = require('../browserid-verify.js');

// ----------------------------------------------------------------------------

test('test we accept a https: protocol for the url', function(t) {
    t.plan(1);

    try {
        createVerify({ url : 'https://example.com/' })
        t.pass('We did not throw an error on the https: protocol');
    }
    catch (e) {
        console.log(e);
    }
});

test('test we accept a http: protocol for the url', function(t) {
    t.plan(1);

    try {
        createVerify({ url : 'http://example.com/' })
        t.pass('We did not throw an error on the https: protocol');
    }
    catch (e) {
        console.log(e);
    }
});

test('we do not accept a ftp: protocol for the url', function(t) {
    t.plan(1);

    try {
        createVerify({ url : 'ftp://example.com' });
    }
    catch (e) {
        t.pass('We obtained an exception to our url');
        console.log(e);
    }
});

test('we do not accept giberish for the url', function(t) {
    t.plan(1);

    try {
        createVerify({ url : 'localhost' });
    }
    catch (e) {
        t.pass('We obtained an exception to our url since it is invalid');
        console.log(e);
    }
});

// ----------------------------------------------------------------------------
