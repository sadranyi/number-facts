'use strict';

module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('numberfacts');
var NumbersDataHelper = require('./numbers_data_helper');

app.launch(function(req, res){
    var prompt = "Hello, did you know that every number has an associated fact? Lets play a game, tell me any number and I will tell you a fact.";
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('numberfacts',{
    'slots':{
        'factNumber': 'AMAZON.NUMBER'
    },
    'utterances': ['{|tell|show} {|me} {|fact|facts} {|about} {|number} {-|factNumber}']
}, function(req, res){
    /**Get the slot */
    var factsNumber = req.slot('factNumber');
    var propmt = 'Tell me any number';

    if(_.isEmpty(factsNumber)){
        var prompt = 'I didn\'t hear any number. Tell me any number.';
        res.say(prompt).reprompt(prompt).shouldEndSession(false);
        return true;
    }else{
        var numberHelper = new NumbersDataHelper();
        numberHelper.requestNumberFact(factsNumber).then(function(fact){
            res.say(fact).send();
        }).catch(function(err){
            var propmt = 'I didn\'t have any fact for ' + factsNumber;
            console.log(propmt);
            res.say(prompt).reprompt(prompt).shouldEndSession(true).send();
            
        });
        return false;
    }
});

/** STOP and CANCEL function */
var exitfunction = function(req, res){
    var speechOut = 'GoodBye!';
    res.say(speechOut).shouldEndSession(true);
};

app.intent('AMAZON.StopIntent', exitfunction);
app.intent('AMAZON.CancelIntent', exitfunction);


app.intent('AMAZON.HelpIntent', function(req, res){
    var speechOut = 'To get a fact about any number, say the number, ' + 
    'For example, to get facts about the number 10, say ten. What number do you want facts about?';
    res.say(speechOut).shouldEndSession(false);
});

console.log(app.utterances().replace(/\{\-\|/g, '{'));
module.exports = app;