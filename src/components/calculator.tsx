"use client"
import {
  Button,
  NumberInput,
  HStack,
  Text,
  VStack,
  useRadioGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@yamada-ui/react"
import { memo, useRef, useState } from "react"
import { add } from "utils/add"
import { divide } from "utils/divide"
import { multiply } from "utils/multiply"
import { subtract } from "utils/subtract"
import { CalcMode } from "./calc-mode"

export const Calculator = memo(() => {
  const [result, setResult] = useState<number | string | null>(null)
  const mode = useRef<"+" | "/" | "-" | "*">("+")
  const num1 = useRef<number>(0)
  const num2 = useRef<number>(0)
  const handleNumberOneChange = (num: string) => {
    num1.current = Number(num)
  }
  const handleNumberTwoChange = (num: string) => {
    num2.current = Number(num)
  }
  const calculate = (currentMode = mode.current) => {
    try {
      let answer = jsCalc()
      switch (currentMode) {
        case "+":
          answer = add(num1.current, num2.current)
          break
        case "-":
          answer = subtract(num1.current, num2.current)
          break
        case "*":
          answer = multiply(num1.current, num2.current)
          break
        case "/":
          answer = divide(num1.current, num2.current)
          break
      }
      setResult(answer)
      return answer
    } catch (error) {
      setResult((error as Error).message)
      return (error as Error).message
    }
  }
  const { getContainerProps, getRadioProps } = useRadioGroup<
    "+" | "/" | "-" | "*"
  >({
    defaultValue: "+",
    onChange: (value) => {
      mode.current = value as "+" | "/" | "-" | "*"
      calculate(value)
    },
  })

  const jsCalc = () => {
    switch (mode.current) {
      case "+":
        return num1.current + num2.current
      case "-":
        return num1.current - num2.current
      case "*":
        return num1.current * num2.current
      case "/":
        return num1.current / num2.current
    }
  }

  return (
    <>
      <HStack>
        <NumberInput onChange={handleNumberOneChange} />
        <VStack w="inherit" gap="sm" {...getContainerProps()}>
          <CalcMode {...getRadioProps({ value: "+" })} />
          <CalcMode {...getRadioProps({ value: "-" })} />
          <CalcMode {...getRadioProps({ value: "*" })} />
          <CalcMode {...getRadioProps({ value: "/" })} />
        </VStack>
        <NumberInput onChange={handleNumberTwoChange} />
        <Button onClick={() => calculate()}>Calculate</Button>
      </HStack>
      {num1 !== null &&
        num2 !== null &&
        result !== null &&
        (result === "You cannot do division with zero" ? (
          <Alert status="error" variant="subtle">
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{result}</AlertDescription>
          </Alert>
        ) : (
          <VStack gap="1">
            <Text>Result: {result}</Text>
            <Text>JS Result: {String(jsCalc())}</Text>
          </VStack>
        ))}
    </>
  )
})

Calculator.displayName = "Calculator"
