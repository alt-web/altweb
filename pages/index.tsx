import type { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent } from 'react'
import { MailOutlined, RightOutlined } from '@ant-design/icons'
import styles from '../styles/index.module.css'
import Photos from '../lib/photos'

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Alt | Web</title>
            </Head>
            <Photos />
        <div className={styles.title}><span className={styles.alt}>Alt</span> Web</div>
        <div className={styles.slogan}>A new era of web development</div>
        <div className={styles.formContainer}>
            <div className={styles.description}>Create a free account or sign in to an existing one</div>
            <form onSubmit={(e) => submitForm(e)}>
                <MailOutlined />
                <input placeholder="Email" type="email" name="email" required/>
                <button><RightOutlined /></button>
            </form>
        </div>
    </div>
  )
}

interface EmailForm extends HTMLFormElement {
    email: HTMLInputElement
}

const submitForm = async(e: FormEvent) => {
    e.preventDefault()
    const target = e.target as EmailForm
    target.reset()
}

export default Home
