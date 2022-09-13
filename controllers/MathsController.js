const path = require('path');
const fs = require('fs');
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
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
                    if (' ') op='+';
                    switch (op) {
                        //Opérateur +
                        case '+':
                            {
                                this.HttpContext.path.params.op = "+";
                                x = this.HttpContext.path.params.x;
                                y = this.HttpContext.path.params.y;
                                this.HttpContext.path.params.value = parseInt(x) + parseInt(y);
                                this.HttpContext.
                                    response.JSON(this.HttpContext.path.params);
                                break;
                            }
                        //Opérateur -
                        case '-':
                            {
                                this.HttpContext.path.params.op = "-";
                                x = this.HttpContext.path.params.x;
                                y = this.HttpContext.path.params.y;
                                this.HttpContext.path.params.value = parseInt(x) - parseInt(y);
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                                break;
                            }
                        //
                        case '*':
                            {
                                if (parseInt(this.HttpContext.path.params.x) === 0 || parseInt(this.HttpContext.path.params.y) === 0) {
                                    this.HttpContext.path.params.value = "NaN";
                                }
                                else {
                                    this.HttpContext.path.params.op = "*";
                                    x = this.HttpContext.path.params.x;
                                    y = this.HttpContext.path.params.y;
                                    this.HttpContext.path.params.value = parseInt(x) * parseInt(y);
                                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                                }
                                break;
                            }
                        case '/':
                            {
                                if (parseInt(this.HttpContext.path.params.x) === 0 || parseInt(this.HttpContext.path.params.y) === 0) {
                                    this.HttpContext.path.params.value = "NaN";
                                }
                                else {
                                    this.HttpContext.path.params.op = "/";
                                    x = this.HttpContext.path.params.x;
                                    y = this.HttpContext.path.params.y;
                                    this.HttpContext.path.params.value = parseInt(x) / parseInt(y);
                                }
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                                break;
                            }
                        case '%':
                            {
                                if (parseInt(this.HttpContext.path.params.x) === 0 || parseInt(this.HttpContext.path.params.y) === 0) {
                                    this.HttpContext.path.params.value = "NaN";
                                }
                                else {
                                    this.HttpContext.path.params.op = "%";
                                    x = this.HttpContext.path.params.x;
                                    y = this.HttpContext.path.params.y;
                                    this.HttpContext.path.params.value = parseInt(x) % parseInt(y);
                                }
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                                break;
                            }
                        case '!':
                            {
                                if (parseInt(this.HttpContext.path.params.n) === 0) {
                                    this.HttpContext.path.params.value = "NaN";
                                }
                                else {
                                    let n = parseInt(this.HttpContext.path.params.n);
                                    
                                    this.HttpContext.path.params.value = factorial(n);
                                }
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                                break;
                            }
                        case 'p':
                            {
                                if (parseInt(this.HttpContext.path.params.n) === 0) {
                                    this.HttpContext.path.params.value = "NaN";
                                }
                                else {
                                    this.HttpContext.path.params.op = "p";
                                    let n = parseInt(this.HttpContext.path.params.n);
                                    this.HttpContext.path.params.value = isPrime(n);
                                }
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                                break;
                            }
                        case 'np':
                            {
                                if (parseInt(this.HttpContext.path.params.n) === 0) {
                                    this.HttpContext.path.params.value = "NaN";
                                }
                                else {
                                    this.HttpContext.path.params.op = "np";
                                    let n = parseInt(this.HttpContext.path.params.n);
                                    this.HttpContext.path.params.value = findPrime(n);
                                }
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                                break;
                            }
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