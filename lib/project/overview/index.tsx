import styles from "./overview.module.css"

const Overview = (props: {name: string, description: string|null, createdAt: Date, approved: boolean}) => {
    return (
        <div className={styles.container}>
            <h4>Project name</h4>
            <input value={props.name} readOnly />
            <h4>Description</h4>
            <input value={props.description ? props.description : undefined} readOnly />
            <h4>Creation date</h4>
            <div>{new Date(props.createdAt).toLocaleString()}</div>
            <h4>Approved?</h4>
            <div>{props.approved ? "Yes" : "No"}</div>
        </div>
    )
}

export default Overview
