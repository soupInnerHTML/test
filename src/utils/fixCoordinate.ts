export default function fixCoordinate(coordinate: string, fractionDigits = 7) {
  return Number(coordinate).toFixed(fractionDigits)
}
