// ----------------------------------------------------------------------------

// npm
var test = require('tape');
var nock = require('nock');

// local
var verify = require('../browserid-verifier.js');

// ----------------------------------------------------------------------------

// create the mock server and client for Route53
var verifier = nock('https://verifier.login.persona.org');

test('got an email address()', function(t) {
    // mock the response
    verifier
        .post('/verify')
        .replyWithFile(200, __dirname + '/status-okay.json')
    ;

    // now verify a (fake) assertion
    verify('assertion', 'audience', function(err, email) {
        t.equal(err, null, 'There is no error.');

        t.equal(email, 'me@example.com', 'Email address asserted correctly.');

        t.end();
    });

});

// ----------------------------------------------------------------------------
