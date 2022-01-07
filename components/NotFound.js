import React from 'react';
import NextLink from 'next/link';
import { Flex, Heading, Link, Box } from '@chakra-ui/react';

const NotFound = () => {
	return (
		<Flex width="full" align="center" justifyContent="center">
			<Box
				p={8}
				marginTop="50px"
				width="800px"
				borderWidth={1}
				borderRadius={8}
				boxShadow="lg"
			>
				<Box textAlign="center">
					<Heading color="#cc0000">
						404! - Page not Found. Go to
						<NextLink href="/" passHref>
							<Link color="blue.500"> Homepage</Link>
						</NextLink>
					</Heading>
				</Box>
			</Box>
		</Flex>
	);
};

export default NotFound;
