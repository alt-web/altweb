import type { NextPage } from "next"
import Head from "next/head"
import LoginForm from "../lib/auth"

const Login: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Login | Alt Web</title>
            </Head>
            <LoginForm />
        </div>
    )
}

export default Login
