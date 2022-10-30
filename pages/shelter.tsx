import { FormEvent } from "react"
import { useRouter } from "next/router"

const Shelter = () => {
    const router = useRouter()
    const redirect = () => {
        router.push("/admin")
    }
    return (
        <div>
            <h1>Shelter</h1>
            <form onSubmit={e => login(e, redirect)}>
                <input name="login" required placeholder="Login" type="text" />
                <input
                    name="password"
                    required
                    placeholder="Password"
                    type="password"
                />
                <button>Log in</button>
            </form>
        </div>
    )
}

interface LoginForm extends HTMLFormElement {
    login: HTMLInputElement
    password: HTMLInputElement
}

const login = async (e: FormEvent, onSuccess: () => void) => {
    e.preventDefault()
    const target = e.target as LoginForm
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: target.login.value,
            password: target.password.value,
        }),
    }
    const response = await fetch("/api/admin", options)
    if (response.status === 200) onSuccess()
}

export default Shelter
