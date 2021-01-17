const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const dotenv = require("dotenv");
dotenv.config();

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

mongoose
	.connect(process.env.MONGODBCONNECTIONSTRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		return server.listen({ port: 5000 });
	})
	.then((res) => console.log(`Server running at ${res.url}`))
	.catch((err) => console.log(err));
