import { FormControl, FormErrorMessage } from "@chakra-ui/react"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import { Box, Flex } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState, FormEvent } from "react"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")

    const router = useRouter()

    const setEmailValue = (v: string) => {
        setEmail(v)
        setMsg("")
    }
    const setPasswordValue = (v: string) => {
        setPassword(v)
        setMsg("")
    }

    const showMessage = (newMsg: string) => {
        setMsg(newMsg)
    }

    const onSuccess = () => {
        router.push("/shelter")
    }

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap="2em"
            w="100%"
            h="100vh">
            <Heading>Create a free account</Heading>

            <form onSubmit={e => submitForm(e, showMessage, onSuccess)}>
                <EmailField value={email} setValue={setEmailValue} />
                <PasswordField value={password} setValue={setPasswordValue} />

                <Box color="red">{msg}</Box>

                <Button type="submit" maxW="274px" w="100%">
                    Continue
                </Button>
            </form>
        </Flex>
    )
}

const EmailField = ({
    value,
    setValue,
}: {
    value: string
    setValue: (arg0: string) => void
}) => {
    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const mailFormat =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const isError = value !== "" && !value.match(mailFormat)

    return (
        <FormControl isRequired isInvalid={isError} marginBottom="1em">
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.300" />
                </InputLeftElement>
                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    variant="filled"
                    value={value}
                    onChange={handleInputChange}
                />
            </InputGroup>
            <FormErrorMessage>Please enter a valid email</FormErrorMessage>
        </FormControl>
    )
}

const PasswordField = ({
    value,
    setValue,
}: {
    value: string
    setValue: (arg0: string) => void
}) => {
    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const isError =
        (value.length > 0 && value.length < 6) ||
        ["123456", "qwerty"].includes(value)

    return (
        <FormControl isRequired isInvalid={isError} marginBottom="1em">
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    variant="filled"
                    value={value}
                    onChange={handleInputChange}
                />
            </InputGroup>
            <FormErrorMessage>Password is unsafe or too short</FormErrorMessage>
        </FormControl>
    )
}

interface EmailForm extends HTMLFormElement {
    email: HTMLInputElement
    password: HTMLInputElement
}

const submitForm = async (
    e: FormEvent,
    showMessage: (arg0: string) => void,
    onSuccess: () => void
) => {
    e.preventDefault()
    showMessage("")
    const target = e.target as EmailForm

    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            email: target.email.value,
            password: target.password.value,
        }),
    }
    const response = await fetch("/api/users", options)
    if (response.status === 200) {
        onSuccess()
    } else {
        const res = await response.json()
        if (res.msg) showMessage(res.msg)
    }
}

export default LoginForm
