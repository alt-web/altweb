import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import bcrypt from "bcrypt"
import { prisma } from "lib/prisma"
import { sessionOptions } from "lib/session"
import { getErrorMessage } from "lib/error"

// Creates a profile

export default withIronSessionApiRoute(checkRequestMethod, sessionOptions)

async function checkRequestMethod(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") await createUser(req, res)
    else res.status(405).json({ msg: "Method is not supported" })
}

const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.body.email) throw new Error("Please provide valid email")
        if (!req.body.password) throw new Error("Please provide valid password")

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        // Account exists
        if (user) throw new Error("Account exists")

        // Create user
        const hash = await bcrypt.hash(req.body.password, 10)
        const newUser = await prisma.user.create({
            data: {
                email: req.body.email,
                hash: hash,
                isAdmin: req.body.email === "admin@altweb.tech",
            },
        })
        if (!newUser) throw new Error("Cannot create user")

        // Save session in cookie
        req.session.user = {
            login: req.body.email,
            isAdmin: newUser.isAdmin,
        }
        await req.session.save()

        // Send response
        res.status(200).json({ msg: "ok" })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
