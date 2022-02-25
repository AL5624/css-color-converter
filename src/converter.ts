const positivModulo = (n: number, modulo: number) => {
  return ((n % modulo) + modulo) % modulo
}

export const roundToDecimal = (n: number, decimal: number) => {
  const c = Math.pow(10, decimal)
  return Math.round(n * c) / c
}

export const rgbaToHsla = (red: number, green: number, blue: number, alpha = 1): Required<{ hue: number; saturation: number; lightness: number; alpha: number }> => {
  (red = red / 255), (green = green / 255), (blue = blue / 255)

  const max: number = Math.max(red, green, blue),
    min: number = Math.min(red, green, blue)

  let hue = 0,
    saturation: number,
    lightness: number = (max + min) / 2

  if (max === min) {
    /* achromatic */
    hue = saturation = 0
  }
  else {
    const dif: number = max - min
    saturation = dif / (1 - Math.abs(2 * lightness - 1))
    switch (max) {
    case red:
      hue = 60 * (((green - blue) / dif) % 6)
      break
    case green:
      hue = 60 * ((blue - red) / dif + 2)
      break
    case blue:
      hue = 60 * ((red - green) / dif + 4)
    }
  }

  hue = Math.round(positivModulo(hue, 361))
  saturation = roundToDecimal(saturation * 100, 1)
  lightness = roundToDecimal(lightness * 100, 1)

  return { hue, saturation, lightness, alpha }
}

export const rgbaToHex = (red: number, green: number, blue: number, alpha = 1): string => {
  const toHex = (value: number): string => {
    const hexString = (Math.round(value) % 256).toString(16)
    return hexString.length === 1 ? '0' + hexString : hexString
  }

  const hex: string = toHex(red) + toHex(green) + toHex(blue) + (alpha !== 1 ? toHex(alpha * 255) : '')

  return hex
}

export const hslaToRgba = (hue: number, saturation: number, lightness: number, alpha = 1): Required<{ red: number; green: number; blue: number; alpha: number }> => {
  const s = positivModulo(saturation, 101) / 100
  const l = positivModulo(lightness, 101) / 100
  const h = positivModulo(hue, 361)

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let { red, green, blue } = (() => {
    if (h >= 0 && h < 60) {
      return { red: c, green: x, blue: 0 }
    }
    else if (h >= 60 && h < 120) {
      return { red: x, green: c, blue: 0 }
    }
    else if (h >= 120 && h < 180) {
      return { red: 0, green: c, blue: x }
    }
    else if (h >= 180 && h < 240) {
      return { red: 0, green: x, blue: c }
    }
    else if (h >= 240 && h < 300) {
      return { red: x, green: 0, blue: c }
    }

    return { red: c, green: 0, blue: x }
  })()

  red = Math.round((red + m) * 255)
  green = Math.round((green + m) * 255)
  blue = Math.round((blue + m) * 255)

  return { red, green, blue, alpha }
}

export const hslaToHex = (hue: number, saturation: number, lightness: number, alpha = 1): string => {
  const { red, green, blue } = hslaToRgba(hue, saturation, lightness)
  return rgbaToHex(red, green, blue, alpha)
}

export const hexToRgba = (hex: number): Required<{ red: number; green: number; blue: number; alpha: number }> => {
  const hexArray: Array<string> = []
  const hexString = hex.toString(16)
  for (let i = 0; i < hexString.length; i += 2) {
    hexArray.push(hexString.substring(i, i + 2))
    if (i >= 8) {break}
  }

  const rgb: Array<number> = []

  for (const v of hexArray) {
    const value: number = parseInt(v, 16)
    rgb.push(Math.round(value))
  }

  return { red: rgb[0] || 0, green: rgb[1] || 0, blue: rgb[2] || 0, alpha: (rgb[3] && (rgb[3] % 256) / 256) || 1 }
}

export const hexToHsla = (hex: number): Required<{ hue: number; saturation: number; lightness: number; alpha: number }> => {
  const { red, green, blue, alpha } = hexToRgba(hex)

  return rgbaToHsla(red, green, blue, alpha)
}