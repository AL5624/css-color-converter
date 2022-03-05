# css-color-converter-class

``` typescript
import { CssColor, fromString, fromHsla, fromRgba } from 'css-color-converter-class'
```
## fromString(value)

<table>
  <thead>
    <tr>
      <th>
        parameter
      </th>
      <th>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        value
      </td>
      <td>
        <code>string</code>
      </td>
      <td>
        Supports named colors (only client side), hex, rgb/rgba, hsl/hsla
      </td>
    </tr>
  </tbody>
</table>

<b>Returns</b> instance of [<code>CssColor</code>](#csscolor) if valid, <code>null</code> if invalid.

## fromHsla(hue, saturation, lightness, alpha)

<table>
  <thead>
    <tr>
      <th>
        parameter
      </th>
      <th>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        hue
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        /
      </td>
    </tr>
    <tr>
      <td>
        saturation
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        /
      </td>
    </tr>
    <tr>
      <td>
        lightness
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        /
      </td>
    </tr>
    <tr>
      <td>
        alpha
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        default = 1
      </td>
    </tr>
  </tbody>
</table>

<b>Returns</b> instance of [<code>CssColor</code>](#csscolor)

## fromRgba(red, green, blue, alpha)

<table>
  <thead>
    <tr>
      <th>
        parameter
      </th>
      <th>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        red
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        /
      </td>
    </tr>
    <tr>
      <td>
        green
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        /
      </td>
    </tr>
    <tr>
      <td>
        blue
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        /
      </td>
    </tr>
    <tr>
      <td>
        alpha
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        default = 1
      </td>
    </tr>
  </tbody>
</table>

<b>Returns</b> instance of [<code>CssColor</code>](#csscolor)

## CssColor

### Properties

#### static

<table>
  <thead>
    <tr>
      <th>
        accessibility
      </th>
      <th>
        name
      </th>
      <th>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        hexRegExp
      </td>
      <td>
        <code>RegExp</code>
      </td>
      <td>
        <code>new RegExp('^#?([0-9a-fd]{2})([0-9a-fd]{1,2})([0-9a-fd]{0,2})([0-9a-fd]{0,2})$', 'i')</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        rgbRegExp
      </td>
      <td>
        <code>RegExp</code>
      </td>
      <td>
        <code>new RegExp('^rgb\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)\\)$', 'i')</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        rgbaRegExp
      </td>
      <td>
        <code>RegExp</code>
      </td>
      <td>
        <code>new RegExp('^rgba\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)\\)$', 'i')</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        hslRegExp
      </td>
      <td>
        <code>RegExp</code>
      </td>
      <td>
        <code>new RegExp('^hsl\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)%?,([0-9]*.[0-9]+|[0-9]+)%?\\)$', 'i')</code>
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        hslaRegExp
      </td>
      <td>
        <code>RegExp</code>
      </td>
      <td>
        <code>new RegExp('^hsla\\(([0-9]*.[0-9]+|[0-9]+),([0-9]*.[0-9]+|[0-9]+)%?,([0-9]*.[0-9]+|[0-9]+)%?,([0-9]*.[0-9]+|[0-9]+)\\)$', 'i')</code>
      </td>
    </tr>
  </tbody>
</table>

#### non static

<table>
  <thead>
    <tr>
      <th>
        accessibility
      </th>
      <th>
        name
      </th>
      <th>
        type
      </th>
      <th>
        description
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        htmlColorName
      </td>
      <td>
        <code>string</code>
      </td>
      <td>
        only set if it was created with one <br> default = ''
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        hex
      </td>
      <td>
        <code>string</code>
      </td>
      <td>
        default = ''
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        red
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        default = 0
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        green
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        default = 0
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        blue
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        default = 0
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        hue
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        default = 0
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        saturation
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        default = 50
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        lightness
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        default = 100
      </td>
    </tr>
    <tr>
      <td>
        <code>public</code>
      </td>
      <td>
        alpha
      </td>
      <td>
        <code>number</code>
      </td>
      <td>
        default = 1
      </td>
    </tr>
  </tbody>
</table>

### Accessors ([Javascript](https://javascript.info/property-accessors), [Typescript](https://www.typescriptlang.org/docs/handbook/2/classes.html#getters--setters))

#### non static

| accessibility        | name          | type |  get | set | description |
| :-------------------- |:-------------| :----- | :----- | :----- | :----- |
| <code>public</code>               | hexString     | <code>string</code> | :heavy_check_mark: | :x: | returns "hex" [property](#non-static) and applies a "#" if it has non <br> does the same as the method  [toHexString](#methods) |
| <code>public</code> | saturationString | <code>string</code> | :heavy_check_mark: | :x: | returns "saturation" [property](#non-static) as string with "%" at the end |
| <code>public</code> | lightnessString | <code>string</code> | :heavy_check_mark: | :x: | returns "lightness" [property](#non-static) as string with "%" at the end |
| <code>public</code> | rgbString | <code>string</code> |  :heavy_check_mark: | :x: | returns a rgb string <code>'rgb(100,100,100)'</code> <br> does the same as the method [toRgbString](#non-static-2) |
| <code>public</code> | rgbaString | <code>string</code> |  :heavy_check_mark: | :x: | returns a rgba string <code>'rgba(100,100,100, 1)'</code> <br> does the same as the method [toRgbaString](#non-static-2) |
| <code>public</code> | hslString | <code>string</code> |  :heavy_check_mark: | :x: | returns a hsl string <code>'hsl(0,50%,100%)'</code> <br> does the same as the method [toHslString](#non-static-2) |
| <code>public</code> | hslaString | <code>string</code> |  :heavy_check_mark: | :x: | returns a hsla string <code>'hsla(0,50%,100%, 1)'</code> <br> does the same as the method [toHslaString](#non-static-2) |

### Methods

#### static

| accessibility        | name          | parameter | returns | description |
| :-------------------- |:-------------| :----- | :----- | :----- |
| <code>public</code> | getInstanceFromString | <code>value: string</code> | instance of [<code>CssColor</code>](#csscolor) if valid else <code>null</code> | does the same as [fromString](#fromstringvalue) <br> Supports named colors (only client side), hex, rgb/rgba, hsl/hsla |

#### non static 

| accessibility        | name          | parameter | returns | description |
| :-------------------- |:-------------| :---------------- | :----- | :----- |
| <code>public</code> | constructor | <code>rgb?: [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[RGB](#helper-classes)\> \| null</code><br><br><code>hsl?: [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[HSL](#helper-classes)\> \| null</code><br><br><code>alpha = 1</code><br><br><code>hex = ''</code><br><br><code>htmlColorName = ''</code> | instance of [<code>CssColor</code>](#csscolor) | / |
| <code>public</code> | setHtmlColorName | <code>value: string</code> | void | sets [htmlColorName](#non-static) to the new value and re-calculates "hsl-values", "rgb-values" and "alpha" (if valid string) |
| <code>public</code> | fromHtmlColorName | / | <code>void</code> | re-calculates "hsl-values", "rgb-values" and "alpha" based on [htmlColorName](#non-static) |
| <code>public</code> | setHex | <code>value: string</code> | <code>void</code> | sets [hex](#non-static) to the new value (if it matches hexRegExp) and re-calculates "hsl-values", "rgb-values" and "alpha" |
| <code>public</code> | fromHex | / | <code>void</code> | re-calculates "hsl-values", "rgb-values" and "alpha" based on [hex](#non-static) |
| <code>public</code> | setRed | <code>value: number</code> | <code>void</code> | sets [red](#non-static) to the new value and re-calculates "hsl-values" and "hex" |
| <code>public</code> | setGreen | <code>value: number</code> | <code>void</code> | sets [green](#non-static) to the new value and re-calculates "hsl-values" and "hex" |
| <code>public</code> | setBlue | <code>value: number</code> | <code>void</code> | sets [blue](#non-static) to the new value and re-calculates "hsl-values" and "hex" |
| <code>public</code> | setRgb | <code>rgb: [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[RGB](#helper-classes)\></code> | <code>void</code> | sets the new RGB values and re-calculates "hsl-values" and "hex" |
| <code>public</code> | setRgba | <code>rgba: [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[RGBA](#helper-classes)\></code> | <code>void</code> | sets the new RGBA values and re-calculates "hsl-values" and "hex" |
| <code>public</code> | fromRgb | / | <code>void</code> | re-calculates "hsl-values" and "hex" based on "rgb-values" and "alpha" |
| <code>public</code> | fromRgba | / | <code>void</code> | re-calculates "hsl-values" and "hex" based on "rgb-values" and "alpha" |
| <code>public</code> | setHue | <code>value: number</code> | <code>void</code> | sets hue to the new value and re-calculates "rgb-values" and "hex" |
| <code>public</code> | setSaturation | <code>value: number</code> | <code>void</code> | sets saturation to the new value and re-calculates "rgb-values" and "hex" |
| <code>public</code> | setLightness | <code>value: number</code> | <code>void</code> | sets lightness to the new value and re-calculates "rgb-values" and "hex" |
| <code>public</code> | setHsl | <code>hsl: [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[HSL](#helper-classes)\></code> | <code>void</code> | sets the new HSL values and re-calculates "rgb-values" and "hex" |
| <code>public</code> | setHsla | <code>hsla: [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[HSLA](#helper-classes)\></code> | <code>void</code> | sets the new RGBA values and re-calculates "hsl-values" and "hex" |
| <code>public</code> | fromHsl | / | <code>void</code> | re-calculates "rgb-values" and "hex" based on "hsl-values" and "alpha" |
| <code>public</code> | fromHsla | / | <code>void</code> | re-calculates "rgb-values" and "hex" based on "hsl-values" and "alpha" |
| <code>public</code> | setAlpha | <code>value: number</code> | <code>void</code> | sets alpha to the new value an re-calculates "hex" |
| <code>public</code> | getRgb | / | <code>[Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)\<[RGB](#helper-classes)\></code> | / |
| <code>public</code> | getRgba | / | <code>[Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)\<[RGBA](#helper-classes)\></code> | / |
| <code>public</code> | getHsl | / | <code>[Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)\<[HSL](#helper-classes)\></code> | / |
| <code>public</code> | getHsla | / | <code>[Required](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)\<[HSLA](#helper-classes)\></code> | / |
| <code>public</code> | toRgbString | / | <code>string</code> | does the same as accessor [rbgString](#non-static-1) |
| <code>public</code> | toRgbaString | / | <code>string</code> | does the same as accessor [rbgaString](#non-static-1) |
| <code>public</code> | toHslString | / | <code>string</code> | does the same as accessor [hslString](#non-static-1) |
| <code>public</code> | toHslaString | / | <code>string</code> | does the same as accessor [hslaString](#non-static-1) |
| <code>public</code> | getStrings | / | <code>Array\<string\></code> | [ this.rgbString, this.rgbaString, this.hslString, this.hslaString, this.hexString, this.htmlColorName ] |

## Helper Classes
  
```typescript
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
```
