import { NextApiRequest, NextApiResponse } from "next"

const handle = async (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ ok: true })
}

export default handle
