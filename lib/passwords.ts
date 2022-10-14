import { randomBytes, scryptSync } from "crypto"

export const getSalt = () => {
    return randomBytes(64).toString("hex")
}

export const getHash = (password: string, salt: string) => {
    return scryptSync(password, salt, 128).toString("hex")
}
