const argv = require('minimist')(process.argv.slice(2))

const DailiesDB = require('../')

const db = new DailiesDB()

let media = argv.media || []
if (!(media instanceof Array)) {
  media = [media]
}

db.add({
  date: argv.date || (new Date().toISOString()),
  media: media
})
