import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider>
			<ChakraProvider>
				<Component {...pageProps} />
			</ChakraProvider>
		</SessionProvider>
	);
}

export default wrapper.withRedux(MyApp);
