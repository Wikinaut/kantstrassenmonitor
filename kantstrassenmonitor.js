//	Kleiner Monitor zur Überwachung der BVG-Bus-Abfahrtsverzögerungen auf der Kantstraße

//	Requirements/Installation:
//
//		npm install bvg-hafas
//
//	Run basically as:
//
//		node kantstrassenmonitor.js
//
//
//	Empfohlene Einträge in der crontab:
//
//	YESTERDAY=date -d yesterday +%Y%m%d
//	TODAY=date +%Y%m%d
//	NOW=date +%Y%m%d-%H%M
//
//	* /5 * * * * /usr/bin/node /home/benutzer/bvg/kantstrasse.js >> /var/www/html/bvg/abfahrten-`$TODAY`.csv
//
//	# zip and move data of yesterday into a zip-file with that date
//	02 00 * * * zip /var/www/html/bvg/archiv/abfahrten-`$YESTERDAY`.zip -m -j /var/www/html/bvg/abfahrten-`$YESTERDAY`.csv > /dev/null
//
//	# add symbolic links
//	02 00 * * * ln -sf /var/www/html/bvg/abfahrten-`$TODAY`.csv /var/www/html/bvg/abfahrten.txt
//	02 00 * * * ln -sf /var/www/html/bvg/abfahrten-`$TODAY`.csv /var/www/html/bvg/abfahrten.csv
//
//	Code:
//		https://github.com/public-transport/bvg-hafas
//		https://github.com/public-transport/hafas-client/blob/5/readme.md#related
//

const createClient = require('bvg-hafas')
const client = createClient('kantstrassenmonitor')

// client.locations('Joachimsthaler', {results: 10})
// .then(console.log)
// .catch(console.error)

// 900000024106 Messe Nord/ICC
// 900000024207 Kantstr./Leibnizstr.
// 900000023206 Joachimsthaler/Kantstr./Theater des Westens

/*
    id: '900000026209',
    name: 'Neue Kantstr./ZOB',

    id: '900000024151',
    name: 'Kuno-Fischer-Str.',
-
    id: '900000024104',
    name: 'Amtsgerichtsplatz',

    id: '900000024108',
    name: 'Kaiser-Friedrich-Str./Kantstr.',

    id: '900000024200',
    name: 'U Wilmersdorfer Str./Kantstr.',

    id: '900000024207',
    name: 'Kantstr./Leibnizstr.',

    id: '900000023105',
    name: 'Uhlandstr./Kantstr.',

    id: '900000024252',
    name: 'Schlüterstr.',

    id: '900000024204',
    name: 'Savignyplatz',

    id: '900000023206',
    name: 'Joachimsthaler Str./Kantstr./Theater des Westens',


*/

var stations = [
    '900000024106',
    '900000026209',
    '900000024151',
    '900000024104',
    '900000024108',
    '900000024200',
    '900000024207',
    '900000023105',
    '900000024252',
    '900000024204',
    '900000023206'
];


// var stations = ['900000023206', '900000024207', '900000024106'];
stations.forEach(station => printDepartures(station));

function printDepartures(station) {
	client.departures(station, {duration: 30})
	.then(response => response.filter(trip => trip.line.mode == 'bus').map(trip => [
		new Date().toISOString(),
		trip.tripId,
		trip.stop.name,
		trip.line.name,
		trip.direction,
		trip.when,
		trip.plannedWhen,
		trip.delay
	]))
	.then(result => result.map(trip => trip.join(';')))
	.then(result => result.join('\n'))
	.then(console.log)
	.catch(console.error)
	return
}
