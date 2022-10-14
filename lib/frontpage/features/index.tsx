import { ReactNode } from "react"
import { Heading, Text, Flex, Box } from "@chakra-ui/react"
import {
    ChatIcon,
    DownloadIcon,
    RepeatIcon,
    SettingsIcon,
} from "@chakra-ui/icons"

const Features = () => {
    return (
        <Flex
            justify="center"
            align="center"
            direction="column"
            gap="2em"
            w="100%"
            h="100vh">
            <Heading>Our features</Heading>
            <Flex maxW="720px" wrap="wrap" gap="1em" justify="space-between">
                <Feature icon={<DownloadIcon />} title="You own everything">
                    You have access to the project&apos;s source code,
                    containers, and databases. You are not tied to our
                    infrastructure and can change your development approach at
                    any time.
                </Feature>
                <Feature icon={<RepeatIcon />} title="Lifetime updates">
                    We will fix vulnerabilities or bugs for free even years
                    later. At the same time our subscription includes updates
                    and changes to the site.
                </Feature>
                <Feature icon={<ChatIcon />} title="Easy communication">
                    Easily communicate with developers in a familiar messenger
                    or on our website. Create tasks and track the progress.
                </Feature>
                <Feature icon={<SettingsIcon />} title="Servers managment">
                    You don&apos;t have to worry about buying a server. You can
                    host your project in our cloud.
                </Feature>
            </Flex>
        </Flex>
    )
}

const Feature = ({
    icon,
    title,
    children,
}: {
    children: ReactNode
    title: string
    icon: ReactNode
}) => {
    return (
        <Flex
            direction="column"
            border="1px solid gray"
            w="100%"
            maxW="350px"
            borderRadius="10px"
            p="1em"
            gap="1em">
            <Flex gap="1em" align="center">
                <Box color="#008465">{icon}</Box>
                <Heading as="h5" size="sm">
                    {title}
                </Heading>
            </Flex>
            <Text>{children}</Text>
        </Flex>
    )
}

export default Features
