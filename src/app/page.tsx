import { Heading, VStack } from "@yamada-ui/react"
import { Calculator } from "components/calculator"

export default function Home() {
  return (
    <VStack maxW="3xl" mx="auto">
      <Heading>Calculator</Heading>
      <Calculator />
    </VStack>
  )
}
