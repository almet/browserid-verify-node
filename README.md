browserid-verify - Verify BrowserID assertions.

[![Build Status](https://travis-ci.org/chilts/browserid-verify-node.png)](https://travis-ci.org/chilts/browserid-verify-node)

## Synopsis ##

```
var verify = require('browserid-verify')();

// once you have an assertion from the browser
verify(assertion, audience, function(err, email, response) {
    if (err) {
        // make sure no session is created
        return console.log('There was an error : ' + err);
    }

    // The err above means that something went wrong. Now, check response
    // to see if the assertion was ok.
    if ( !email ) {
        // make sure no session is created
        return console.log('Assertion was not ok : ' + response.reason);
    }

    console.log('The asserted email address is : ' + email);
    console.log('The entire reponse is :', response);

    // At this point, set up your cookie and session for the
    // newly logged in user.
});
```

## Verify Options ##

### type ###

```
type: (local|remote) - default: remote
```

Currently this package uses the remote verifier hosted at 'https://verifier.login.persona.org/verify' when using remote
verification. You can change this by changing the ```url``` option (see below).

### url ###

```
url: (a string) - default: https://verifier.login.persona.org/verify
```

The remote URL to use to verify the assertion can be overriden with this option. For example, if you only allow
outgoing requests from your webservers to another machine within your private network.

All requests to the URL will use the POST method with a 'Content-Type' of 'application/x-www-form-urlencoded' and the
'assertion' and 'audience' parameters as part of the form being encoded and sent.

You may use a 'http' service but you must make sure that you trust this service e.g. it may be a service you have
running within your provate network.

You may also provide a port (8080) and path (/). For example 'http://localhost:8080/'.

### agent ###

You can specify you own ```agent``` so that you are not limited by the in-built 5 request limit of Node's internal
agent. You can also specify one to be used for a forward-proxy (see the next section).

For example, if you would like to turn off the 5 concurrent requests limit, try this (see examples/agent.js for full
program):

```
var https = require('https');

var agent = new https.Agent();
agent.maxSockets = 1000000;

var verify = require('browserid-verify')({
    type  : 'remote',
    agent : agent,
});
```

### proxy ###

A forward proxy can be used if you have firewalled off outgoing http connections from your webservers. If, for example,
you have a host within your vpn that you can proxy requests through, then you can use that. e.g. using
'http://proxy:8080'. Obviously your webservers must be able to make outgoing connections to this internal host.

```
var verify = require('browserid-verify')({
    type  : 'remote',
    proxy : 'http://proxy:8080',
});
```

## Remote v Local Verification ##

Currently BrowserID is in Beta and therefore the assertion format is subject to change. Therefore we use the hosted
service at https://verifier.login.persona.org/verify to do the verification for us. This means you won't need to change
your code if the assertion format changes.

However, once BrowserID is out of Beta and the assertion format is stable, we will switch this library to use local
verification. Once this is done it achieves one of BrowserIDs goals which is that of distributed verification with no
central service needed.

Therefore, this library only implements remote verification.

However, the library will also perform local verification at some point in the future and will provide an easy upgrade
path to make sure it is easy to switch from one to the other.

Both remote and local verification functions will have the same API to allow this to happen.

## License ##

MPL 2.0

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.

(Ends)
