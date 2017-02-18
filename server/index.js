import { Server } from 'hapi';
import db from 'mongoose';
import chalk from 'chalk';
import inert from 'inert';

import config from './config';
import routes from './routes';

const server = new Server();

const { host, port } = config.server;
const http = server.connection({ host, port , labels: 'http' });

const lifecicleHandlers = [{
	type: 'onPreResponse',
	method: (request, reply) => {

		const { response } = request;

		if (response.isBoom && response.output.statusCode === 404) {
			return reply.redirect('/')
		}

		reply.continue();
	}
}]

server.register([inert], error => {

	if (error) return console.log(error);

	const { host } = config.database;

	db.Promise = global.Promise;
	db.connect(`mongodb://${host}`);

	server.ext(lifecicleHandlers);
	
	http.route(routes);

})

server.start(err => {
	if (err) console.log(err);
	console.log(chalk.bgBlue.white(`running`));
	console.log(chalk.bgGreen.black('api'), http.info);
});

export default server;
