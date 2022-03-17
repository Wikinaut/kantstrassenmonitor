const createClient = require('hafas-client')
const vbbProfile = require('hafas-client/p/vbb')

//	Code:
//	https://github.com/public-transport/hafas-client/blob/5/docs/locations.md

const client = createClient(vbbProfile, 'my-awesome-program')

client.locations('neue kant', {
	fuzzy: false,
	results: 20,
	stops: true,
	poi: false,
	linesOfStops: true
}).then(console.log)
.catch(console.error)
