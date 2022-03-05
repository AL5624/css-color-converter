import { fromHsla, fromRgba } from '.'
import { rgbaToHsla, hslaToRgba, rgbaToHex, roundToDecimal } from './converter'

const error = (type: string, value: string): string => {
  return `cannot parse ${type} "${value}" to CssColor")`
}

const hexStringToCssColor = (hex: string): CssColor => {
  const result = CssColor.hexRegExp.exec(hex)

  if (!result) throw error('hex', hex)

  const r: string | null = result[1]
  const g: string | null = result[2]
  const b: string | null = result[3] || null
  const a: string | null = result[4] || null

  const red: number = parseInt(r, 16)
  const green: number = parseInt(g, 16)
  const blue: number = b ? parseInt(b, 16) : 0
  const alpha: number = a ? roundToDecimal((parseInt(a, 16) % 256) / 256, 2) : 1
  const { hue, saturation, lightness } = rgbaToHsla(red, green, blue)

  return new CssColor({ red, green, blue }, { hue, saturation, lightness }, alpha, hex)
}

const hslaStringToCssColor = (hsla: string): CssColor => {
  const result = CssColor.hslaRegExp.exec(hsla)

  if (!result) throw error('hsla', hsla)

  const h = Number(result[1])
  const s = Number(result[2])
  const l = Number(result[3])
  const a = Number(result[4])

  return hslaToCssColor(h, s, l, a)
}

const hslStringToCssColor = (hsl: string): CssColor => {
  const result = CssColor.hslRegExp.exec(hsl)

  if (!result) {throw error('hsl', hsl)}

  const h = Number(result[1])
  const s = Number(result[2])
  const l = Number(result[3])

  return hslaToCssColor(h, s, l)
}

const rgbaStringToCssColor = (rgba: string): CssColor => {
  const result = CssColor.rgbaRegExp.exec(rgba)

  if (!result) throw error('rgba', rgba)

  const r = Number(result[1])
  const g = Number(result[2])
  const b = Number(result[3])
  const a = Number(result[4])

  return rgbaToCssColor(r, g, b, a)
}

const rgbStringToCssColor = (rgb: string): CssColor => {
  const result = CssColor.rgbRegExp.exec(rgb)

  if (!result) throw error('rgb', rgb)

  const r = Number(result[1])
  const g = Number(result[2])
  const b = Number(result[3])

  return rgbaToCssColor(r, g, b)
}

export const hslaToCssColor = (hue: number, saturation: number, lightness: number, alpha = 1): CssColor => {
  const { red, green, blue } = hslaToRgba(hue, saturation, lightness)
  return new CssColor({ red, green, blue }, { hue, saturation, lightness }, alpha)
}

export const rgbaToCssColor = (red: number, green: number, blue: number, alpha = 1): CssColor => {
  const { hue, saturation, lightness } = rgbaToHsla(red, green, blue)

  return new CssColor({ red, green, blue }, { hue, saturation, lightness }, alpha)
}

class RGB {
  red = 0
  green = 0
  blue = 0
}

class RGBA extends RGB {
  alpha = 1
}

class HSL {
  hue = 0
  saturation = 50
  lightness = 100
}

class HSLA extends HSL {
  alpha = 1
}

const htmlColorNameToCssColor = (value: string): CssColor | null => {
  if (!document || !window) return null
  const div = document.createElement('div')
  document.body.appendChild(div)
  div.style.color = value
  const rgbString = window.getComputedStyle(div).color
  const cssColor = rgbStringToCssColor(rgbString)
  cssColor.htmlColorName = value
  document.body.removeChild(div)
  return cssColor
}

export class CssColor {
  public static hexRegExp = new RegExp('^#?([0-9a-fd]{2})([0-9a-fd]{1,2})([0-9a-fd]{0,2})([0-9a-fd]{0,2})$', 'i')
  public static rgbRegExp = new RegExp('^rgb\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)\\)$', 'i')
  public static rgbaRegExp = new RegExp('^rgba\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)\\)$', 'i')
  public static hslRegExp = new RegExp('^hsl\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)%?,([0-9]*.[0-9]+|[0-9]+)%?\\)$', 'i')
  public static hslaRegExp = new RegExp('^hsla\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)%?,([0-9]*.[0-9]+|[0-9]+)%?,([0-9]*.[0-9]+|[0-9]+)\\)$', 'i')

