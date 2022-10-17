import { FormEvent, ChangeEvent, useState } from "react"
import { Task } from "@prisma/client"
import styles from "./tasks.module.css"

const Tasks = ({
    projectId,
    taskList,
    onUpdate,
}: {
    projectId: number
    taskList: Task[]
    onUpdate: () => void
}) => {
    const listOfTasks = taskList.map(task => (
        <Task
            id={task.id}
            update={onUpdate}
            key={task.id}
            progress={task.progress}>
            {task.title}
        </Task>
    ))
    return (
        <div>
            <form
                onSubmit={e => {
                    submitForm(e, projectId, onUpdate)
                }}>
                <div className={styles.newTask}>
                    <input
                        type="text"
                        name="taskTitle"
                        placeholder="Title"
                        required
                    />
                    <button type="submit">+</button>
                </div>
            </form>
            {listOfTasks}
        </div>
    )
}

const Task = (props: {
    progress: number
    children: string
    id: number
    update: () => void
}) => {
    const [completed, setCompleted] = useState(props.progress === 100)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newState = !completed
        setCompleted(newState)
        if (newState) setProgress(props.id, 100)
        else setProgress(props.id, 0)
    }
    return (
        <div className={styles.task}>
            <input
                type="checkbox"
                checked={completed}
                onChange={handleChange}
            />
            <div className={styles.name}>{props.children}</div>
            <button onClick={() => deleteTask(props.id, props.update)}>
                Delete
            </button>
        </div>
    )
}

const setProgress = async (id: number, progress: number) => {
    const options = {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ progress }),
    }
    const response = await fetch(`/api/tasks/${id}`, options)
}

const deleteTask = async (id: number, update: () => void) => {
    const options = {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
    }
    const response = await fetch(`/api/tasks/${id}`, options)
    if (response.status === 200) update()
}

interface TaskForm extends HTMLFormElement {
    taskTitle: HTMLInputElement
}

const submitForm = async (
    e: FormEvent,
    projectId: number,
    update: () => void
) => {
    e.preventDefault()
    const target = e.target as TaskForm
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: target.taskTitle.value,
            projectId: projectId,
        }),
    }
    const response = await fetch("/api/tasks", options)
    if (response.status === 200) {
        update()
        target.taskTitle.value = ""
    }
}

export default Tasks
