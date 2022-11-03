import { useState, ChangeEvent } from "react"
import { FiCheckCircle, FiLoader, FiAlertCircle } from "react-icons/fi"
import styles from "./overview.module.css"

const Overview = (props: {
    id: number
    name: string
    description: string | null
    createdAt: Date
    approved: boolean
    isAdmin?: boolean
}) => {
    return (
        <div className={styles.container}>
            <h4>Название</h4>
            <Property
                name="name"
                initialValue={props.name}
                placeholder="Название проекта"
                projectId={props.id}
            />

            <h4>Описание</h4>
            <Property
                name="description"
                initialValue={props.description}
                placeholder="Описание проекта. Например: интернет-магазин компании Alt Web"
                projectId={props.id}
            />

            <h4>Дата создания</h4>
            <div>{new Date(props.createdAt).toLocaleString()}</div>

            <h4>Статус проекта?</h4>
            <div>{props.approved ? "Одобрен" : "Не одобрен"}</div>
            {props.approved === false && props.isAdmin && (
                <button onClick={() => approveProject(props.id)}>
                    Approve
                </button>
            )}
        </div>
    )
}

const approveProject = async (id: number) => {
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ name: "approved", value: true }),
    }

    await fetch(`/api/projects/${id}`, options)
}

type States = "idle" | "saving" | "saved" | "error"

const Property = (props: {
    projectId: number
    name: string
    initialValue: string | null
    placeholder: string
}) => {
    const [value, setValue] = useState(
        props.initialValue ? props.initialValue : ""
    )
    const [state, setState] = useState<States>("idle")
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined)

    const updateState = (v: States) => setState(v)

    const handleInputEvent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
        setState("idle")
        clearTimeout(timeoutId)
        const newTimeoutId = window.setTimeout(
            () =>
                saveProp(
                    props.projectId,
                    props.name,
                    e.target.value,
                    updateState
                ),
            1000
        )
        setTimeoutId(newTimeoutId)
    }

    return (
        <div className={styles.property}>
            <textarea
                className={styles[props.name]}
                value={value}
                onChange={handleInputEvent}
                placeholder={props.placeholder}
            />
            {state === "saving" && <FiLoader />}
            {state === "saved" && (
                <span className={styles.green}>
                    <FiCheckCircle />
                </span>
            )}
            {state === "error" && (
                <span className={styles.red}>
                    <FiAlertCircle />
                </span>
            )}
        </div>
    )
}

const saveProp = async (
    projectId: number,
    name: string,
    value: string,
    setState: (arg0: States) => void
) => {
    setState("saving")
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, value }),
    }
    const response = await fetch(`/api/projects/${projectId}`, options)
    if (response.status === 200) setState("saved")
    else setState("error")
}

export default Overview
