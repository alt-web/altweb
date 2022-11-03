import { useRouter } from "next/router"
import useSWR, { useSWRConfig } from "swr"
import { FormEvent } from "react"
import { FiLink, FiX, FiPlus } from "react-icons/fi"
import Button from "../../ui/button"
import { LinksApi } from "../../../pages/api/projects/[id]/links"
import styles from "./links.module.css"

const Links = () => {
    const router = useRouter()
    const { data, error } = useSWR<LinksApi, Error>(
        router.query.id
            ? `/api/projects/${router.query.id.toString()}/links`
            : null
    )
    const { mutate } = useSWRConfig()

    if (error) return <div>error</div>
    if (!data) return <div>loading</div>
    if (!data.links) return <div>server error</div>

    const id = router.query.id ? parseInt(router.query.id.toString()) : -1

    const reload = () => {
        mutate(`/api/projects/${id}/links`)
    }

    return (
        <div className={styles.links}>
            <h4>Ссылки</h4>
            {data.links.map(link => (
                <div key={link.id} className={styles.link}>
                    <FiLink />
                    <a href={link.href} target="_blank" rel="noreferrer">
                        {link.name}
                    </a>
                    <DeleteButton
                        linkId={link.id}
                        projectId={id}
                        onChange={reload}
                    />
                </div>
            ))}
            <form onSubmit={e => submitForm(e, id, reload)}>
                <input placeholder="Имя" name="linkName" required />
                <input placeholder="Url" name="href" required />
                <Button>
                    <FiPlus /> Добавить ссылку
                </Button>
            </form>
        </div>
    )
}

function DeleteButton({
    linkId,
    projectId,
    onChange,
}: {
    linkId: number
    projectId: number
    onChange: () => void
}) {
    return (
        <button
            onClick={() => deleteLink(linkId, projectId, onChange)}
            className={styles.deleteButton}>
            <FiX />
        </button>
    )
}

const deleteLink = async (
    linkId: number,
    projectId: number,
    onSuccess: () => void
) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: linkId }),
    }
    const response = await fetch(`/api/projects/${projectId}/links`, options)
    if (response.status === 200) onSuccess()
}

interface LinkForm extends HTMLFormElement {
    linkName: HTMLInputElement
    href: HTMLInputElement
}

const submitForm = async (e: FormEvent, id: number, onSuccess: () => void) => {
    e.preventDefault()
    const target = e.target as LinkForm
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: target.linkName.value,
            href: target.href.value,
        }),
    }
    const response = await fetch(`/api/projects/${id}/links`, options)
    if (response.status === 200) {
        target.reset()
        onSuccess()
    }
}

export default Links
