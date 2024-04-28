export const formatNumber = (num: number) => {
  const [int, dec] = num.toString().split(".")
  return [Number(int) || 0, Number(dec) || 0]
}

export const toPositive = (num: number) => {
  return num < 0 ? num * -1 : num
}
