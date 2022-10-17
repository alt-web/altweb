import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"
import { useState, FormEvent } from "react"
import styles from "./auth.module.css"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")

    const router = useRouter()

    const setEmailValue = (v: string) => {
        setEmail(v)
        setMsg("")
    }
    const setPasswordValue = (v: string) => {
        setPassword(v)
        setMsg("")
    }

    const showMessage = (newMsg: string) => {
        setMsg(newMsg)
    }

    const onSuccess = () => {
        router.push("/projects")
    }

    return (
        <div className={styles.container}>
            <h2>Create a free account</h2>

            <form onSubmit={e => submitForm(e, showMessage, onSuccess)}>
                <EmailField value={email} setValue={setEmailValue} />
                <PasswordField value={password} setValue={setPasswordValue} />

                <div className={styles.error}>{msg}</div>

                <button type="submit">Continue</button>
            </form>
        </div>
    )
}

const EmailField = ({
    value,
    setValue,
}: {
    value: string
    setValue: (arg0: string) => void
}) => {
    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const mailFormat =
        "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    const isError = value !== "" && !value.match(mailFormat)

    return (
        <div>
            <EmailIcon />
            <input
                name="email"
                type="email"
                placeholder="Email"
                pattern={mailFormat}
                value={value}
                onChange={handleInputChange}
                required
            />
            {isError && (
                <div className={styles.error}>Please enter a valid email</div>
            )}
        </div>
    )
}

const PasswordField = ({
    value,
    setValue,
}: {
    value: string
    setValue: (arg0: string) => void
}) => {
    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const passwordFormat = "^.{6,}$"
    const isError = value !== "" && !value.match(passwordFormat)

    return (
        <div>
            <LockIcon />
            <input
                name="password"
                type="password"
                placeholder="Password"
                pattern={passwordFormat}
                value={value}
                onChange={handleInputChange}
                required
            />
            {isError && (
                <div className={styles.error}>
                    Password is unsafe or too short
                </div>
            )}
        </div>
    )
}

interface EmailForm extends HTMLFormElement {
    email: HTMLInputElement
    password: HTMLInputElement
}

const submitForm = async (
    e: FormEvent,
    showMessage: (arg0: string) => void,
    onSuccess: () => void
) => {
    e.preventDefault()
    showMessage("")
    const target = e.target as EmailForm

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            email: target.email.value,
            password: target.password.value,
        }),
    }
    const response = await fetch("/api/users", options)
    if (response.status === 200) {
        onSuccess()
    } else {
        const res = await response.json()
        if (res.msg) showMessage(res.msg)
    }
}

export default LoginForm
