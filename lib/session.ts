import { randomBytes } from "crypto"
import { prisma } from "./prisma"

// Iron-session settings and utils

const getCookiePass = async () => {
    // Use cached version
    if (global.cookiePass) return global.cookiePass

    // Load password from db
    const pass = await prisma.cookiePassword.findFirst({
        orderBy: {
            createdAt: "desc",
        },
    })

    // Password was requested for the first time
    if (!pass) {
        const newPass = await prisma.cookiePassword.create({
            data: {
                value: randomBytes(20).toString("hex"),
            },
        })
        if (!newPass) throw new Error("Can't generate password for cookie")

        // Save password in "cache"
        global.cookiePass = newPass.value
        return newPass.value
    }

    // Save password in "cache"
    global.cookiePass = pass.value
    return pass.value
}

export const sessionOptions = async () => {
    return {
        password: await getCookiePass(),
        cookieName: "altweb-auth",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    }
}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
    interface IronSessionData {
        user?: User
    }
}

declare global {
    var cookiePass: string
}

type User = {
    login: string
    isAdmin: boolean
}
