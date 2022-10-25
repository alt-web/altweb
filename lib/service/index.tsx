import Paper from "../paper"
import styles from "./service.module.css"

const Service = (props: {
    name: string
    description: string
    price?: number
    perMonth?: boolean
    discount?: number
}) => {
    return (
        <Paper>
            <div className={styles.row}>
                <h2>{props.name.toUpperCase()}</h2>
                <Value
                    price={props.price}
                    perMonth={props.perMonth}
                    discount={props.discount}
                />
            </div>
            <div>{props.description}</div>
        </Paper>
    )
}

const Value = (props: {
    price?: number
    perMonth?: boolean
    discount?: number
}) => {
    if (props.price !== undefined) {
        let price = props.price.toLocaleString("ru") + " ₽"
        if (props.perMonth) price += " / мес"
        if (props.price > 0) return <h2>{price}</h2>
        return <h2 className={styles.greatOffer}>{price}</h2>
    }

    if (props.discount !== undefined) {
        let discount = props.discount + " %"
        return <h2 className={styles.greatOffer}>{discount}</h2>
    }

    return <></>
}

export default Service
