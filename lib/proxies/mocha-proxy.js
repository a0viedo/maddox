"use strict";

const chai = require("chai"),
  _ = require("lodash"),
  Errr = require("errr"),
  util = require("util");

const constants = require("../constants");

const expect = chai.expect;

class Mocha {
  static shouldEqual(left, right, message) {
    try {
      expect(left, message).eql(right);
    } catch (err) {
      if (Mocha._isPassThroughError_(left)) {
        Errr.newError(left).throw();

      } else {
        throw util.isError(left) ? Errr.newError(left.message).appendTo(err).throw() : err;
      }
    }
  }

  // TODO: Need a better way to handle pass through errors.  Need to set a flag somehow instead of doing string comparison.
  static _isPassThroughError_(message) {
    return message && _.isString(message) && (message.substring(0, constants.errorTypes.MaddoxBuildError.prefix.length) === constants.errorTypes.MaddoxBuildError.prefix ||
      message.substring(0, constants.errorTypes.MaddoxRuntimeError.prefix.length) === constants.errorTypes.MaddoxRuntimeError.prefix);
  }
}

module.exports = Mocha;
