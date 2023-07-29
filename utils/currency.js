import mongoose from "mongoose";
import util from "node:util";

const REGEX_FIND_DIGITS_AND_DOT = /\d*\.\d{1,2}/;
const REGEX_FIND_COMMAS_AND_LETTERS = /\,+|[a-zA-Z]+/g;
const REGEX_FIND_NEGATIVE = /^-/;

class Currency {
  constructor(path, options) {
    mongoose.SchemaTypes.Number.call(this, path, options);
  }
  cast(val) {
    if (typeof val === "string") {
      const currencyAsString = currencyAsString.replace(
        REGEX_FIND_COMMAS_AND_LETTERS,
        ""
      );
      const currency = REGEX_FIND_DIGITS_AND_DOT.exec(
        currencyAsString + ".0"
      )[0]; // Adds .0 so it works with whole numbers
      const output = (currency * 100).toFixed(0) * 1;
      return REGEX_FIND_NEGATIVE.test(currencyAsString)
        ? output.toFixed(0) * -1
        : output.toFixed(0);
    } else if (typeof val === "number") {
      return val.toFixed(0) * 1;
    } else {
      return new Error("Should pass in a number or string");
    }
  }
}

/*
 * inherits
 */
util.inherits(Currency, mongoose.SchemaTypes.Number);

export const loadType = function (mongoose) {
  mongoose.Types.Currency = mongoose.SchemaTypes.Currency = Currency;
  return Currency;
};
