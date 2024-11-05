import "reflect-metadata";
import http from "node:http";
import path from "node:path";
import { createYoga } from "graphql-yoga";
import { buildSchema } from "type-graphql";
import { DeviceResolver } from './resolvers/subscriptions/device-resolver';
import { pubSub } from './resolvers/subscriptions/pubsub';
// import { NotificationResolver } from "./notification.resolver";
// import { pubSub } from "./pubsub";

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
	const httpServer = http.createServer(yoga);

	// Start server
	httpServer.listen(3000, () => {
		console.log(`GraphQL server ready at http://localhost:3000/graphql`);
	});
}

bootstrap().catch(console.error);