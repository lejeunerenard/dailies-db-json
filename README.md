# Dailies JSON Database

A generic dailies database stored as a JSON file.

## Usage

```javascript
const DailiesDB = require('@lejeunerenard/dailies-db-json')

const db = new DailiesDB('/path/to/dailies/db.json') // Set custom db file otherwise
                                              // defaults to ~/dailies.json
db.add({
  date: '2001-01-10',
  media: [
    '/path/to/media/1',
    '/path/to/media/2'
  ]
})

db.latest().then((daily) => console.log(daily))
```

## Related

- [Dailies Server](https://github.com/lejeunerenard/dailies-server)
