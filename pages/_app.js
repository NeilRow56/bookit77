import { ChakraProvider } from '@chakra-ui/react';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default wrapper.withRedux(MyApp);
