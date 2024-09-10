import { Console } from "console";
import prismaClient from "../prisma-client";
import generate_user from "./user";

async function seeds() {
    console.clear()

    //user
    await generate_user(prismaClient)
}

seeds();