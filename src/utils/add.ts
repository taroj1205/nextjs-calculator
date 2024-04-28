import { formatNumber } from "./format"
import { subtract } from "./subtract"

export const add = (num1: number, num2: number): number => {
  const [int1, dec1] = formatNumber(num1)
  const [int2, dec2] = formatNumber(num2)

  const minValue = Math.min(num1, num2)
  const maxValue = Math.max(num1, num2)

  if (minValue < 0) {
    return subtract(maxValue, -minValue)
  }

  const intTotal = int1 + int2
  const decTotal = dec1 + dec2

  if (decTotal >= 10) {
    return add(intTotal, decTotal / 10)
  }

  return Number.parseFloat(`${intTotal}.${decTotal}`)
}
