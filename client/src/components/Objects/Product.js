"use strict";
exports.__esModule = true;
var Product = /** @class */ (function () {
    function Product() {
    }
    Object.defineProperty(Product.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "price", {
        get: function () {
            return this._price;
        },
        set: function (value) {
            this._price = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "promotion", {
        get: function () {
            return this._promotion;
        },
        set: function (value) {
            this._promotion = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "pricePromotion", {
        get: function () {
            return this._pricePromotion;
        },
        set: function (value) {
            this._pricePromotion = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (value) {
            this._description = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "category", {
        get: function () {
            return this._category;
        },
        set: function (value) {
            this._category = value;
        },
        enumerable: true,
        configurable: true
    });
    return Product;
}());
exports.Product = Product;
