import { useState, useEffect } from "react"
import styles from "./title.module.css"

const phrases = [
    "Мы поможем вам оказаться в интернете",
    "Здесь делают интернет",
    "Сеть и настоящий мир — одно и то же",
]

const Title = () => {
    const [phrase, setPhrase] = useState("")

    const selectRandomPhrase = () => {
        let index = Math.floor(Math.random() * phrases.length)
        if (phrases[index] === phrase) index += 1
        if (index === phrases.length) index = 0
        const randomPhrase = phrases[index]
        setPhrase(randomPhrase)
    }

    useEffect(selectRandomPhrase, [])

    return (
        <div className={styles.container}>
            <h1>Alt Web</h1>
            <p className={styles.description} onClick={selectRandomPhrase}>
                {phrase}
            </p>
        </div>
    )
}

export default Title
