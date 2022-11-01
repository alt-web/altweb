import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useState, FormEvent } from "react"
import styles from "./auth.module.css"

const Auth = ({ onSuccess }: { onSuccess: () => void }) => {
    const [showError, setShowError] = useState(false)

    const onChange = () => setShowError(false)
    const onFailure = () => setShowError(true)

    return (
        <div className={styles.container}>
            <form onSubmit={e => handleSubmit(e, onSuccess, onFailure)}>
                <input
                    placeholder="Почта"
                    name="email"
                    type="email"
                    onChange={onChange}
                    required
                />
                <input
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    onChange={onChange}
                    required
                />
                {showError && (
                    <div className={styles.error}>Ошибка, проверьте данные</div>
                )}
                <button type="submit">
                    Продолжить <ArrowForwardIcon />
                </button>
            </form>
        </div>
    )
}

interface AuthorizationForm extends HTMLFormElement {
    email: HTMLInputElement
    password: HTMLInputElement
}

const handleSubmit = async (
    e: FormEvent,
    onSuccess: () => void,
    onFailure: () => void
) => {
    e.preventDefault()
    const target = e.target as AuthorizationForm
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: target.email.value,
            password: target.password.value,
        }),
    }
    const response = await fetch("/api/auth", options)
    if (response.status === 200) onSuccess()
    else onFailure()
}

export default Auth
