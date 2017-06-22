"use strict";

var winston = require("winston");
var doT = require("dot");
var utils = require("../utils");

module.exports = function (bot, persona) {

    var intent = "smalltalk.greeting";

    bot.dialog(intent, [
        (session, results, next) => {
            winston.debug("[ %s ] intent matched [ %s ]", intent, session.message.text);

            var template = doT.template(persona.getResponse(intent));
            var response = template({name: session.userData.name});

            winston.debug("response [ %s ]", response);
            session.send(response);

            if (!session.userData.greeted) {
                session.userData.greeted = true;
                session.send(persona.getResponse("help", session));
            }

            if (!session.userData.name) {
                session.beginDialog("user.name", {});
            }
            return next();
        },
        (session, results, next) => {
            return next({response: intent});
        },
        utils.storeAsPreviousIntent
    ]);
};