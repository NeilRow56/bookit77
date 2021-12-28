import React, { useState } from 'react';
import ClientOnly from '../ClientOnly';
import { ButtonLoader } from '../../components/ButtonLoader';
import NextLink from 'next/link';
import {
	Flex,
	Heading,
	Link,
	Input,
	Select,
	Button,
	Box,
	FormLabel,
	FormControl,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

import { toast } from 'react-toastify';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();

		setLoading(true);

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		setLoading(false);

		if (result.error) {
			toast.error(result.error);
		} else {
			window.location.href = '/';
		}
	};

	return (
		<Flex width="full" align="center" justifyContent="center">
			<Box
				p={8}
				marginTop="150px"
				width="800px"
				borderWidth={1}
				borderRadius={8}
				boxShadow="lg"
			>
				<Box textAlign="center">
					<Heading color="#cc0000">Login</Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form onSubmit={submitHandler}>
						<ClientOnly>
							<FormControl>
								<FormLabel htmlFor="email">Email</FormLabel>
								<Input
									type="text"
									id="email"
									placeholder="Email address"
									value={email}
									size="lg"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="password">
									Password
								</FormLabel>
								<Input
									type="password"
									id="password"
									placeholder="Password"
									value={password}
									size="lg"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</FormControl>
							<br />
							<NextLink href="/password/forgot" passHref>
								<Link color="#cc0000">Forgotten Password?</Link>
							</NextLink>
						</ClientOnly>
						<Button
							disabled={loading ? true : false}
							bg="#cc0000"
							type="submit"
							width="full"
							color="#fff"
							mt={4}
							mb={2}
						>
							Login
						</Button>
						<br />
						<NextLink href="/register" passHref>
							<Link color="blue.500">New User?</Link>
						</NextLink>
					</form>
				</Box>
			</Box>
		</Flex>
	);
};

export default Login;
