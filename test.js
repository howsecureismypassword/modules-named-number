/**
 * Testing Libraries
 */
var buster = require("buster");
var assert = buster.referee.assert;

/**
 * Setup
 */
var namedNumber = require("./named-number");
var dictionary = require("./named-number-dictionary");

namedNumber.setDictionary(dictionary);

/**
 * Tests
 */
buster.testCase("named-number", {
    'Input' : {
        'NaN': {
            'string': function () {
                assert.exception(function () {
                    namedNumber('monkey');
                });
            },

            'object': function () {
                assert.exception(function () {
                    namedNumber({});
                });
            },

            'false': function () {
                assert.exception(function () {
                    namedNumber(false);
                });
            }
        },

        'Regular': {
            '100': function () {
                var n = namedNumber(100).valueOf();
                assert.same(n, 100);
            },

            '1': function () {
                var n = namedNumber(1).valueOf();
                assert.same(n, 1);
            },

            '0': function () {
                var n = namedNumber(0).valueOf();
                assert.same(n, 0);
            },

            '10000': function () {
                var n = namedNumber(10000).valueOf();
                assert.same(n, 10000);
            }
        },

        'Exponent': {
            '100': function () {
                var n = namedNumber(100).getExponent();
                assert.same(n, 2);
            },

            '123456': function () {
                var n = namedNumber(123456).getExponent();
                assert.same(n, 5);
            },

            '0.1': function () {
                var n = namedNumber(0.1).getExponent();
                assert.same(n, -1);
            },

            '0.0000123': function () {
                var n = namedNumber(0.0000123).getExponent();
                assert.same(n, -5);
            }
        },

        'Significand': {
            '123': function () {
                var n = namedNumber(123).getSignificand();
                assert.same(n, 1.23);
            },

            '123456': function () {
                var n = namedNumber(123456).getSignificand();
                assert.same(n, 1.23456);
            },

            '0.1': function () {
                var n = namedNumber(0.1).getSignificand();
                assert.same(n, 1);
            },

            '0.0000123': function () {
                var n = namedNumber(0.0000123).getSignificand();
                assert.same(n, 1.23);
            }
        },

        'Strings': {
            '120': function () {
                var n = namedNumber('120').valueOf();
                assert.same(n, 120);
            },

            '12 million': function () {
                var n = namedNumber('12 million').valueOf();
                assert.same(n, 12000000);
            },

            '12 thousand million': function () {
                var n = namedNumber('12 thousand million').valueOf();
                assert.same(n, 12000000000);
            },

            '12 quadragintillion': function () {
                var n = namedNumber('12 quadragintillion').valueOf();
                assert.same(n, 12e123);
            },

            '12.5 million': function () {
                var n = namedNumber('12.5 million').valueOf();
                assert.same(n, 12500000);
            },

            '// Twenty million': function () {
                var n = namedNumber('Twenty million').valueOf();
                assert.same(n, 20000000);
            }
        },

        'getFormatted': {
            '123456789': function () {
                var n = namedNumber(123456789).getFormatted();
                assert.same(n, '123,456,789');
            },

            '2000': function () {
                var n = namedNumber(2000).getFormatted();
                assert.same(n, '2,000');
            },

            '9740': function () {
                var n = namedNumber(9740).getFormatted();
                assert.same(n, '9,740');
            },

            '25950': function () {
                var n = namedNumber(25950).getFormatted();
                assert.same(n, '25,950');
            },

            '25951': function () {
                var n = namedNumber(25951).getFormatted();
                assert.same(n, '25,951');
            },

            '1.2534e-40': function () {
                var n = namedNumber(1.2534e-40).getFormatted();
                assert.same(n, '0.00000000000000000000000000000000000000012534');
            },

            '123456789e25': function () {
                var n = namedNumber(123456789e25).getFormatted();
                assert.same(n, '1,234,567,890,000,000,000,000,000,000,000,000');
            }
        },

        'Name': {
            '// 123456789': function () {
                var n = namedNumber(123456789).getName();
                assert.same(n, '123 million 456 thousand and 789');
            },

            '1.2534e-40': function () {
                var n = namedNumber(1.2534e-40).getName();
                assert.same(n, '0.00000000000000000000000000000000000000012534');
            }
        }
    },

    'Output': {
        '2000': function () {
            var n = namedNumber(2000).getName();
            assert.same(n, '2 thousand');
        },

        '// 124': function () {
            var n = namedNumber(124).getName();
            assert.same(n, '1 hundred and 24');
        },

        '0.3': function () {
            var n = namedNumber(0.3).getName();
            assert.same(n, '0.3');
        },

        '12000000': function () {
            var n = namedNumber(12000000).getName();
            assert.same(n, '12 million');
        },

        '12400000': function () {
            var n = namedNumber(12400000).getName();
            assert.same(n, '12 million');
        },

        '120000000': function () {
            var n = namedNumber(120000000).getName();
            assert.same(n, '120 million');
        },

        '12000000000': function () {
            var n = namedNumber(12000000000).getName();
            assert.same(n, '12 billion');
        }
    }
});