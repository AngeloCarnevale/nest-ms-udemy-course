"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
async function main() {
    const products = [];
    for (let i = 0; i < 100; i++) {
        products.push({
            name: faker_1.faker.commerce.productName(),
            price: parseFloat(faker_1.faker.commerce.price()),
        });
    }
    await prisma.product.createMany({
        data: products,
    });
    console.log('Database seed');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map