import { rgbaToHsla, hslaToRgba, rgbaToHex, roundToDecimal } from './numberConverter'

const error = (type: string, value: string): string => {
  return `cannot parse ${type} \"${value}\" to CssColor")`
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

  const h: number = Number(result[1])
  const s: number = Number(result[2])
  const l: number = Number(result[3])
  const a: number = Number(result[4])

  return hslaToCssColor(h, s, l, a)
}

const hslStringToCssColor = (hsl: string): CssColor => {
  const result = CssColor.hslRegExp.exec(hsl)

  if (!result) throw error('hsl', hsl)

  const h: number = Number(result[1])
  const s: number = Number(result[2])
  const l: number = Number(result[3])

  return hslaToCssColor(h, s, l)
}

const rgbaStringToCssColor = (rgba: string): CssColor => {
  const result = CssColor.rgbaRegExp.exec(rgba)

  if (!result) throw error('rgba', rgba)

  const r: number = Number(result[1])
  const g: number = Number(result[2])
  const b: number = Number(result[3])
  const a: number = Number(result[4])

  return rgbaToCssColor(r, g, b, a)
}

const rgbStringToCssColor = (rgb: string): CssColor => {
  const result = CssColor.rgbRegExp.exec(rgb)

  if (!result) throw error('rgb', rgb)

  const r: number = Number(result[1])
  const g: number = Number(result[2])
  const b: number = Number(result[3])

  return rgbaToCssColor(r, g, b)
}

export const hslaToCssColor = (hue: number, saturation: number, lightness: number, alpha: number = 1): CssColor => {
  const { red, green, blue } = hslaToRgba(hue, saturation, lightness)
  return new CssColor({ red, green, blue }, { hue, saturation, lightness }, alpha)
}

export const rgbaToCssColor = (red: number, green: number, blue: number, alpha: number = 1): CssColor => {
  const { hue, saturation, lightness } = rgbaToHsla(red, green, blue)

  return new CssColor({ red, green, blue }, { hue, saturation, lightness }, alpha)
}

export class CssColor {
  public static hexRegExp: RegExp = new RegExp('^#?([0-9a-fd]{2})([0-9a-fd]{1,2})([0-9a-fd]{0,2})([0-9a-fd]{0,2})$', 'i')
  public static rgbRegExp: RegExp = new RegExp('^rgb\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)\\)$', 'i')
  public static rgbaRegExp: RegExp = new RegExp('^rgba\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)\\)$', 'i')
  public static hslRegExp: RegExp = new RegExp('^hsl\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)%,([0-9]*.[0-9]+|[0-9]+)%\\)$', 'i')
  public static hslaRegExp: RegExp = new RegExp('^hsla\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)%,([0-9]*.[0-9]+|[0-9]+)%,([0-9]*.[0-9]+|[0-9]+)\\)$', 'i')

  public static getInstanceFromString(value: string): CssColor | null {
    value = value.split(' ').join('')
    let cssColor: CssColor | null = null

    try {
      if (value.match(CssColor.hexRegExp)) {
        cssColor = hexStringToCssColor(value)
      } else if (value.match(/^rgb\(/)) {
        cssColor = rgbStringToCssColor(value)
      } else if (value.match(/^rgba\(/)) {
        cssColor = rgbaStringToCssColor(value)
      } else if (value.match(/^hsl\(/)) {
        cssColor = hslStringToCssColor(value)
      } else if (value.match(/^hsla\(/)) {
        cssColor = hslaStringToCssColor(value)
      } else if (document && window) {
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.style.color = value
        const rgbString = window.getComputedStyle(div).color
        cssColor = rgbStringToCssColor(rgbString)
        cssColor.htmlColorName = value
        document.body.removeChild(div)
      }
    } catch (e) {
      // tslint:disable-next-line: no-console
      console.warn(e)
    }

    return cssColor
  }

  public constructor(
    rgb: Partial<{ red: number; green: number; blue: number }>,
    hsl: Partial<{ hue: number; saturation: number; lightness: number }>,
    alpha: number = 1,
    hex: string = '',
    htmlColorName: string = ''
  ) {
    Object.assign(this, rgb)
    Object.assign(this, hsl)
    this.alpha = alpha
    this.hexString = hex || '#' + rgbaToHex(this.red, this.green, this.blue, this.alpha)
    this.htmlColorName = htmlColorName
  }

  public htmlColorName: string = ''
  public hexString: string = ''

  public toHexString(): string {
    return this.hexString
  }

  public red: number = 0
  public green: number = 0
  public blue: number = 0

  public hue: number = 0
  public saturation: number = 100
  public lightness: number = 50

  public alpha: number = 1

  public getRgba(): Required<{ red: number; green: number; blue: number; alpha: number }> {
    const { red, green, blue, alpha } = this
    return { red, green, blue, alpha }
  }

  public getHsla(): Required<{ hue: number; saturation: number; lightness: number; alpha: number }> {
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
    const colors = [this.rgbString, this.rgbaString, this.hslString, this.hslaString, this.hexString]
    if (this.htmlColorName) {
      colors.push(this.htmlColorName)
    }
    return colors
  }
}
