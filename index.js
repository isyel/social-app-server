const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const pubSub = new PubSub();

const port = process.env.PORT || 5000;

const { MONGODB } = require("./config.js");
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req, pubSub }),
});

mongoose
	.connect(MONGODB, { useNewUrlParser: true })
	.then(() => {
		console.log("MongoDB Connected");
		return server.listen({ port: port });
	})
	.then((res) => {
		console.log(`Server is Running at ${res.url}`);
	})
	.catch((error) => console.error(error));
