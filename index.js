const gpio = require('rpi-gpio')
const gpiop = gpio.promise
const pins = require('./src/pins')
const { Buzzer } = require('./src/entities')

/**
 * SAKS class
 */
class SAKS {
  constructor() {
    return (async () => {
      try {
        await this.gpioInit()
        this.buzzer = new Buzzer(pins.BUZZER)
        return this
      } catch (e) {
        console.error('Create instance ERROR:', e.toString())
      }
    })()
  }

  async gpioInit() {
    await gpiop.destroy()
    gpio.setMode(gpio.MODE_BCM)

    await gpiop.setup(pins.BUZZER, gpio.DIR_OUT)
    await gpiop.write(pins.BUZZER, gpio.DIR_HIGH)

    // for (const pin of [
    //   pins.IC_TM1637_DI,
    //   pins.IC_TM1637_CLK,
    //   pins.IC_74HC595_DS,
    //   pins.IC_74HC595_SHCP,
    //   pins.IC_74HC595_STCP,
    // ]) {
    //   await gpiop.setup(pin, gpio.DIR_OUT)
    //   await gpiop.write(pin, gpio.DIR_LOW)
    // }

    // for (const pin of [
    //   pins.BUZZER,
    //   pins.TACT_RIGHT,
    //   pins.TACT_LEFT,
    //   pins.DIP_SWITCH_1,
    //   pins.DIP_SWITCH_2,
    // ]) {
    //   console.log({pin})
    //   await gpiop.setup(pin, gpio.DIR_OUT)
    //   await gpiop.write(pin, gpio.DIR_HIGH)
    // }

    // for (const pin of [
    //   pins.TACT_RIGHT,
    //   pins.TACT_LEFT,
    //   pins.DIP_SWITCH_1,
    //   pins.DIP_SWITCH_2,
    // ]) {
    //   await gpiop.setup(pin, gpio.DIR_IN)
    // }
  }
}

module.exports = SAKS