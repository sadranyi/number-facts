'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://numbersapi.com/';

function NumbersDataHelper(){}

NumbersDataHelper.prototype.requestNumberFact = function(number){
    return this.getNumberFact(number).then(function(res){
        return res.body;
    }).catch(function(err){
        return 'That is not a number. Say a number';
    });
};

NumbersDataHelper.prototype.getNumberFact = function(number){
    var options = {
        method:'GET',
        uri:ENDPOINT + number,
        resolveWithFullResponse: true,
        json: true
    };
    return rp(options);
};

module.exports = NumbersDataHelper;