  public static getInstanceFromString(value: string): CssColor | null {
    value = value.split(' ').join('')
    let cssColor: CssColor | null = null

    try {
      if (value.match(CssColor.hexRegExp)) {
        cssColor = hexStringToCssColor(value)
      }
      else if (value.match(/^rgb\(/)) {
        cssColor = rgbStringToCssColor(value)
      }
      else if (value.match(/^rgba\(/)) {
        cssColor = rgbaStringToCssColor(value)
      }
      else if (value.match(/^hsl\(/)) {
        cssColor = hslStringToCssColor(value)
      }
      else if (value.match(/^hsla\(/)) {
        cssColor = hslaStringToCssColor(value)
      }
      else if (document && window) {
        cssColor = htmlColorNameToCssColor(value)
      }
    }
    catch (e) {
      // tslint:disable-next-line: no-console
      console.warn(e)
    }

    return cssColor
  }

  public constructor(
    rgb?: Partial<RGB> | null,
    hsl?: Partial<HSL> | null,
    alpha = 1,
    hex = '',
    htmlColorName = ''
  ) {
    if (rgb) {
      if (!hsl) {
        Object.assign(this, fromRgba(Number(rgb.red), Number(rgb.green), Number(rgb.blue), alpha))
      }
      else {
        Object.assign(this, rgb)
        Object.assign(this, hsl)
      }
    }
    else if (hsl) {
      Object.assign(this, fromHsla(Number(hsl.hue), hsl.saturation || this.saturation, hsl.lightness || this.lightness, alpha))
    }
    else if (hex) {
      Object.assign(this, hexStringToCssColor(hex))
    }
    else if (htmlColorName) {
      Object.assign(this, htmlColorNameToCssColor(htmlColorName))
    }

    this.alpha = alpha
    this.hex = hex || '#' + rgbaToHex(this.red, this.green, this.blue, this.alpha)
    this.htmlColorName = htmlColorName
  }

  public htmlColorName = ''
  /**
   * sets htmlColorName to the new value and re-calculates "hsl-values", "rgb-values" and "alpha" (if correct string)
   */
  public setHtmlColorName(value: string) {
    this.htmlColorName = value
    this.fromHtmlColorName()
  }

  /**
   * re-calculates "hsl-values", "rgb-values" and "alpha" based on htmlColorName
   */
  public fromHtmlColorName() {
    Object.assign(this, htmlColorNameToCssColor(this.htmlColorName) || {})
  }

  public hex = ''
  /**
   * sets hex to the new value (if it matches hexRegExp) and re-calculates "hsl-values", "rgb-values" and "alpha"
   * @param value new hex value
   */
  public setHex(value: string) {
    if (value.match(CssColor.hexRegExp)) {
      this.hex = value
      this.fromHex()
    }
  }

  public get hexString(): string {
    return (this.hex.charAt(0) !== '#' ? '#' : '') + this.hex
  }

  public toHexString(): string {
    return this.hexString
  }

  /**
   * re-calculates "hsl-values", "rgb-values" and "alpha" based on "hex"
   */
  public fromHex() {
    try {
      Object.assign(this, hexStringToCssColor(this.hexString))
    }
    catch(e) {
      //
    }
  }

  public red = 0
  /**
   * sets red to the new value and re-calculates "hsl-values" and "hex"
   */
  public setRed(value: number) {
    this.red = value
    this.fromRgba()
  }

  public green = 0
  /**
   * sets green to the new value and re-calculates "hsl-values" and "hex"
   */
  public setGreen(value: number) {
    this.green = value
    this.fromRgba()
  }

  public blue = 0
  /**
   * sets blue to the new value and re-calculates "hsl-values" and "hex"
   */
  public setBlue(value: number) {
    this.blue = value
    this.fromRgba()
  }

  /**
   * sets the new RGB values and re-calculates "hsl-values" and "hex"
   * @param rgb - RGB = { red: number, green: number, blue: number, alpha: number }
   */
  public setRgb(rgb: Partial<RGB>) {
    this.setRgba(rgb)
  }

  /**
   * sets the new RGBA values and re-calculates "hsl-values" and "hex"
   * @param rgba - RGBA = { red: number, green: number, blue: number, alpha: number }
   */
  public setRgba(rgba: Partial<RGBA>) {
    Object.assign(this, rgba)
    this.fromRgba()
  }

  /**
   * re-calculates "hsl-values" and "hex" based on "rgb-values" and "alpha"
   */
  public fromRgb() {
    this.fromRgba()
  }

  /**
   * re-calculates "hsl-values" and "hex" based on "rgb-values" and "alpha"
   */
  public fromRgba() {
    Object.assign(this, fromRgba(this.red, this.green, this.blue, this.alpha))
  }

  public hue = 0
  /**
   * sets hue to the new value and re-calculates "rgb-values" and "hex"
   */
  public setHue(value: number) {
    this.hue = value
    this.fromHsla()
  }
  public saturation = 100
  /**
   * sets saturation to the new value and re-calculates "rgb-values" and "hex"
   */
  public setSaturation(value: number) {
    this.saturation = value
    this.fromHsla()
  }
  public get saturationString(): string {
    return this.saturation + '%'
  }
  /**
   * sets lightness to the new value and re-calculates "rgb-values" and "hex"
   */
  public lightness = 50
  public setLightness(value: number) {
    this.lightness = value
    this.fromHsla()
  }
  public get lightnessString() {
    return this.lightness + '%'
  }

  /**
   * sets the new HSL values and re-calculates "rgb-values" and "hex"
   * @param hsl HSL = { hue: number, saturation: number, lightness: number }
   */
  public setHsl(hsl: Partial<HSL>) {
    this.setHsla(hsl)
  }

  /**
   * sets the new HSLA values and re-calculates "rgb-values" and "hex"
   * @param hsla HSLA = { hue: number, saturation: number, lightness: number, alpha: number }
   */
  public setHsla(hsla: Partial<HSLA>) {
    Object.assign(this, hsla)
    this.fromHsla()
  }

  /**
   * re-calculates "rgb-values" and "hex" based on "hsl-values" and "alpha"
   */
  public fromHsl() {
    this.fromHsla()
  }

  /**
   * re-calculates "rgb-values" and "hex" based on "hsl-values" and "alpha"
   */
  public fromHsla() {
    Object.assign(this, fromHsla(this.hue, this.saturation, this.lightness, this.alpha))
  }

  public alpha = 1
  /**
   * sets alpha to the new value an re-calculates "hex"
   */
  public setAlpha(value: number) {
    this.alpha = value
    this.hex = rgbaToHex(this.red, this.green, this.blue, this.alpha)
  }


  /**
   * @returns RGB = { red: number, green: number, blue: number }
   */
  public getRgb(): Required<RGB> {
    const { red, green, blue } = this
    return { red, green, blue }
  }

  /**
   * @returns RGBA = { red: number, green: number, blue: number, alpha: number }
   */
  public getRgba(): Required<RGBA> {
    const { red, green, blue, alpha } = this
    return { red, green, blue, alpha }
  }

  /**
   * @returns HSL = { hue: number, saturation: number, lightness: number }
   */
  public getHsl(): Required<HSL> {
    const { hue, saturation, lightness } = this
    return { hue, saturation, lightness }
  }

  /**
   * @returns HSLA = { hue: number, saturation: number, lightness: number, alpha: number }
   */
  public getHsla(): Required<HSLA> {
    const { hue, saturation, lightness, alpha } = this
    return { hue, saturation, lightness, alpha }
  }

  public get rgbString(): string {
    return `rgb(${this.red},${this.green},${this.blue})`
  }

  public toRgbString(): string {
    return this.rgbString
  }

  public get rgbaString(): string {
    return `rgba(${this.red},${this.green},${this.blue},${this.alpha})`
  }

  public toRgbaString(): string {
    return this.rgbaString
  }

  public get hslString(): string {
    return `hsl(${this.hue},${this.saturation}%,${this.lightness}%)`
  }

  public toHslString(): string {
    return this.hslString
  }

  public get hslaString(): string {
    return `hsla(${this.hue},${this.saturation}%,${this.lightness}%,${this.alpha})`
  }

  public toHslaString(): string {
    return this.hslaString
  }

  public getStrings(): Array<string> {
    return [ this.rgbString, this.rgbaString, this.hslString, this.hslaString, this.hexString, this.htmlColorName ]
  }
}