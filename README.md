browserid-verify - Verify BrowserID assertions.

## Synopsis ##

```
var verify = require('browserid-verify');

// once you have an assertion from the browser
verify(assertion, audience, function(err, response) {
    if (err) {
        // make sure no session is created
        return console.log('There was an error : ' + err);
    }

    // The err above means that something went wrong. Now, check response
    // to see if the assertion was ok.
    if ( response.status !== 'okay' ) {
        // make sure no session is created
        return console.log('Assertion was not ok : ' + response.reason);
    }

    console.log('The asserted email address is ' + response.email);

    // At this point, set up your cookie and session for the
    // newly logged in user.
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

(Ends)
