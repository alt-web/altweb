import Script from "next/script"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from "./tracking.module.css"

// Shynet - privacy-friendly web analytics
// https://github.com/milesmcc/shynet
const Tracking = () => {
    const router = useRouter()

    const sendData = () => {
        if (window["Shynet"]) window["Shynet"].newPageLoad()
    }

    useEffect(() => {
        sendData()
    }, [router.asPath, router.locale])

    return (
        <div className={styles.hidden}>
            <Script
                src="https://stats.altweb.tech/ingress/d7eb3ce3-b69e-4fc2-af6d-4b036e14e3d3/script.js"
                onLoad={() => sendData()}
            />
            <noscript>
                <Image
                    width={1}
                    height={1}
                    src="https://stats.altweb.tech/ingress/d7eb3ce3-b69e-4fc2-af6d-4b036e14e3d3/pixel.gif"
                    unoptimized={true}
                    alt="Pixel"
                />
            </noscript>
        </div>
    )
}

export default Tracking

declare global {
    interface Window {
        Shynet: any
    }
}
