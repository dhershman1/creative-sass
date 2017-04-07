const hapi = require('hapi');
const inert = require('inert');
const path = require('path');

const server = new hapi.Server();

server.connection({
	port: process.env.NODE_PORT || 5000
});

server.register(inert, err => {
	if (err) {
		throw err;
	}

	server.route([{
		method: 'GET',
		path: '/dist/{path*}',
		handler: {
			directory: {
				path: path.resolve('./output')
			}
		}
	}, {
		method: 'GET',
		path: '/',
		handler: {
			file: 'main.html'
		}
	}]);

	server.start((startErr) => {
		if (startErr) {
			throw startErr;
		}

		console.log(`Server running at: ${server.info.uri}`);
	});
});
