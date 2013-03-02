var mustache = require( 'mustache' );
var mc       = require( 'mailchimp' );

var mandrillOptions = {
  version: 1.0,
  secure : false,
}

// Send function
////////////////////////////////////////////////////////////////////////////////

module.exports = {
  send : function( to, context, attachments, options, cb ){

    var subject  = mustache.render( options.template_subject, context );
    var content  = mustache.render( options.template_content, context );
    var mandrill = new mc.MandrillAPI( options.mandrillKey, mandrillOptions );

    var config = {
      async   : true,
      message : {
        html       : content,
        subject    : subject,
        from_email : options.from_email,
        from_name  : options.from_name,
        to         : [ { email : to } ],
        attachments : attachments
      }
    };

    mandrill.messages_send( config, cb );
  }
}
