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
