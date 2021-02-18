const url = require('url');
const qs = require('querystring');

const serverHandle = (req, res) => {
	const route = url.parse(req.url);
	const path = route.pathname;
	const params = qs.parse(route.query);

	if (path === '/hello' && 'name' in params) {
		res.writeHead(200, {'Content-Type': 'text/plain'});

		if(params.name.toLowerCase() === 'kevin') {
			res.write("Bonjour au meilleur prof de web de l'ece");
		} else {
			res.write('Hello anonymous');
		}
	} else {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.write('not found');
	}

	res.end();
}

module.exports = {
	serverHandle,
}
