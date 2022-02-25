import { CssColor, hslaToCssColor, rgbaToCssColor } from './CssColor'

export { CssColor } from './CssColor'

export const fromString = (value: string): CssColor | null => {
  return CssColor.getInstanceFromString(value)
}

export const fromHsla = (hue: number, saturation: number, lightness: number, alpha = 1): CssColor => {
  return hslaToCssColor(hue, saturation, lightness, alpha)
}

export const fromRgba = (red: number, green: number, blue: number, alpha = 1): CssColor => {
  return rgbaToCssColor(red, green, blue, alpha)
}
