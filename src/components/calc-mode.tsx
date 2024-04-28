import {
  Box,
  Center,
  type UseRadioGroupReturn,
  ui,
  useRadio,
} from "@yamada-ui/react"
import type { FC } from "react"

export const CalcMode: FC<ReturnType<UseRadioGroupReturn["getRadioProps"]>> = (
  props,
) => {
  const { getInputProps, getIconProps } = useRadio(props)

  return (
    <Center as="label">
      <ui.input {...getInputProps()} />

      <Box
        {...getIconProps()}
        cursor="pointer"
        borderWidth="1px"
        py="xs"
        px="sm"
        rounded="md"
        _checked={{
          bg: "blue.500",
          color: "white",
          borderColor: "blue.500",
        }}
      >
        {props.value}
      </Box>
    </Center>
  )
}
