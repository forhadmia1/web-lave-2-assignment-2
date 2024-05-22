"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.orderValidationSchema = zod_1.default.object({
    email: zod_1.default.string(),
    productId: zod_1.default.string(),
    price: zod_1.default.number(),
    quantity: zod_1.default.number(),
});
