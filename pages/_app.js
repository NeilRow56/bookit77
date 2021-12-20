import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default wrapper.withRedux(MyApp);
