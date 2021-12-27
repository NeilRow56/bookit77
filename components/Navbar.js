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
	VStack,
	Center,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon, ArrowDownIcon } from '@chakra-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../redux/actions/userActions';
import { signOut } from 'next-auth/react';

export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const router = useRouter();
	const isActive = router.pathname === '/login';

	const dispatch = useDispatch();

	const { user, loading } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		signOut();
	};
	useEffect(() => {
		if (!user) {
			dispatch(loadUser());
		}
	}, [dispatch]);

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
							<NextLink href={'/register'} passHref>
								<Link>Register</Link>
							</NextLink>
							<NextLink href={'/login'} passHref>
								<Link color={isActive ? 'blue' : 'red'}>
									Login
								</Link>
							</NextLink>
							<NextLink href="/logout" passHref>
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
								{user && (
									<Menu>
										<Flex>
											<MenuButton
												as={Button}
												rounded={'full'}
												variant={'link'}
												cursor={'pointer'}
												minW={40}
												mx={5}
												align="center"
												color="#cc0000"
											>
												{/* <Avatar
													size={'sm'}
													src={
														user.avatar &&
														user.avatar.url
													}
													alt={user && user.name}
												/> */}

												<Flex>
													<Text mx="auto">
														{user.name} Menu
													</Text>
													<ArrowDownIcon />
												</Flex>
											</MenuButton>
										</Flex>
										<MenuList alignItems={'center'}>
											<br />
											<Center>
												<Avatar
													size={'lg'}
													src={
														user.avatar &&
														user.avatar.url
													}
													alt={user && user.name}
												/>
											</Center>
											<br />
											<Center>
												<p>{user.name}</p>
											</Center>
											<br />
											<MenuDivider />
											<MenuItem>
												<NextLink
													href="/bookings/me"
													passHref
												>
													<Link>My Bookings</Link>
												</NextLink>
											</MenuItem>
											<MenuItem>
												<NextLink
													href="/me/update"
													passHref
												>
													<Link>Profile</Link>
												</NextLink>
											</MenuItem>

											<MenuItem>
												<NextLink href="/" passHref>
													<Link
														onClick={logoutHandler}
														color="#221100"
													>
														Logout
													</Link>
												</NextLink>
											</MenuItem>
										</MenuList>
									</Menu>
								)}
							</ClientOnly>
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
