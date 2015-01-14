# How Secure Is My Password
## Named Numbers

```javascript
var namedNumber = require("named-number");
var number = namedNumber(20000000);

console.log(number.getName()); // "20 million"
console.log(number.getFormatted()); // "20,000,000"
console.log(number.getSignificand()); // 2
console.log(number.getExponent()); // 7
console.log(number + 1); // 20000001
console.log("Result: " + number); // "Result: 20,000,000"
```