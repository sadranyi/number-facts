'use strict';

var chai = require('chai');
var NumbersHelper = require('../numbers_data_helper');
var chaiAsPromised = require('chai-as-promised');
var expect = chai.expect;

chai.use(chaiAsPromised);
chai.config.includeStack = true;



describe('NumbersHelper', function(){
	var subject = new NumbersHelper();
	var number;

	describe('#getNumberFacts', function(){
		/** Assert Valid Number */
		context('with a valid airport code', function(){
			it('returns matching airport code', function(){
				number = 'SFO';
				var value = subject.requestAirportStatus(number).then(function (obj) {
					return obj.IATA;
				});
				return expect(value).to.eventually.eq(number);
			});
		});

		/** Assert Invalid Airport Code or non 200 Status code */
		context('with an invalid airport code', function () {
			it('return invalid airport code', function () {
				number = 'PUNKYBREWSTER';
				return expect(subject.requestAirportStatus(number)).to.be.rejectedWith(Error);
			});
		});
	});
});