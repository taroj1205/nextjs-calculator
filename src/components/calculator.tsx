"use client"
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  HStack,
  NumberInput,
  Text,
  VStack,
  useRadioGroup,
} from "@yamada-ui/react"
import { memo, useEffect, useRef, useState } from "react"
import { add } from "utils/add"
import { divide } from "utils/divide"
import { multiply } from "utils/multiply"
import { subtract } from "utils/subtract"
import { CalcModeSwitcher } from "./calc-mode-switcher"

export const Calculator = memo(() => {
  const [result, setResult] = useState<number | string | null>(null)
  const mode = useRef<"+" | "/" | "-" | "*">("+")
  const [num1, setNum1] = useState<number>(0)
  const [num2, setNum2] = useState<number>(0)
  const handleNumberOneChange = (num: string) => {
    setNum1(Number(num))
  }
  const handleNumberTwoChange = (num: string) => {
    setNum2(Number(num))
  }
  const calculate = (
    currentMode = mode.current,
    firstNum = num1,
    secondNum = num2,
  ) => {
    try {
      let answer = jsCalc()
      switch (currentMode) {
        case "+":
          answer = add(firstNum, secondNum)
          break
        case "-":
          answer = subtract(firstNum, secondNum)
          break
        case "*":
          answer = multiply(firstNum, secondNum)
          break
        case "/":
          answer = divide(firstNum, secondNum)
          break
      }
      setResult(answer)
      return answer
    } catch (error) {
      setResult((error as Error).message)
      return (error as Error).message
    }
  }

  const jsCalc = () => {
    switch (mode.current) {
      case "+":
        return num1 + num2
      case "-":
        return num1 - num2
      case "*":
        return num1 * num2
      case "/":
        return num1 / num2
    }
  }

  useEffect(() => {
    calculate(mode.current, num1, num2)
  }, [calculate, num1, num2])

  return (
    <>
      <HStack flexDir={{ base: "row", md: "column" }}>
        <NumberInput onChange={handleNumberOneChange} />
        <CalcModeSwitcher mode={mode} calculate={calculate} />
        <NumberInput onChange={handleNumberTwoChange} />
        <Button type="submit" onClick={() => calculate()}>
          Calculate
        </Button>
      </HStack>
      {result !== null &&
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
