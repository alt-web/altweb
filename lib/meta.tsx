import Head from "next/head"

const Meta = (props: { title?: string }) => {
    const url = "https://www.altweb.tech"

    let title = "Alt Web"
    if (props.title) title = props.title + " - " + title

    const description =
        "Мы поможем вам оказаться в интернете. Сделаем сайт, настроим сервер и почту, а также поднимем сайт в поисковой выдаче."

    const image = `${url}/preview.png`

    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="www.altweb.tech" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Head>
    )
}

export default Meta
