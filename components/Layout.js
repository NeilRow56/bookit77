import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { Text, Box, Flex } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ title, keywords, description, children }) {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0" />
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Navbar />
			<ToastContainer position="bottom-right" />
			<Flex
				// backgroundColor="blue.50"
				padding="10px"
				minHeight="87vh"
				marginLeft="5px"
				marginRight="5px"
			>
				{children}
			</Flex>
			<Footer />
		</div>
	);
}

Layout.defaultProps = {
	title: 'Book the best hotels for your holiday',
	description: 'notes and todos',
	keywords: 'notes, todos',
};
