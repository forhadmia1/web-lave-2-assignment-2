"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const orders_route_1 = require("./app/modules/orders/orders.route");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
//cors
app.use((0, cors_1.default)());
//application route
app.use('/api/products', product_route_1.productRoutes);
app.use('/api/orders', orders_route_1.orderRoutes);
//catch undefined route
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
exports.default = app;
