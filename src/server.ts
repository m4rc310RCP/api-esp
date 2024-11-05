import "reflect-metadata";
import http from "node:http";
import path from "node:path";
import { join } from 'path';

import { readFileSync } from 'fs';
import { createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { DeviceResolver } from './resolvers/subscriptions/device-resolver';
import { pubSub } from './resolvers/subscriptions/pubsub';

// import { NotificationResolver } from "./notification.resolver";
// import { pubSub } from "./pubsub";
const overview = path.resolve(__dirname, "overview.html");
const overviewHtml = readFileSync(overview, 'utf-8');

async function bootstrap() {
	// Build TypeGraphQL executable schema
	const schema = await buildSchema({
		// Array of resolvers
		resolvers: [DeviceResolver],
		// Create 'schema.graphql' file with schema definition in current directory
		emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
		// Publish/Subscribe
		pubSub,
	});

	// Create GraphQL server
	const yoga = createYoga({
		schema,
		graphqlEndpoint: "/graphql",
	});

	// Create server
	//const httpServer = http.createServer(yoga);
	// Cria o servidor HTTP e intercepta a rota "/"
	const httpServer = http.createServer((req, res) => {
		if (req.url === '/') {
			// Responde com o conteúdo de `overview.html` na rota principal "/"
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(overviewHtml);
		} else {
			// Delega todas as outras rotas ao Yoga (ex: /graphql)
			yoga(req, res);
		}
	});

	// Start server
	httpServer.listen(3000, () => {
		console.log(`GraphQL server ready at http://localhost:3000/graphql`);
	});
}

bootstrap().catch(console.error);