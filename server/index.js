const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const typeDefs = require("./graphql/typeDefs");
dotenv.config();

const resolvers = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find();
				return posts;
			} catch (error) {
				console.log(error);
				throw new Error(error);
			}
		},
	},
};

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
		console.log("Database connected");
		return server.listen({ port: 5000 });
	})
	.then((res) => console.log(`Server running at ${res.url}`));
