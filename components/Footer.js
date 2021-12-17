import { Flex, Center, Icon, Spacer, Divider, Link } from '@chakra-ui/react';

function Footer() {
	return (
		<Flex
			backgroundColor="gray.100"
			height="60px"
			padding="10px"
			marginLeft="5px"
			marginRight="5px"
			justify="center"
		>
			<Center>
				Copyright &copy; 2021 Accountancy Coding, All rights reserved{' '}
			</Center>
		</Flex>
	);
}

export default Footer;
