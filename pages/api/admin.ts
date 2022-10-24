import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import bcrypt from "bcrypt"
import { prisma } from "../../lib/prisma"
import { sessionOptions } from "../../lib/session"
import { getErrorMessage } from "../../lib/error"

export default withIronSessionApiRoute(loginApi, sessionOptions)

async function loginApi (req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'POST') {
            res.status(405).json({ msg: "Method not avaiable" })
            return
        }

        if (!req.body.login) throw new Error("Login is undefined")
        if (!req.body.password) throw new Error("Password is undefined")
        
        // Try to find user
        const user = await prisma.admin.findUnique({
            where: {
                login: req.body.login
            }
        })

        // Create default account
        // with provided password
        if (!user && req.body.login === 'altweb') {
            const saltRounds = 10
            const hash = await bcrypt.hash(req.body.password, saltRounds)
            const newUser = await prisma.admin.create({
                data: {
                    login: req.body.login,
                    hash: hash
                }
            })
            if (!newUser) throw new Error("Can't create new user")
        }

        // Account was not found
        if (!user && req.body.login !== 'altweb')
            throw new Error("Account doesn't exist")

        // Account exists, check password
        else if (user) {
            const match = await bcrypt.compare(req.body.password, user.hash)
            if (!match) throw new Error("Wrong password")
        }

        // All checks passed, authorize user
        req.session.user = {
            login: req.body.login,
            isAdmin: true
        }

        await req.session.save()

        res.json({ msg: "ok" })
    }
    catch(err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
