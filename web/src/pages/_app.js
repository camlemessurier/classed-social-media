import apolloClient from "../utils/ApolloClient";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={apolloClient}>
			<ChakraProvider>
				<Component {...pageProps} />;
			</ChakraProvider>
		</ApolloProvider>
	);
}

export default MyApp;
