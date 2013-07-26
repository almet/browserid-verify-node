// ----------------------------------------------------------------------------

// npm
var test = require('tape');
var nock = require('nock');

// local
var verify = require('../browserid-verify.js');

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
    verify('assertion', 'https://example.com/', function(err, email, response) {
        t.equal(err, null, 'There is no error.');

        t.equal(email, 'me@example.com', 'Email address asserted correctly.');

        t.equal(response.status, 'okay', 'Response status is okay.');
        t.equal(response.email, 'me@example.com', 'Email in response is same as email passed back.');
        t.equal(response.issuer, 'example.com', 'Issuer is also example.com.');
        t.equal(response.expires, 1354217396705, 'Expires is correct.');
        t.equal(response.audience, 'https://example.com', 'Audience is correct.');

        t.end();
    });

});

// ----------------------------------------------------------------------------
