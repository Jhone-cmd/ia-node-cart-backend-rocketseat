import z from 'zod';

// Schema corrigido para evitar o erro "oneOf"
export const answerMessageSchema = z.object({
  message: z.string(),
  action: z.object({
    type: z.enum(['send_message', 'suggest_carts']),
    payload: z
      .object({
        input: z.string(),
      })
      .nullable(),
  }),
});

export const suggestCartsSchema = z.object({
  carts: z.array(
    z.object({
      store_id: z.number(),
      score: z.number(),
      products: z.array(
        z.object({
          id: z.number(),
          quantity: z.number(),
          name: z.string(),
        })
      ),
    })
  ),
  response: z.string(),
});
