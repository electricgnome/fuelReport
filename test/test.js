/* eslint-env mocha */

const assert = require('assert')
const fs = require('fs-plus')

// -----------------------------------------------------------------------------
// Run the tests
// -----------------------------------------------------------------------------

const configFile = 'config/config.json'

function checkConfig () {
  it('config file should exist', function () {
    assert(fs.isFileSync(configFile))
  })

  it('config file should be valid JSON', function () {
    assert.doesNotThrow(function () {
      const fileTxt = fs.readFileSync(configFile)
      JSON.parse(fileTxt)
    })
  })
}

describe('check config file', checkConfig)
