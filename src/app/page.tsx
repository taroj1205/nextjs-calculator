import { Calculator } from "components/calculator"
import { Heading, VStack } from "@yamada-ui/react"
import type { GetServerSidePropsContext } from "next"

export const getServerSideCommonProps = ({
  req,
}: GetServerSidePropsContext) => {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  }
}

export default function Home() {
  return (
    <VStack maxW="3xl" mx="auto">
      <Heading>Calculator</Heading>
      <Calculator />
    </VStack>
  )
}
