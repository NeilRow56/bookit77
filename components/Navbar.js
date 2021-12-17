import { ReactNode } from 'react';
import Link from 'next/link';
import ClientOnly from './ClientOnly';
import {
	Box,
	Flex,
	Avatar,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	Spacer,
	useColorMode,
	Center,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';

export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Box
				bg={useColorModeValue('gray.100', 'gray.900')}
				px={4}
				width="100%"
			>
				<Flex
					h={16}
					alignItems={'center'}
					justifyContent={'space-between'}
				>
					<Flex width="150px">
						<Link href="#">
							<a>Bookings.Com</a>
						</Link>
					</Flex>
					<Flex height="30px" width="90px">
						<img
							src="/images/bookit_logo.png"
							alt="Bookit"
							width="70px"
							height="25px"
						/>
					</Flex>

					<Flex alignItems={'center'}>
						<Stack direction={'row'} spacing={7}>
							<Link href="#">
								<a>Profile</a>
							</Link>
							<Link href="#">
								<a>Login</a>
							</Link>
							<Link href="#">
								<a>Logout</a>
							</Link>
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
											<a href="/api/auth/logout">
												Logout
											</a>
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
