import { rgbaToHsla, hslaToRgba, rgbaToHex } from '../numberConverter'
import { CssColor } from '../CssColor'

const testData = [
  { rgb: { red: 234, green: 109, blue: 216 }, hsl: { hue: 309, saturation: 74.9, lightness: 67.3 }, hex: 'ea6dd8', hexAlpha: '80', alpha: 0.5 },
  { rgb: { red: 121, green: 7, blue: 174 }, hsl: { hue: 281, saturation: 92.3, lightness: 35.5 }, hex: '7907ae', hexAlpha: '54', alpha: 0.33 },
  { rgb: { red: 26, green: 52, blue: 137 }, hsl: { hue: 226, saturation: 68.1, lightness: 32 }, hex: '1a3489', hexAlpha: 'e8', alpha: 0.91 }
]

const roundingError = 1
const roundingErrorHex = 1

const f = (string: string | undefined, expected: string, i: number) => {
  if (!string) return

  for (let j = 0; j < string.length; j++) {
    test('rgbaToHex ' + i + ' pos: ' + j, () => {
      const code = string.charCodeAt(j)
      if (Number.isNaN(Number(string.charAt(j)))) {
        if (code > 97) {
          expect(code).toBeGreaterThanOrEqual(expected.charCodeAt(j) - roundingErrorHex)
        } else {
          expect(code).toBeGreaterThanOrEqual(expected.charCodeAt(j))
        }
        if (code < 102) {
          expect(code).toBeLessThanOrEqual(expected.charCodeAt(j) + roundingErrorHex)
        } else {
          expect(code).toBeLessThanOrEqual(expected.charCodeAt(j))
        }
      } else {
        if (code > 48) {
          expect(code).toBeGreaterThanOrEqual(expected.charCodeAt(j) - roundingErrorHex)
        } else {
          expect(code).toBeGreaterThanOrEqual(expected.charCodeAt(j))
        }
        if (code < 57) {
          expect(code).toBeLessThanOrEqual(expected.charCodeAt(j) + roundingErrorHex)
        } else {
          expect(code).toBeLessThanOrEqual(expected.charCodeAt(j))
        }
      }
    })
  }
}

for (let i: number = 0; i < testData.length; i++) {
  const { rgb, hsl } = testData[i]
  const result = rgbaToHsla(rgb.red, rgb.green, rgb.blue)

  test('rgbaToHsla hue ' + i, () => {
    expect(result.hue).toBeLessThanOrEqual(hsl.hue + roundingError)
    expect(result.hue).toBeGreaterThanOrEqual(hsl.hue - roundingError)
  })

  test('rgbaToHsla saturation ' + i, () => {
    expect(result.saturation).toBeLessThanOrEqual(hsl.saturation + roundingError)
    expect(result.saturation).toBeGreaterThanOrEqual(hsl.saturation - roundingError)
  })

  test('rgbaToHsla lightness ' + i, () => {
    expect(result.lightness).toBeLessThanOrEqual(hsl.lightness + roundingError)
    expect(result.lightness).toBeGreaterThanOrEqual(hsl.lightness - roundingError)
  })

  let hex = rgbaToHex(rgb.red, rgb.green, rgb.blue).toLocaleLowerCase()
  f(hex, testData[i].hex, i)

  hex = rgbaToHex(rgb.red, rgb.green, rgb.blue).toLocaleLowerCase()
  f(hex, testData[i].hex + testData[i].hexAlpha, i)
}

