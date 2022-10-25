import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import bcrypt from "bcrypt"
import { prisma } from "../../lib/prisma"
import { sessionOptions } from "../../lib/session"

export default withIronSessionApiRoute(endpoint, sessionOptions)

async function endpoint(req: NextApiRequest, res: NextApiResponse) {
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
        // Account exists
        if (user) {
            // Check password
            const match = await bcrypt.compare(req.body.password, user.hash)
            if (match) {
                req.session.user = {
                    login: user.email,
                    isAdmin: user.isAdmin,
                }
                await req.session.save()
                res.status(200).json({ msg: "ok" })
            }
            // Password is incorrect
            else throw new Error("Wrong password")
        } else {
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
            req.session.user = {
                login: req.body.email,
                isAdmin: newUser.isAdmin,
            }
            await req.session.save()
            res.status(200).json({ msg: "ok" })
        }
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).json({ msg })
    }
}
