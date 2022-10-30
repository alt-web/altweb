import { useRouter } from "next/router"
import useSWR, { useSWRConfig } from "swr"
import { FormEvent } from "react"
import { LinksApi } from "../../../pages/api/projects/[id]/links"

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
        <div>
            <h4>Ссылки</h4>
            {data.links.map(link => (
                <div key={link.id}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                        {link.name}
                    </a>
                    <button onClick={() => deleteLink(link.id, id, reload)}>
                        Delete
                    </button>
                </div>
            ))}
            <form onSubmit={e => submitForm(e, id, reload)}>
                <input placeholder="Имя" name="linkName" required />
                <input placeholder="Url" name="href" required />
                <input type="submit" />
            </form>
        </div>
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
