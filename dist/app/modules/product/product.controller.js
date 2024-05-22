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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_validation_1 = require("./product.validation");
const product_service_1 = require("./product.service");
const createNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParsedData = product_validation_1.productValidation.parse(productData);
        const result = yield product_service_1.productService.createProductInDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
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
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryString = req.query.searchTerm;
        if (queryString) {
            const result = yield product_service_1.productService.searchProductFromDB(queryString);
            res.status(200).json({
                success: true,
                message: `Products matching search term '${queryString}' fetched successfully!`,
                data: result,
            });
        }
        else {
            const result = yield product_service_1.productService.getAllProductFromDB();
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
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
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
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
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const result = yield product_service_1.productService.updateProductById(productId, productData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
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
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.productService.deleteProductById(productId);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
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
exports.productController = {
    createNewProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
