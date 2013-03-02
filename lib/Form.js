var validator = require( 'validator' );

var Form = module.exports = {

  //Grabs a request body and returns an object after the scope has been
  //resolved. (simple property lookup)
  resolveScope : function( body, scope ){
    var scope = scope || 'questions';

    return scope.length == 0 
           ? body 
           : body[ scope ];
  },

  //Recursively sanitizes an object for cross site scripting attempts
  //and other injection-type of security issues.
  sanitize : function( formData ){

    if( Array.isArray( formData ) ){
      for( var i = 0; i < formData.length; ++i ){
        formData[ i ] = Form._doSanitize( formData[ i ] );
      }
    }
    else{
      var props = Object.getOwnPropertyNames( formData );
      props.forEach( function( propName ){
        formData[ propName ] = Form._doSanitize( formData[ propName ] );
      });
    }

    return formData;
  },

  //Performs the actual sanitization (or recursively sanitizes if it's an
  // array of sub-object).
  _doSanitize : function( formData ){
    return typeof formData == 'object' 
           ? Form.sanitize( formData )
           : validator.sanitize( formData ).xss();
  },

  //Grabs the map of all the objects in the 
  toArray : function( formData, dictionary ){
    var retVal = [];

    if( !dictionary ){
      var props = Object.getOwnPropertyNames( formData );
      props.forEach( function( propName ){
        retVal.push({
          label : propName,
          value : formData[ propName ]
        });
      });
    }
    else{
      dictionary.forEach( function( el ){
        retVal.push({
          label : el.label,
          value : formData[ el.name ]
        });
      });
    }

    return retVal;
  }
}