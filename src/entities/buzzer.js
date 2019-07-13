const gpio = require('rpi-gpio')
const { timeout } = require('../helpers')

class Buzzer {
  constructor(pin, realTrue = gpio.DIR_HIGH) {
    this._pin = pin
    this._realTrue = realTrue
    this._isOn = false
  }

  /**
   * Return the status of buzzer
   */
  isOn() {
    return this._isOn
  }

  /**
   * Set buzzer on
   */
  on() {
    await gpio.output(this._pin, this._realTrue)
    this._isOn = true
  }

  /**
   * Set buzzer off
   */
  off() {
    await gpio.output(this.__pin, !this._realTrue)
    this._isOn = false
  }

  /**
   * One time beep
   * @param {Number} ms beep duration
   */
  beep(ms = 500) {
    this.on()
    setTimeout(() => this.off(), ms)
  }

  /**
   * Beep in a rhythm
   * @param {Number} duration Beep duration in milliseconds
   * @param {Number} delay Delay between beeps in milliseconds
   * @param {Number} times Repeat times
   */
  async beepAction(duration = 500, delay = 500, times = 3) {
    for (let i = 0; i < times; i += 1) {
      this.beep(duration)
      await timeout(delay)
    }
  }
}

module.exports = Buzzer
