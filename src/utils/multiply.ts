import { add } from "./add"
import { divide } from "./divide"
import { formatNumber, toPositive } from "./format"

export const multiply = (num1: number, num2: number): number => {
  if (num1 === 0 || num2 === 0) {
    return 0
  }

  const [int1, dec1] = formatNumber(num1)
  const [int2, dec2] = formatNumber(num2)
  let sign = 1

  if ((num1 < 0 && num2 >= 0) || (num1 >= 0 && num2 < 0)) {
    sign = -1
  }

  const strNum1 = `${toPositive(int1)}${dec1}`
  const strNum2 = `${toPositive(int2)}${dec2}`

  const decimalPlaces = add(
    dec1 === 0 ? 0 : dec1.toString().length,
    dec2 === 0 ? 0 : dec2.toString().length,
  )

  const result = Array(strNum1.length + strNum2.length).fill(0)
  for (let i = strNum1.length - 1; i >= 0; i--) {
    for (let j = strNum2.length - 1; j >= 0; j--) {
      const product = add(+strNum1[i] * +strNum2[j], result[i + j + 1])
      result[i + j + 1] = product % 10
      result[i + j] = add(result[i + j], (product / 10) | 0)
    }
  }

  const resultStr = Number(result.join(""))

  const resultWithDecimal =
    decimalPlaces > 0
      ? divide(Number(resultStr), 10 ** decimalPlaces)
      : Number(resultStr)

  return sign * Number(resultWithDecimal)
}
