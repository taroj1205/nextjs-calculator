import { VStack, useRadioGroup } from "@yamada-ui/react"
import { type MutableRefObject, memo } from "react"
import { CalcMode } from "./calc-mode"

export const CalcModeSwitcher = memo(
  ({
    mode,
    calculate,
  }: {
    mode: MutableRefObject<"+" | "/" | "-" | "*">
    calculate: (value?: "+" | "/" | "-" | "*") => void
  }) => {
    const { getContainerProps, getRadioProps } = useRadioGroup<
      "+" | "/" | "-" | "*"
    >({
      defaultValue: "+",
      onChange: (value) => {
        mode.current = value as "+" | "/" | "-" | "*"
        calculate(value)
      },
    })
    return (
      <VStack
        flexDir={{ base: "column", md: "row" }}
        w="inherit"
        gap="sm"
        {...getContainerProps()}
      >
        <CalcMode {...getRadioProps({ value: "+" })} />
        <CalcMode {...getRadioProps({ value: "-" })} />
        <CalcMode {...getRadioProps({ value: "*" })} />
        <CalcMode {...getRadioProps({ value: "/" })} />
      </VStack>
    )
  },
)

CalcModeSwitcher.displayName = "CalcModeSwitcher"
