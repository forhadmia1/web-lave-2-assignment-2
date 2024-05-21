import z from 'zod';

const variantValidation = z.object({
  type: z.string(),
  value: z.string(),
});

const inventoryValidation = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

export const productValidation = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.string().array(),
  variants: variantValidation.array(),
  inventory: inventoryValidation,
});
