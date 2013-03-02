var _u          = require( 'underscore' );
var async       = require( 'async' );
var Attachments = require( './lib/Attachments' );
var Form        = require( './lib/Form' );
var fs          = require( 'fs' );
var Mail        = require( './lib/Mail' );
var path        = require( 'path' );

// Default configuration
////////////////////////////////////////////////////////////////////////////////

var defaultConfig = {
  title            : 'My Mailtruck form',
  scope            : 'form',
  template_subject : path.join( __dirname, '/resources/title.tmpl' ),
  template_content : path.join( __dirname, '/resources/content.tmpl' ),
  from_email       : 'mailtruck@mailtruck-notexist.com',
  from_name        : 'Mailtruck',
  redirect         : '/'
}

// Utilities
////////////////////////////////////////////////////////////////////////////////

function defaultTmpl( key ){
  defaultConfig[ key ] = fs.readFileSync( defaultConfig[ key ], 'utf8' );
}

// Module
////////////////////////////////////////////////////////////////////////////////

var MailTruck = {};

MailTruck.route = function( to, options ){

  //Load template files if overrides weren't set in the options.
  if( !options.template_subject ){ defaultTmpl( 'template_subject' ); }
  if( !options.template_content ){ defaultTmpl( 'template_content' ); }

  options = _u.defaults( options, defaultConfig );

  //Express route
  return function mailtruckRoute( req, res, next ){
    
    //Extract and prepare the form data
    var formData  = Form.resolveScope( req.body, options.scope );
    formData      = Form.sanitize( formData );
    var formArray = Form.toArray( formData, options.dictionary );

    var context = {
      title : options.title,
      arr   : formArray,
      map   : formData,
    };

    //Handle attachments
    var filesData = Form.resolveScope( req.files, options.scope );
    var files = Object.getOwnPropertyNames( filesData ).map( function( n ){
      return filesData[ n ];
    });

    //Send file over
    var attachments = [];
    async.waterfall([
      function( cb ){
        Attachments.prepareAll( files, cb );
      },

      function( attachments, cb ){
        Mail.send( to, context, attachments, options, cb );
      }
    ], function( err, doc ){ 
      if( err ){
        console.error( err );
      }
      
      res.redirect( options.redirect );
    });
  }
}

module.exports = MailTruck;