"use strict";
exports.__esModule = true;
var Category = /** @class */ (function () {
    function Category() {
    }
    Object.defineProperty(Category.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "products", {
        get: function () {
            return this._products;
        },
        set: function (value) {
            this._products = value;
        },
        enumerable: true,
        configurable: true
    });
    return Category;
}());
exports.Category = Category;
