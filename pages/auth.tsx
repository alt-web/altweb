import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { withIronSessionSsr } from "iron-session/next"
import Meta from "lib/meta"
import Auth from "lib/auth"
import { sessionOptions } from "lib/session"

const getSession: GetServerSideProps = async context => {
    const isAuthorized = !!context.req.session.user
    if (isAuthorized) return {
        redirect: {
            destination: '/overview',
            permanent: false,
        }
    }
    return { props: {} }
}

export const getServerSideProps = withIronSessionSsr(getSession, sessionOptions)

const LoginPage = () => {
    const router = useRouter()
    return (
        <div>
            <Meta title="Авторизация" />
            <Auth onSuccess={() => router.push("/overview")} />
        </div>
    )
}

export default LoginPage
