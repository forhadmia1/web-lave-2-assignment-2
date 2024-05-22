"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
const product_service_1 = require("../product/product.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const product = yield product_service_1.productService.getSingleProductFromDB(orderData.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        if (product.inventory.quantity < orderData.quantity) {
            return res.status(404).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }
        product.inventory.quantity -= orderData.quantity;
        if (product.inventory.quantity === 0) {
            product.inventory.inStock = false;
        }
        const { _id } = product, rest = __rest(product, ["_id"]);
        yield product_service_1.productService.updateProductById(orderData.productId, rest);
        const zodParsedData = order_validation_1.orderValidationSchema.parse(orderData);
        const result = yield order_service_1.orderServices.createOrderInDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'something went wrong',
            error: error,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryEmail = req.query.email;
        if (queryEmail) {
            const result = yield order_service_1.orderServices.getOrdersByEmailFromDB(queryEmail);
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully for user email!',
                data: result,
            });
        }
        else {
            const result = yield order_service_1.orderServices.getAllOrderFromDB();
            res.status(200).json({
                success: true,
                message: 'Orders fetched successfully!',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'something went wrong',
            error: error,
        });
    }
});
exports.orderController = {
    createOrder,
    getAllOrders,
};
