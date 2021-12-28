import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import ClientOnly from '../ClientOnly';
import { Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../redux/actions/userActions';

import {
	Flex,
	Heading,
	Link,
	Image,
	Input,
	Select,
	Button,
	Box,
	FormLabel,
	FormControl,
} from '@chakra-ui/react';

import { toast } from 'react-toastify';

function ForgotPassword() {
	const [email, setEmail] = useState('');

	const dispatch = useDispatch();

	const { error, loading, message } = useSelector(
		(state) => state.forgotPassword
	);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (message) {
			toast.success(message);
		}
	}, [dispatch, message, error]);

	const submitHandler = (e) => {
		e.preventDefault();

		const userData = {
			email,
		};

		dispatch(forgotPassword(userData));
	};

	return (
		<Flex width="full" align="center" justifyContent="center">
			<Box
				p={8}
				marginTop="75px"
				width="700px"
				borderWidth={1}
				borderRadius={8}
				boxShadow="lg"
			>
				<Box textAlign="center">
					<Heading color="#cc0000">Forgotten Password?</Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form onSubmit={submitHandler}>
						<ClientOnly>
							<FormControl>
								<FormLabel htmlFor="enter_email">
									Enter Email
								</FormLabel>
								<Input
									type="email"
									id="email"
									placeholder="Email"
									name="email"
									value={email}
									size="lg"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>
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
							{loading ? (
								<Spinner color="#cc0000" />
							) : (
								'Send Email'
							)}
						</Button>
						<br />
					</form>
				</Box>
			</Box>
		</Flex>
	);
}

export default ForgotPassword;
