"use strict";

var L = require("hsimp-library");

var namedNumberDictionary, orderedNamedNumberDictionary;

var getDictionaryName = L.prop(0);
var getDictionaryValue = L.prop(1);

var exponentSplit = function (value) {
    var exponential = value.toExponential(),
        match = exponential.match(/^([\.\d]+)e([\+\-]\d+)/),

        significand = value,
        exponent = 0;

    if (match && match.length >= 3) {
        significand = +match[1];
        exponent = +match[2];
    }

    return {
        significand: significand,
        exponent: exponent
    };
};

var zeroPad = function (amount) {
    return amount > 0 ? new Array(amount + 1).join("0") : "";
};

var addCommas = function (string) {
    var match = /(\d+)(\d{3})/;

    while (match.test(string)) {
        string = string.replace(match, "$1" + "," + "$2");
    }

    return string;
};

var format = function (significand, exponent) {
    var split = significand.toString().split("."),
        string = split[0];

    if (split.length > 1) {
        string += split[1].substr(0, exponent);
    }

    string += zeroPad(exponent - string.length + 1);
    return addCommas(string);
};

var decimalShift = function (significand, exponent) {
    var digits = significand.toString().replace(".", "").replace(/[09]{4,}\d$/, "");
    return "0." + zeroPad(Math.abs(exponent) - 1) + digits;
};

var parseString = function (string) {
    var matches = string.match(/^[\d\.]+\s+([\sa-zA-Z]+)\s*$/),
        num = parseFloat(string.replace(/,/g, "")),
        exponent = 0,
        split,
        cur,
        value;

    if (!matches && !num) {
        return string;
    }

    if (matches && matches.length === 2) {
        split = matches[1].split(/\s+/);

        L.forEach(function (value) {
            cur = value.toLowerCase();

            if (namedNumberDictionary.hasOwnProperty(cur)) {
                exponent += namedNumberDictionary[cur];
            }
        }, split);

        // Avoid floating point oddities
        value = (num * Math.pow(10, exponent)).toPrecision(num.toString().length);
        value = +value;
    } else {
        value = num;
    }

    return value;
};

var getName = function (significand, exponent) {
    var join = [],
        highestNumber = orderedNamedNumberDictionary[0],

        exponentCheck = L.forEach(function (number) {
            if (exponent < getDictionaryValue(number)) {
                return false;
            }

            highestNumber = number;
        });

    if (exponent < 0) {
        return decimalShift(significand, exponent);
    }

    while (exponent >= getDictionaryValue(highestNumber)) {
        exponentCheck(orderedNamedNumberDictionary);
        exponent -= getDictionaryValue(highestNumber);
        join.unshift(getDictionaryName(highestNumber));
    }

    significand = Math.round(significand * Math.pow(10, exponent));

    var split = exponentSplit(significand),
        sig = split.significand,
        exp = split.exponent;

    join.unshift(format(sig.toString(), exp));

    return join.join(" ");
};

var namedNumber = function (value) {
    var self = {},
        name, split, significand, exponent;

    if (!namedNumberDictionary) {
        throw new Error("Named Number dictionary not set");
    }

    if (L.isString(value)) {
        value = parseString(value);
    }

    if (!L.isNumber(value) || isNaN(value)) {
        throw {
            type: "invalidNumber",
            value: value
        };
    }

    split = exponentSplit(value);

    significand = split.significand;
    exponent = split.exponent;

    self.getSignificand = function () {
        return significand;
    };

    self.getExponent = function () {
        return exponent;
    };

    self.getName = function () {
        name = name || getName(significand, exponent);
        return name;
    };

    self.getFormatted = function () {
        if (exponent < 0) {
            return decimalShift(significand, exponent);
        }

        return format(significand, exponent);
    };

    self.toString = self.getFormatted;

    self.valueOf = function () {
        return value;
    };

    return self;
};

namedNumber.setDictionary = function (numberDictionary) {
    namedNumberDictionary = numberDictionary;
    orderedNamedNumberDictionary = L.sortBy(1, L.toPairs(namedNumberDictionary));
    return namedNumber;
};

module.exports = namedNumber;
