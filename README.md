#Mailtruck

No-programming form submission route that automatically packages a form's result 
inside an email and sends it to a certain address.

__Features:__
 
 * Simple to use! Configure the mailtruck route and you're ready to go, no programming required.
 * Supports file uploads (sent as attachments to the email)
 * Custom email templates (with mustache)
 * Automatic input sanitization (xss sanitization)
 
Mailtruck route requires [express](http://expressjs.com) and relies on [Mandrill](http://mandrill.com) to send emails.

##Example

```javascript

var express   = require( 'express' );
var mailtruck = require( '../index' );

var app = express();

app.use( express.bodyParser() );
app.use( app.router );

app.get( '/', function( req, res, next ){
  res.send(
    [
      '<form method="POST" action="/">',
      ' First name: <input type="text" name="form[firstname]"><br>',
      ' Last name: <input type="text" name="form[lastname]"><br>',
      ' <button type="submit">send over email</button>',
      '</form>'
    ].join( '' )
  );
});

app.post( '/', mailtruck.route( 'olivier@keatonrow.com', { mandrillKey: "0ceb4b11-175e-4eb6-a315-f716edd8ba84" } ) );

app.listen( 3000 );

```


##Roadmap

* Support multiple email-sending backends.
* Support multiple templating engines for rendering.
* Remove express route, generalize to any http request.
* Make file deletion post-submit configurable.
* Add back-end mimetype verification (whitelist/blacklist) for file uploads.

##License

(The MIT License)

Copyright (C) 2013 - Keaton Row Inc. <no32@keatonrow.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.