var async = require( 'async' );
var fs    = require( 'fs' );
var path  = require( 'path' );

var Attachments = {};

Attachments.prepareOne = function( attachment, cb ){

  if( attachment.length <= 0 ){
    return cb();
  }

  fs.readFile( attachment.path, 'base64', function( err, dat ){

    if( err ){
      return cb( err );
    }

    var retVal = {
      type    : attachment.mime,
      name    : attachment.name,
      content : dat
    };

    fs.unlink( attachment.path );

    return cb( null, retVal );
  });
}

Attachments.prepareAll = function( attachments, cb ){
  attachments = !Array.isArray( attachments ) 
              ? [ attachments ] 
              : attachments;

  async.map( attachments, Attachments.prepareOne, cb);
}

module.exports = Attachments;
