'use strict'

const body = document.body
const inputR = body.querySelector('input[name="red"]')
const inputG = body.querySelector('input[name="green"]')
const inputB = body.querySelector('input[name="blue"]')
const inputAlpha = body.querySelector('input[name="alpha"]')
const saveBtn = body.querySelector('#start')

saveBtn.addEventListener('click', addStyle)

class validateColors {
  constructor(alpha, ...colors) {
    colors.forEach((event) => {
      if (isNaN(event)) throw new TypeError('Значение должно быть числом')
      if (!Number.isInteger(event))
        throw RangeError('Значение должно быть целым')
      if (event < 0 || event > 255)
        throw RangeError('Значение должно быть больше 0 и меньше чем 255')
    })

    if (alpha < 0 || alpha > 1)
      throw RangeError('Значение должно быть больше 0.0 и меньше чем 1.0')
    if (isNaN(alpha)) throw new TypeError('Значение должно быть числом')

    this.colors = colors
    this.alpha = alpha
  }

  getColor() {
    let [r, g, b] = this.colors
    return `rgba(${r},${g},${b},${this.alpha})`
  }

  setColor() {
    document.body.style.background = this.getColor()
  }
}

function addStyle(event) {
  event.preventDefault()
  try {
    new validateColors(
      Number(inputAlpha.value),
      Number(inputR.value),
      Number(inputG.value),
      Number(inputB.value),
    ).setColor()
  } catch (event) {
    console.log(event)
  }
  inputAlpha.value = ''
  inputR.value = ''
  inputG.value = ''
  inputB.value = ''
}
