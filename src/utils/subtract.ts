import { add } from "./add"
import { formatNumber, toPositive } from "./format"

export const subtract = (num1: number, num2: number): number => {
  const [int1, dec1] = formatNumber(num1)
  const [int2, dec2] = formatNumber(num2)
  if (num2 < 0) {
    return add(num1, -num2)
  }

  const dec1Str = dec1.toString()
  const dec2Str = dec2.toString()

  console.log(Math.max(dec1Str.length, dec2Str.length))

  const digits = 10 ** Math.max(dec1Str.length, dec2Str.length)

  const strNum1 = Number(`${toPositive(int1)}${dec1}`)
  const strNum2 = Number(`${toPositive(int2)}${dec2}`)

  const intTotal = strNum1 - strNum2
  return intTotal / digits
}
