const gpio = require('rpi-gpio')
const gpiop = gpio.promise
const { timeout } = require('../helpers')

class Buzzer {
  constructor(pin) {
    this._pin = pin
    this._isOn = false
  }

  /**
   * Return the status of buzzer
   */
  isOn() {
    try {
      return this._isOn
    } catch (e) {
      console.error(`[Buzzer isOn] ERROR:`, e.toString())
    }
  }

  /**
   * Set buzzer on
   */
  async on() {
    try {
      await gpiop.write(this._pin, '1')
      this._isOn = true
    } catch (e) {
      console.error(`[Buzzer on] ERROR:`, e.toString())
    }
  }

  /**
   * Set buzzer off
   */
  async off() {
    try {
      await gpiop.write(this._pin, '0')
      this._isOn = false
    } catch (e) {
      console.error(`[Buzzer off] ERROR:`, e.toString())
    }
  }

  /**
   * One time beep
   * @param {Number} ms beep duration
   */
  async beep(ms = 500) {
    try {
      await this.on()
      await timeout(ms)
      await this.off()
    } catch (e) {
      console.error(`[Buzzer beep] ERROR:`, e.toString())
    }
  }

  /**
   * Beep in a rhythm
   * @param {Number} duration Beep duration in milliseconds
   * @param {Number} delay Delay between beeps in milliseconds
   * @param {Number} times Repeat times
   */
  async beepAction(duration = 500, delay = 500, times = 3) {
    try {
      for (let i = 0; i < times; i += 1) {
        this.beep(duration)
        await timeout(delay)
      }
    } catch (e) {
      console.error(`[Buzzer beepAction] ERROR:`, e.toString())
    }
  }
}

module.exports = Buzzer
