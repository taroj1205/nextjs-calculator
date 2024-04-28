import { subtract } from "./subtract"
import { formatNumber, toPositive } from "./format"
import { multiply } from "./multiply"

export const divide = (num1: number, num2: number): number => {
  if (num1 === 0 || num2 === 0) {
    throw new Error("You cannot do division with zero")
  }
  const [int1, dec1] = formatNumber(num1)
  const [int2, dec2] = formatNumber(num2)
  let sign = 1
  if ((num1 < 0 && num2 >= 0) || (num1 >= 0 && num2 < 0)) {
    sign = -1
  }

  const numerator = `${toPositive(int1) === 0 ? "" : int1}${
    dec1 === 0 ? "" : dec1
  }`
  const denominator = `${toPositive(int2) === 0 ? "" : int2}${
    dec2 === 0 ? "" : dec2
  }`

  const decimalPlaces = subtract(
    dec1 === 0 ? 0 : dec1.toString().length,
    dec2 === 0 ? 0 : dec2.toString().length,
  )

  const num = String(numerator)
  const numLength = num.length
  let remainder = 0
  let result = ""
  let i = 0

  while (i < numLength + 6) {
    const digit = i < numLength ? Number(num[i]) : 0

    if (i === numLength) {
      result += "."
    }

    result = result + Math.floor((digit + remainder * 10) / Number(denominator))
    remainder = (digit + remainder * 10) % Number(denominator)
    i++
  }

  const resultWithDecimal =
    decimalPlaces > 0
      ? multiply(Number(result), multiply(decimalPlaces, 10))
      : Number(result)

  return sign * Number(resultWithDecimal)
}
