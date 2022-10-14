import { useState, useEffect } from "react"
import { TriangleDownIcon } from "@chakra-ui/icons"
import { Box, Flex } from "@chakra-ui/react"

const ConsoleScreen = () => {
    const [stage, setStage] = useState(1)
    return (
        <Flex
            w="100%"
            h="100vh"
            bgColor="black"
            align="center"
            justify="center"
            direction="column"
            color="white"
            fontFamily="JetBrains Mono"
            fontSize="24px"
            fontWeight="bold">
            <Line onAnimationEnd={() => setStage(2)} isVisible={stage >= 1}>
                Hi!
            </Line>
            <Line onAnimationEnd={() => setStage(3)} isVisible={stage >= 2}>
                Do you want a site?
            </Line>
            <Line onAnimationEnd={() => setStage(4)} isVisible={stage >= 3}>
                We have something for you
            </Line>
            <Triangle isVisible={stage >= 4} />
        </Flex>
    )
}

const Line = ({
    onAnimationEnd,
    isVisible,
    children,
}: {
    onAnimationEnd: () => void
    isVisible: boolean
    children: string
}) => {
    const [sliceEnd, setSliceEnd] = useState(0)

    const baseDelay = 20

    useEffect(() => {
        if (isVisible) {
            if (sliceEnd < children.length) {
                const currentDelay = sliceEnd > 0 ? baseDelay : baseDelay + 1000
                const timeout = setTimeout(() => {
                    setSliceEnd(sliceEnd + 1)
                }, currentDelay)
                return () => clearTimeout(timeout)
            }
            onAnimationEnd()
        }
    }, [isVisible, sliceEnd])

    return (
        <Box w="100%" maxW="400px" h="54px" p="10px">
            {children.slice(0, sliceEnd)}
        </Box>
    )
}

const Triangle = ({ isVisible }: { isVisible: boolean }) => {
    const [color, setColor] = useState("black")

    useEffect(() => {
        if (isVisible) {
            const timeout = setTimeout(() => {
                setColor("white")
            }, 1000)
            return () => clearTimeout(timeout)
        }
    }, [isVisible])

    return (
        <Box marginTop="3em" color={color} transition="color 0.2s ease-in-out">
            <TriangleDownIcon />
        </Box>
    )
}

export default ConsoleScreen
