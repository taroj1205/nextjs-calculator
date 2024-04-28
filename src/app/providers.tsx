"use client"
import { UIProvider, colorModeManager, extendConfig } from "@yamada-ui/react"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const customConfig = extendConfig({
    initialColorMode: "dark",
  })

  return (
    <UIProvider
      config={customConfig}
      colorModeManager={{ ...colorModeManager }.cookieStorage}
    >
      {children}
    </UIProvider>
  )
}
