var fs          = require('fs');
var Promise     = require('bluebird');
var oxr         = require('./app/openExchangeRates.js');
var currencies  = require('./app/libs/currencies.js');


currency_converter.convert = function (options) {
  return new Promise(function (resolve, reject) {
    resolve(oxr.createProxy('formatConversion', options)
      // oxr.fetchOptions(options)
      //    .then(function (rates) {
      //       return oxr.formatConversion(options, rates);
      //    })
    );
  });
};

currency_converter.rates = function (options) {
  return new Promise(function (resolve, reject) {
    resolve(oxr.createProxy('formatConversionRate', options)
      // oxr.fetchOptions(options)
      //    .then(function (rates) {
      //       return oxr.formatConversionRate(options, rates);
      //    })
    );
  });
};

currency_converter.verifyInput = function (amount, convertFrom, convertTo) {
  var checkAmount   = true;
  var checkCurrency = currencies.hasOwnProperty(input.convertFrom) && 
                      currencies.hasOwnProperty(input.convertTo);

  if (input.amount) { checkAmount = !isNaN(input.amount); }

  return checkAmount && checkCurrency;
};

module.exports = function (configs) {
  oxr.URL += configs.CLIENTKEY;
  oxr.init(configs.fetchInterval);

  return currency_converter;
};