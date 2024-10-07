import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().transform((value) => {
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error('Valor deve ser um número válido');
    }
    if (num <= 0) {
      throw new Error('O número deve ser positivo');
    }
    return num;
  }),
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
