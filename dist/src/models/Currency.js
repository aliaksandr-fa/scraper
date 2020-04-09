"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Currency {
    constructor(code, name, symbol) {
        this.code = code;
        this.name = name;
        this.symbol = symbol;
    }
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    getSymbol() {
        return this.symbol;
    }
}
exports.default = Currency;
//# sourceMappingURL=Currency.js.map