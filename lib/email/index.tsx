import { ArrowForwardIcon } from "@chakra-ui/icons"
import styles from "./email.module.css"

const EmailForm = () => {
    const mailFormat =
        "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"

    return (
        <div className={styles.container}>
            <form>
                <input placeholder="Email"
                       name="email"
                       pattern={mailFormat}
                       required />
                <button type="submit">
                    <ArrowForwardIcon />
                </button>
            </form>
        </div>
    )
}

export default EmailForm
