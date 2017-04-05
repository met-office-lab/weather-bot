"use strict";

var winston = require("winston");

module.exports = function (intents, persona) {

    var intent = "greeting";

    intents.matches(intent, [
        function (session, args, next) {
            winston.debug("[ %s ] intent matched [ %s ]", intent, session.message.text);
            var response = persona.getResponse("greeting");
            winston.debug("response [ %s ]", response);
            session.send(response);
        }
    ]);
    
};

