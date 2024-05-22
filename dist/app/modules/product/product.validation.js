"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const variantValidation = zod_1.default.object({
    type: zod_1.default.string(),
    value: zod_1.default.string(),
});
const inventoryValidation = zod_1.default.object({
    quantity: zod_1.default.number(),
    inStock: zod_1.default.boolean(),
});
exports.productValidation = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string(),
    price: zod_1.default.number(),
    category: zod_1.default.string(),
    tags: zod_1.default.string().array(),
    variants: variantValidation.array(),
    inventory: inventoryValidation,
});
