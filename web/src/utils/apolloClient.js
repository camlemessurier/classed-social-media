import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";

const link = new createHttpLink({
	uri: process.env.NEXT_PUBLIC_SERVER_URI,
});

const apolloClient = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

export default apolloClient;
