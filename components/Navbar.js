import { ReactNode } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import ClientOnly from './ClientOnly';
import {
	Box,
	Flex,
	Avatar,
	Button,
	Menu,
	MenuButton,
	Link,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	Spacer,
	Text,
	useColorMode,
	Center,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';

export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const router = useRouter();
	const isActive = router.pathname === '/login';

	return (
		<>
			<Box
				bg={useColorModeValue('gray.100', 'gray.900')}
				px={4}
				width="100vw"
			>
				<Flex
					h={16}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Flex height="30px" width="90px">
						<NextLink href="/" passHref>
							<Link>
								<img
									src="/images/bookit_logo.png"
									alt="Bookit"
									width="90px"
									height="35px"
								/>
							</Link>
						</NextLink>
					</Flex>

					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7} color="#cc0000">
							<NextLink href="/" passHref>
								<Link>Profile</Link>
							</NextLink>
							<NextLink href={'/register'} passHref>
								<Link>Register</Link>
							</NextLink>
							<NextLink href={'/login'} passHref>
								<Link color={isActive ? 'blue' : 'red'}>
									Login
								</Link>
							</NextLink>
							<NextLink href="/" passHref>
								<Link href="#">Logout</Link>
							</NextLink>
							<Button onClick={toggleColorMode}>
								{colorMode === 'light' ? (
									<MoonIcon />
								) : (
									<SunIcon />
								)}
							</Button>
							<ClientOnly>
								<Menu>
									<MenuButton
										as={Button}
										rounded={'full'}
										variant={'link'}
										cursor={'pointer'}
										minW={0}
									>
										<Avatar
											size={'sm'}
											src={
												'https://avatars.dicebear.com/api/male/username.svg'
											}
										/>
									</MenuButton>
									<MenuList alignItems={'center'}>
										<br />
										<Center>
											<Avatar
												size={'2xl'}
												src={
													'https://avatars.dicebear.com/api/male/username.svg'
												}
											/>
										</Center>
										<br />
										<Center>
											<p>Username</p>
										</Center>
										<br />
										<MenuDivider />
										<MenuItem>Your Servers</MenuItem>
										<MenuItem>Account Settings</MenuItem>
										<MenuItem>
											<a href="#">Logout</a>
										</MenuItem>
									</MenuList>
								</Menu>
							</ClientOnly>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
