#Mailtruck

No-programming form submission route that automatically packages a form's result 
inside an email and sends it to a certain address.

_Features:_
* Simple to use! Configure the route and you're ready to go, no programming required.
* Supports file uploads (sent as attachments to the email)
* Custom email templates ( with mustache )
* Automatic input sanitization ( xss sanitization, escaping )

Currently relies on Mandrill to send form, generate route is compatible with 
express.

##TODO

* Support multiple email-sending backends.
* Support multiple templating engines for rendering.
* Make file deletion post-submit configurable.
* Add back-end mimetype verification (whitelist/blacklist) for file uploads.

##License

MIT