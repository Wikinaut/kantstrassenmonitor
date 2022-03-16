# kantstrassenmonitor
Monitors the alleged BVG bus delays on Berliner Kantstraße 

```
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
```

Slack informed https://chawi.slack.com/archives/CTLKJTMH7/p1647454261515379

See also 
* https://github.com/public-transport/bvg-hafas
* https://github.com/public-transport/hafas-client/blob/5/readme.md#related
