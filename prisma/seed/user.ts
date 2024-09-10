import { PrismaClient } from "@prisma/client";

export default async function generate_user(prismaClient: PrismaClient) {
    console.log("Run user ....")

    await prismaClient.user.create({
        data: {
            email: "meumelhoremail@email.com",
            name: "meu nome de usuario",
            password: "$2b$10$5H5EYiiSLW/XVkPDOtcJ.eSIXFRlQ7MjuhfvvAN5M6cB6a1ZhnCru",
            role: "USER",
        }
    })

    console.clear()
    console.log("Run user .... done")
    return;
}