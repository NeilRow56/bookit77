import React, { useState, useEffect } from 'react';

import ClientOnly from '../ClientOnly';
import { Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { resetPassword, clearErrors } from '../../redux/actions/userActions';

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

const NewPassword = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();
	const router = useRouter();

	const { error, loading, success } = useSelector(
		(state) => state.forgotPassword
	);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			router.push('/login');
		}
	}, [dispatch, success, error]);

	const submitHandler = (e) => {
		e.preventDefault();

		const passwords = {
			password,
			confirmPassword,
		};

		dispatch(resetPassword(router.query.token, passwords));
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
					<Heading color="#cc0000">New Password</Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form onSubmit={submitHandler}>
						<ClientOnly>
							<FormControl>
								<FormLabel htmlFor="password_field">
									New Password
								</FormLabel>
								<Input
									type="password"
									id="password"
									placeholder="Password"
									name="password"
									value={password}
									size="lg"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="confirm_password_field">
									Confirm Password
								</FormLabel>
								<Input
									type="password"
									id="password"
									placeholder="Password"
									name="password"
									value={confirmPassword}
									size="lg"
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
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
								'Set Password'
							)}
						</Button>
						<br />
					</form>
				</Box>
			</Box>
		</Flex>
	);
};

export default NewPassword;
