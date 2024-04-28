import { Box, ColorModeScript, Spacer, VStack } from "@yamada-ui/react"
import type { Metadata } from "next"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: {
    default: "taroj1205's calculator",
    template: "%s | taroj1205's calculator",
  },
  description: "taroj1205's calculator",
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  return (
    <html lang={locale}>
      <body>
        <ColorModeScript type="cookie" nonce="testing" />
        <Providers>
          <VStack overflowX="hidden" minH="100svh">
            <Box as="main" p="6" pt={{ base: "6", md: "3" }}>
              {children}
            </Box>
            <Spacer />
          </VStack>
        </Providers>
      </body>
    </html>
  )
}
