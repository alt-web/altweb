import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import bcrypt from "bcrypt"
import { prisma } from "lib/prisma"
import { sessionOptions } from "lib/session"
import { getErrorMessage } from "lib/error"

// Authorizes an existing user

export default withIronSessionApiRoute(checkRequestMethod, sessionOptions)

async function checkRequestMethod(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") await authorizeUser(req, res)
    else res.status(405).json({ msg: "Method is not supported" })
}

const authorizeUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.body.email) throw new Error("Please provide valid email")
        if (!req.body.password) throw new Error("Please provide valid password")

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        })

        // Account doesn't exist
        if (!user) throw new Error("Check your email")

        // Account exists, check password
        const match = await bcrypt.compare(req.body.password, user.hash)
        if (!match) throw new Error("Check your password")

        // Save session in cookie
        req.session.user = {
            login: user.email,
            isAdmin: user.isAdmin,
        }
        await req.session.save()

        // Send response
        res.status(200).json({ msg: "ok" })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
