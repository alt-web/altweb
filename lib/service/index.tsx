import { ReactNode } from "react"
import Paper from "lib/paper"
import styles from "./service.module.css"

const Service = (props: {
    icon: ReactNode
    name: string
    description: string
    price: number
    perMonth?: boolean
}) => {
    return (
        <Paper>
            <div className={styles.row}>
                {props.icon}
                <h2>{props.name.toUpperCase()}</h2>
                <Value price={props.price} perMonth={props.perMonth} />
            </div>
            <div>{props.description}</div>
        </Paper>
    )
}

const Value = (props: {
    price: number
    perMonth?: boolean
    discount?: number
}) => {
    let price = props.price.toLocaleString("ru") + " ₽"
    if (props.perMonth) price += " / мес"

    if (props.price > 0) return <h2>от {price}</h2>
    return <h2 className={styles.greatOffer}>от {price}</h2>
}

export default Service
