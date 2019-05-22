const fs = require('fs')
const os = require('os')
const path = require('path')
const assert = require('assert')

class JSONDailiesDB {
  constructor (file = path.join(os.homedir(), 'dailies.json')) {
    this.file = file
  }

  latest () {
    return new Promise((resolve, reject) => {
      fs.readFile(this.file, 'utf8', (err, data) => {
        if (err) {
          reject(err)
          return
        }

        let dailies = JSON.parse(data)
        dailies = dailies.sort((a, b) => (new Date(b.date)) - (new Date(a.date)))
        resolve(dailies[0])
      })
    })
  }

  getDailyMedia (daily, index) {
    return daily.media[index]
  }

  add (daily) {
    assert.ok(daily.media instanceof Array, 'JSONDailiesDB : media must be an array')
    assert.ok(daily.media.length, 'JSONDailiesDB : there must be at least one media entry')
    assert.ok(typeof daily.date === 'string', 'date must be a string')

    return new Promise((resolve, reject) => {
      fs.readFile(this.file, 'utf8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            data = '[]'
          } else {
            reject(err)
            return
          }
        }

        let dailies = JSON.parse(data)
        dailies.push(daily)

        fs.writeFile(this.file, JSON.stringify(dailies), (err) => {
          if (err) {
            reject(err)
            return
          }

          resolve(daily)
        })
      })
    })
  }
}
module.exports = JSONDailiesDB
