const path = require('path');
const fs = require('fs');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.params = HttpContext.path.params;
        }
        checkParamsCount(nbParams) {
            if (Object.keys(this.params).length > nbParams) {
                return this.error("too many parameters");
            }
            return true;
        }
        error(message) {
            this.params.error = message;
            this.response.JSON(this.params);
            return false;
        }
        getNumericParam(name) {
            if (name in this.params) {
                value = parseFloat(this.params[name]);
                if (!isNaN(value)) {
                    this.params[name] = value;
                    return true;
                }
                else {
                    return this.error(name + " is not a number");
                }
            }
            else {
                return this.error(name + " is missing");
            }
        }
        get() {
            if (this.HttpContext.path.queryString == "?") {
                // Send helppage
                let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathsServiceHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);
            }
            else {
                if (this.HttpContext.path.params.op) {
                    let op = this.HttpContext.path.params.op;
                    let x;
                    let y;
                    let value;
                    if (' ') op = '+';
                    switch (op) {
                        //Opérateur +
                        case '+':
                            if (this.checkParamsCount(3) && this.getNumericParam(y) && this.getNumericParam(x)) {

                                x = this.HttpContext.path.params.x;
                                y = this.HttpContext.path.params.y;
                                this.HttpContext.path.params.value = x + y;
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        //Opérateur -
                        case '-':
                            if (this.checkParamsCount(3) && this.getNumericParam(y) && this.getNumericParam(x)) {

                                x = this.HttpContext.path.params.x;
                                y = this.HttpContext.path.params.y;
                                this.HttpContext.path.params.value = x - y;
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        //Opérateur *
                        case '*':
                            if (this.checkParamsCount(3) && this.getNumericParam(y) && this.getNumericParam(x)) {

                                x = this.HttpContext.path.params.x;
                                y = this.HttpContext.path.params.y;
                                this.HttpContext.path.params.value = x * y;
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        case '/':
                            if (this.checkParamsCount(3) && this.getNumericParam(y) && this.getNumericParam(x)) {

                                x = this.HttpContext.path.params.x;
                                y = this.HttpContext.path.params.y;
                                this.HttpContext.path.params.value = x / y;
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        case '%':
                            if (this.checkParamsCount(3) && this.getNumericParam(y) && this.getNumericParam(x)) {

                                x = this.HttpContext.path.params.x;
                                y = this.HttpContext.path.params.y;
                                this.HttpContext.path.params.value = x % y;
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        case '!':

                            if (this.checkParamsCount(2) && this.getNumericParam(y) && this.getNumericParam(x)) {


                                let n = parseInt(this.HttpContext.path.params.n);

                                this.HttpContext.path.params.value = factorial(n);
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        case 'p':
                            if (this.checkParamsCount(2) && this.getNumericParam(y) && this.getNumericParam(x)) {
                                this.HttpContext.path.params.op = "p";
                                let n = parseInt(this.HttpContext.path.params.n);
                                this.HttpContext.path.params.value = isPrime(n);
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;

                        case 'np':
                            if (this.checkParamsCount(2) && this.getNumericParam(y) && this.getNumericParam(x)) {

                                this.HttpContext.path.params.op = "np";
                                let n = parseInt(this.HttpContext.path.params.n);
                                this.HttpContext.path.params.value = findPrime(n);
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;

                    }
                }
                else {
                    this.HttpContext.path.param.error = "parameter 'op' is missing";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
                function factorial(n) {
                    if (n === 0 || n === 1) {
                        return 1;
                    }
                    return n * factorial(n - 1);
                }
                function isPrime(value) {
                    for (var i = 2; i < value; i++) {
                        if (value % i === 0) {
                            return false;
                        }
                    }
                    return value > 1;
                }
                function findPrime(n) {
                    let primeNumber = 0;
                    for (let i = 0; i < n; i++) {
                        primeNumber++;
                        while (!isPrime(primeNumber)) {
                            primeNumber++;
                        }
                    }
                    return primeNumber
                }
            }
        }
    }