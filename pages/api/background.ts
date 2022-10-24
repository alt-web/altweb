import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../lib/prisma"

export type BackgroundApi = {
    url: string
    blurHash: string,
    color: string
}

const getBackground = async(req: NextApiRequest, res: NextApiResponse<BackgroundApi>) => {
    try {
        const clientId = await getToken()
        if (!clientId) throw new Error("Token is undefined")
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${clientId.value}&orientation=landscape&topics=wallpapers`)
        const result = await response.json()
        res.json({ url: result.urls.regular, blurHash: result.blur_hash, color: result.color })
    }
    catch {
        // Return default background if something went wrong
        res.json({ url: "/bg.webp", blurHash: "L02htFxBRh#p^8s.WVNa+vjbs:kD", color: "#08071b" })
    }
}

const getToken = async() => {
    const clientId = await prisma.token.findUnique({
        where: {
            id: "UNSPLASH_CLIENT_ID"
        }
    })
    return clientId
}

export default getBackground
