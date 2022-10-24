import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { prisma } from "../../lib/prisma"
import { getSalt, getHash } from "../../lib/passwords"
import { sessionOptions } from "../../lib/session"

export default withIronSessionApiRoute(endpoint, sessionOptions)

async function endpoint(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") await createUser(req, res)
    else res.status(400).json({ msg: "Request method is not supported" })
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
        if (user) {
            // Check password
            if (getHash(req.body.password, user.salt) === user.hash) {
                req.session.user = {
                    login: user.email,
                    isAdmin: false
                }
                await req.session.save()
                res.status(200).json({})
            }
            // Password is incorrect
            else {
                throw new Error("Wrong password")
            }
        } else {
            // Create user
            const salt = getSalt()
            const newUser = await prisma.user.create({
                data: {
                    email: req.body.email,
                    salt: salt,
                    hash: getHash(req.body.password, salt),
                },
            })
            if (!newUser) throw new Error("Cannot create user")
            req.session.user = {
                login: req.body.email,
                isAdmin: false
            }
            await req.session.save()
            res.status(200).json({})
        }
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).json({ msg })
    }
}
