"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const user1 = await prisma.user.upsert({
        where: { id: 1 },
        create: {
            name: 'Alice',
            message: 'Hello World',
            createdAt: new Date(),
        },
        update: {},
    });
    const user2 = await prisma.user.upsert({
        where: { id: 2 },
        create: {
            name: 'Bob',
            message: 'Hello World',
            createdAt: new Date(),
        },
        update: {},
    });
    console.log({ user1, user2 });
    const allUsers = await prisma.user.findMany();
    console.log({ allUsers });
}
main()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map