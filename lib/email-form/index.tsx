import { FormControl } from "@chakra-ui/react"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons"
import { Box, Flex } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"

import { useState, FormEvent } from "react"

const EmailForm = () => {
    const [input, setInput] = useState("")
    const handleInputChange = (e: FormEvent<HTMLInputElement>) =>
        setInput(e.currentTarget.value)

    const mailFormat =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    const isError = input !== "" && !input.match(mailFormat)
    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap="2em"
            w="100%"
            h="100vh">
            <Heading>Create a free account</Heading>

            <form onSubmit={e => submitForm(e)}>
                <FormControl isRequired isInvalid={isError}>
                    <Flex align="center" justify="center" gap="1em">
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <EmailIcon color="gray.300" />
                            </InputLeftElement>
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                variant="filled"
                                value={input}
                                onChange={handleInputChange}
                            />
                        </InputGroup>
                        <IconButton
                            type="submit"
                            isDisabled={isError || input === ""}
                            icon={<ArrowForwardIcon />}
                            aria-label="Send"
                        />
                    </Flex>
                </FormControl>
            </form>
        </Flex>
    )
}

interface EmailForm extends HTMLFormElement {
    email: HTMLInputElement
}

const submitForm = async (e: FormEvent) => {
    e.preventDefault()
    const target = e.target as EmailForm
    console.log(target.email)
}

export default EmailForm
