const express = require('express'),
	app = express();

app.set('port', (8080));

app.use(express.static('public'));

app.listen(app.get('port'), function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log('Running on port: ' + app.get('port')); }
});
