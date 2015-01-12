/**
 * Testing Libraries
 */
var buster = require("buster");
var assert = buster.referee.assert;

/**
 * Setup
 */
var largeNumber = require("./large-number");
var dictionary = require("./large-numbers-dictionary");

largeNumber.setDictionary(dictionary);

/**
 * Tests
 */
buster.testCase("large-number", {
    'Input' : {
        'NaN': {
            'string': function () {
                assert.exception(function () {
                    largeNumber('monkey');
                });
            },

            'object': function () {
                assert.exception(function () {
                    largeNumber({});
                });
            },

            'false': function () {
                assert.exception(function () {
                    largeNumber(false);
                });
            }
        },

        'Regular': {
            '100': function () {
                var n = largeNumber(100).valueOf();
                assert.same(n, 100);
            },

            '1': function () {
                var n = largeNumber(1).valueOf();
                assert.same(n, 1);
            },

            '0': function () {
                var n = largeNumber(0).valueOf();
                assert.same(n, 0);
            },

            '10000': function () {
                var n = largeNumber(10000).valueOf();
                assert.same(n, 10000);
            }
        },

        'Exponent': {
            '100': function () {
                var n = largeNumber(100).getExponent();
                assert.same(n, 2);
            },

            '123456': function () {
                var n = largeNumber(123456).getExponent();
                assert.same(n, 5);
            },

            '0.1': function () {
                var n = largeNumber(0.1).getExponent();
                assert.same(n, -1);
            },

            '0.0000123': function () {
                var n = largeNumber(0.0000123).getExponent();
                assert.same(n, -5);
            }
        },

        'Significand': {
            '123': function () {
                var n = largeNumber(123).getSignificand();
                assert.same(n, 1.23);
            },

            '123456': function () {
                var n = largeNumber(123456).getSignificand();
                assert.same(n, 1.23456);
            },

            '0.1': function () {
                var n = largeNumber(0.1).getSignificand();
                assert.same(n, 1);
            },

            '0.0000123': function () {
                var n = largeNumber(0.0000123).getSignificand();
                assert.same(n, 1.23);
            }
        },

        'Strings': {
            '120': function () {
                var n = largeNumber('120').valueOf();
                assert.same(n, 120);
            },

            '12 million': function () {
                var n = largeNumber('12 million').valueOf();
                assert.same(n, 12000000);
            },

            '12 thousand million': function () {
                var n = largeNumber('12 thousand million').valueOf();
                assert.same(n, 12000000000);
            },

            '12 quadragintillion': function () {
                var n = largeNumber('12 quadragintillion').valueOf();
                assert.same(n, 12e123);
            },

            '12.5 million': function () {
                var n = largeNumber('12.5 million').valueOf();
                assert.same(n, 12500000);
            },

            '// Twenty million': function () {
                var n = largeNumber('Twenty million').valueOf();
                assert.same(n, 20000000);
            }
        },

        'getFormatted': {
            '123456789': function () {
                var n = largeNumber(123456789).getFormatted();
                assert.same(n, '123,456,789');
            },

            '2000': function () {
                var n = largeNumber(2000).getFormatted();
                assert.same(n, '2,000');
            },

            '9740': function () {
                var n = largeNumber(9740).getFormatted();
                assert.same(n, '9,740');
            },

            '25950': function () {
                var n = largeNumber(25950).getFormatted();
                assert.same(n, '25,950');
            },

            '25951': function () {
                var n = largeNumber(25951).getFormatted();
                assert.same(n, '25,951');
            },

            '1.2534e-40': function () {
                var n = largeNumber(1.2534e-40).getFormatted();
                assert.same(n, '0.00000000000000000000000000000000000000012534');
            },

            '123456789e25': function () {
                var n = largeNumber(123456789e25).getFormatted();
                assert.same(n, '1,234,567,890,000,000,000,000,000,000,000,000');
            }
        },

        'Name': {
            '// 123456789': function () {
                var n = largeNumber(123456789).getName();
                assert.same(n, '123 million 456 thousand and 789');
            },

            '1.2534e-40': function () {
                var n = largeNumber(1.2534e-40).getName();
                assert.same(n, '0.00000000000000000000000000000000000000012534');
            }
        }
    },

    'Output': {
        '2000': function () {
            var n = largeNumber(2000).getName();
            assert.same(n, '2 thousand');
        },

        '// 124': function () {
            var n = largeNumber(124).getName();
            assert.same(n, '1 hundred and 24');
        },

        '0.3': function () {
            var n = largeNumber(0.3).getName();
            assert.same(n, '0.3');
        },

        '12000000': function () {
            var n = largeNumber(12000000).getName();
            assert.same(n, '12 million');
        },

        '12400000': function () {
            var n = largeNumber(12400000).getName();
            assert.same(n, '12 million');
        },

        '120000000': function () {
            var n = largeNumber(120000000).getName();
            assert.same(n, '120 million');
        },

        '12000000000': function () {
            var n = largeNumber(12000000000).getName();
            assert.same(n, '12 billion');
        }
    }
});