import useSWR, { useSWRConfig } from 'swr'
import { FormEvent } from "react"
import { TokenApi } from "./api/tokens"

const Admin = () => {
    const {data, error} = useSWR<TokenApi, Error>('/api/tokens')

    const { mutate } = useSWRConfig()

    const refresh = () => {
        mutate("/api/tokens")
    }

    if (error) return <div>Error</div>
    if (!data) return <div>Loading</div>

    return (
        <div>
            <h1>Admin</h1>
            <h3>Tokens</h3>
            { data.tokens.map(token => <div key={token.id}>{token.id}: {token.value.slice(0, 4)}***</div>) }
            <h3>Add new token</h3>
            <form onSubmit={e => sendToken(e, refresh)}>
                <input name="tokenId" required placeholder="Id" />
                <input name="value" required placeholder="Value" />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

interface TokenForm extends HTMLFormElement {
    tokenId: HTMLInputElement
    value: HTMLInputElement
}

const sendToken = async(e: FormEvent, onSuccess: () => void) => {
    e.preventDefault()
    const target = e.target as TokenForm
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: target.tokenId.value, value: target.value.value })
    }
    const response = await fetch("/api/tokens", options)
    if (response.status === 200) onSuccess()
}

export default Admin