for (let i: number = 0; i < testData.length; i++) {
  const { rgb, hsl, hex, hexAlpha, alpha } = testData[i]
  const result = hslaToRgba(hsl.hue, hsl.saturation, hsl.lightness)

  test('hslaToRgba red ' + i, () => {
    expect(result.red).toBeLessThanOrEqual(rgb.red + roundingError)
    expect(result.red).toBeGreaterThanOrEqual(rgb.red - roundingError)
  })

  test('hslaToRgba green ' + i, () => {
    expect(result.green).toBeLessThanOrEqual(rgb.green + roundingError)
    expect(result.green).toBeGreaterThanOrEqual(rgb.green - roundingError)
  })

  test('hslaToRgba blue ' + i, () => {
    expect(result.blue).toBeLessThanOrEqual(rgb.blue + roundingError)
    expect(result.blue).toBeGreaterThanOrEqual(rgb.blue - roundingError)
  })

  const instance = CssColor.getInstanceFromString(`rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`)

  test('CssColor rgb red ' + i, () => {
    expect(instance?.red).toBeLessThanOrEqual(rgb.red)
    expect(instance?.red).toBeGreaterThanOrEqual(rgb.red)
  })

  test('CssColor rgb green ' + i, () => {
    expect(instance?.green).toBeLessThanOrEqual(rgb.green)
    expect(instance?.green).toBeGreaterThanOrEqual(rgb.green)
  })

  test('CssColor rgb blue ' + i, () => {
    expect(instance?.blue).toBeLessThanOrEqual(rgb.blue)
    expect(instance?.blue).toBeGreaterThanOrEqual(rgb.blue)
  })

  test('CssColor rgb hue ' + i, () => {
    expect(instance?.hue).toBeLessThanOrEqual(hsl.hue + roundingError)
    expect(instance?.hue).toBeGreaterThanOrEqual(hsl.hue - roundingError)
  })

  test('CssColor rgb saturation ' + i, () => {
    expect(instance?.saturation).toBeLessThanOrEqual(hsl.saturation + roundingError)
    expect(instance?.saturation).toBeGreaterThanOrEqual(hsl.saturation - roundingError)
  })

  test('CssColor rgb lightness ' + i, () => {
    expect(instance?.lightness).toBeLessThanOrEqual(hsl.lightness + roundingError)
    expect(instance?.lightness).toBeGreaterThanOrEqual(hsl.lightness - roundingError)
  })

  f(instance?.hexString.toLocaleLowerCase(), '#' + testData[i].hex, i)

  const instance2 = CssColor.getInstanceFromString(`hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`)

  test('CssColor hsl red ' + i, () => {
    expect(instance2?.red).toBeLessThanOrEqual(rgb.red + roundingError)
    expect(instance2?.red).toBeGreaterThanOrEqual(rgb.red - roundingError)
  })

  test('CssColor hsl green ' + i, () => {
    expect(instance2?.green).toBeLessThanOrEqual(rgb.green + roundingError)
    expect(instance2?.green).toBeGreaterThanOrEqual(rgb.green - roundingError)
  })

  test('CssColor hsl blue ' + i, () => {
    expect(instance2?.blue).toBeLessThanOrEqual(rgb.blue + roundingError)
    expect(instance2?.blue).toBeGreaterThanOrEqual(rgb.blue - roundingError)
  })

  test('CssColor hsl hue ' + i, () => {
    expect(instance2?.hue).toBeLessThanOrEqual(hsl.hue)
    expect(instance2?.hue).toBeGreaterThanOrEqual(hsl.hue)
  })

  test('CssColor hsl saturation ' + i, () => {
    expect(instance2?.saturation).toBeLessThanOrEqual(hsl.saturation)
    expect(instance2?.saturation).toBeGreaterThanOrEqual(hsl.saturation)
  })

  test('CssColor hsl lightness ' + i, () => {
    expect(instance2?.lightness).toBeLessThanOrEqual(hsl.lightness)
    expect(instance2?.lightness).toBeGreaterThanOrEqual(hsl.lightness)
  })

  f(instance2?.hexString.toLocaleLowerCase(), '#' + hex, i)

  const instance3 = CssColor.getInstanceFromString(`#${hex}`)

  test('CssColor hex red ' + i, () => {
    expect(instance3?.red).toBeLessThanOrEqual(rgb.red + roundingError)
    expect(instance3?.red).toBeGreaterThanOrEqual(rgb.red - roundingError)
  })

  test('CssColor hex green ' + i, () => {
    expect(instance3?.green).toBeLessThanOrEqual(rgb.green + roundingError)
    expect(instance3?.green).toBeGreaterThanOrEqual(rgb.green - roundingError)
  })

  test('CssColor hex blue ' + i, () => {
    expect(instance3?.blue).toBeLessThanOrEqual(rgb.blue + roundingError)
    expect(instance3?.blue).toBeGreaterThanOrEqual(rgb.blue - roundingError)
  })

  test('CssColor hex hue ' + i, () => {
    expect(instance3?.hue).toBeLessThanOrEqual(hsl.hue + roundingError)
    expect(instance3?.hue).toBeGreaterThanOrEqual(hsl.hue - roundingError)
  })

  test('CssColor hex saturation ' + i, () => {
    expect(instance3?.saturation).toBeLessThanOrEqual(hsl.saturation + roundingError)
    expect(instance3?.saturation).toBeGreaterThanOrEqual(hsl.saturation - roundingError)
  })

  test('CssColor hex lightness ' + i, () => {
    expect(instance3?.lightness).toBeLessThanOrEqual(hsl.lightness + roundingError)
    expect(instance3?.lightness).toBeGreaterThanOrEqual(hsl.lightness - roundingError)
  })

  f(instance3?.hexString?.toLocaleLowerCase(), '#' + testData[i].hex, i)

  const instance4 = CssColor.getInstanceFromString(`#${hex}${hexAlpha}`)
  test('CssColor hex alpha ' + i, () => {
    expect(instance4?.alpha).toBe(alpha)
  })

  const resultAlpha = rgbaToHex(rgb.red, rgb.green, rgb.blue, alpha)
  f(resultAlpha.toLocaleLowerCase(), hex + hexAlpha, i)

  const instance5 = CssColor.getInstanceFromString(`hsla(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%, ${alpha})`)

  f(instance5?.hexString.toLocaleLowerCase(), '#' + hex + hexAlpha, i)

  const instance6 = CssColor.getInstanceFromString(`rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${alpha})`)
  f(instance6?.hexString.toLocaleLowerCase(), '#' + hex + hexAlpha, i)
}
