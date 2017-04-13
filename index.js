const hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const path = require('path');
const handlebars = require('handlebars');

const server = new hapi.Server();

server.connection({
	port: process.env.PORT || 5000
});

server.register([inert, vision], err => {
	if (err) {
		throw err;
	}

	server.views({
		engines: {
			html: handlebars
		},
		relativeTo: __dirname,
		path: 'html',
		helpersPath: path.join('html', 'helpers'),
		layout: path.join('layout', 'main')
	});

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
		handler: (request, reply) => {
			return reply.view('home', {pageName: 'home'});
		}
	}, {
		method: 'GET',
		path: '/{path*}',
		handler: (request, reply) => {
			return reply.view(request.params.path, {pageName: request.params.path});
		}
	}]);

	server.start((startErr) => {
		if (startErr) {
			throw startErr;
		}

		console.log(`Server running at: ${server.info.uri}`);
	});
});
