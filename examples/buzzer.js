const SAKS = require('../index')

run()

async function run() {
  try {
    const { buzzer } = await new SAKS()
    console.info('ON')
    await buzzer.beep(100)
    console.info('OFF')
    
  } catch (e) {
    console.error('ERROR:', e.toString())
  }
}