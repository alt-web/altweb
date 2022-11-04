import useSWR, { useSWRConfig } from "swr"
import { FormEvent } from "react"
import { useRouter } from "next/router"
import Paper from "../../../lib/paper"
import { PaymentsApi } from "../../api/projects/[id]/payments"
import styles from "../../../styles/payments.module.css"

const Payments = () => {
    const router = useRouter()
    const { data, error } = useSWR<PaymentsApi, Error>(
        router.query.id
            ? `/api/projects/${router.query.id.toString()}/payments`
            : null
    )

    const { mutate } = useSWRConfig()

    if (error) return <div>Error</div>
    if (!data) return <div>Loading</div>
    if (!data.payments) return <div>Server error</div>

    const id = router.query.id ? parseInt(router.query.id.toString()) : -1

    const reload = () => {
        mutate(`/api/projects/${id}/payments`)
    }

    return (
        <div className={styles.container}>
            <h4>Платежи</h4>
            {data.payments.map(payment => (
                <Paper key={payment.id}>
                    <div className={styles.row}>
                        <div>{payment.serviceName.toUpperCase()}</div>
                        <div>{payment.price}₽</div>
                    </div>
                    <div>
                        Статус: {payment.isPaid ? "оплачен" : "не оплачен"}
                    </div>
                    {data.isAdmin && (
                        <button
                            onClick={() => deletePayment(payment.id, reload)}>
                            Delete
                        </button>
                    )}
                </Paper>
            ))}
            {data.payments.length === 0 && <div>Нет информации о платежах</div>}
            <div className={styles.note}>
                На обработку платежа может уйти некоторое время. Не волнуйтесь,
                если статус не изменился сразу после оплаты.
            </div>
            {data.isAdmin && (
                <form onSubmit={e => submitForm(e, id, reload)}>
                    <input
                        placeholder="Service name"
                        name="serviceName"
                        required
                    />
                    <input
                        placeholder="Price"
                        type="number"
                        name="price"
                        required
                    />
                    <input type="submit" />
                </form>
            )}
        </div>
    )
}

const deletePayment = async (paymentId: number, onSuccess: () => void) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: paymentId }),
    }
    const response = await fetch("/api/projects/0/payments", options)
    if (response.status === 200) onSuccess()
}

interface PaymentForm extends HTMLFormElement {
    serviceName: HTMLInputElement
    price: HTMLInputElement
}

const submitForm = async (e: FormEvent, id: number, onSuccess: () => void) => {
    e.preventDefault()
    const target = e.target as PaymentForm
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: target.serviceName.value,
            price: parseInt(target.price.value),
        }),
    }
    const response = await fetch(`/api/projects/${id}/payments`, options)
    if (response.status === 200) onSuccess()
}

export default Payments
