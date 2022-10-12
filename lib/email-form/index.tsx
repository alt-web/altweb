import { FormEvent } from "react"
import { MailOutlined, RightOutlined } from "@ant-design/icons"
import styles from "./form.module.css"

const EmailForm = () => {
    return (
        <div className={styles.container}>
            <div className={styles.description}>
                Create a free account or sign in to an existing one
            </div>
            <form onSubmit={e => submitForm(e)}>
                <MailOutlined />
                <input placeholder="Email" type="email" name="email" required />
                <button>
                    <RightOutlined />
                </button>
            </form>
        </div>
    )
}

interface EmailForm extends HTMLFormElement {
    email: HTMLInputElement
}

const submitForm = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as EmailForm
    target.reset()
}

export default EmailForm
