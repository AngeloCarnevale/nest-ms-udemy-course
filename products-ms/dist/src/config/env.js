"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().transform((value) => {
        const num = Number(value);
        if (isNaN(num)) {
            throw new Error('Valor deve ser um número válido');
        }
        if (num <= 0) {
            throw new Error('O número deve ser positivo');
        }
        return num;
    }),
    DATABASE_URL: zod_1.z.string().url(),
});
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map