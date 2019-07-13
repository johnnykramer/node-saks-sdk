const gpio = require('rpi-gpio')
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
        this.buzzer = new Buzzer(pins.BUZZER, gpio.DIR_LOW)
        return this
      } catch (e) {
        console.error('Create instance ERROR:', e.toString())
      }
    })()
  }

  async gpioInit() {
    // GPIO.setwarnings(false)
    await gpio.destroy()
    await gpio.setMode(gpio.MODE_BCM)

    await gpio.setup(pins.BUZZER, gpio.DIR_OUT)
    await gpio.output(pins.BUZZER, gpio.DIR_HIGH)

    for (const pin of [
      pins.IC_TM1637_DI,
      pins.IC_TM1637_CLK,
      pins.IC_74HC595_DS,
      pins.IC_74HC595_SHCP,
      pins.IC_74HC595_STCP,
    ]) {
      gpio.setup(pin, gpio.DIR_OUT)
      gpio.output(pin, gpio.DIR_LOW)
    }

    for (const pin of [
      pins.BUZZER,
      pins.TACT_RIGHT,
      pins.TACT_LEFT,
      pins.DIP_SWITCH_1,
      pins.DIP_SWITCH_2,
    ]) {
      gpio.setup(pin, gpio.DIR_OUT)
      gpio.output(pin, gpio.DIR_HIGH)
    }

    for (const pin of [
      pins.TACT_RIGHT,
      pins.TACT_LEFT,
      pins.DIP_SWITCH_1,
      pins.DIP_SWITCH_2,
    ]) {
      GPIO.setup(pin, gpio.DIR_IN)
    }
  }
}
