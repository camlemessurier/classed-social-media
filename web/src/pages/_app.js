import apolloClient from "../utils/ApolloClient";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={apolloClient}>
			<Component {...pageProps} />;
		</ApolloProvider>
	);
}

export default MyApp;
