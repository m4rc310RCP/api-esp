"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const node_http_1 = __importDefault(require("node:http"));
const node_path_1 = __importDefault(require("node:path"));
const graphql_yoga_1 = require("graphql-yoga");
const type_graphql_1 = require("type-graphql");
const device_resolver_1 = require("./resolvers/subscriptions/device-resolver");
const pubsub_1 = require("./resolvers/subscriptions/pubsub");
// import { NotificationResolver } from "./notification.resolver";
// import { pubSub } from "./pubsub";
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // Build TypeGraphQL executable schema
        const schema = yield (0, type_graphql_1.buildSchema)({
            // Array of resolvers
            resolvers: [device_resolver_1.DeviceResolver],
            // Create 'schema.graphql' file with schema definition in current directory
            emitSchemaFile: node_path_1.default.resolve(__dirname, "schema.graphql"),
            // Publish/Subscribe
            pubSub: pubsub_1.pubSub,
        });
        // Create GraphQL server
        const yoga = (0, graphql_yoga_1.createYoga)({
            schema,
            graphqlEndpoint: "/graphql",
        });
        // Create server
        const httpServer = node_http_1.default.createServer(yoga);
        // Start server
        httpServer.listen(3000, () => {
            console.log(`GraphQL server ready at http://localhost:3000/graphql`);
        });
    });
}
bootstrap().catch(console.error);
