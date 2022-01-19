import React, { useEffect, useState } from 'react';
import ButtonLoader from '../../components/ButtonLoader';
import ClientOnly from '../ClientOnly';
import { useRouter } from 'next/router';

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

import { EditIcon, ViewIcon, DeleteIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateUser,
	getUserDetails,
	clearErrors,
} from '../../redux/actions/userActions';
import { UPDATE_USER_RESET } from '../../redux/constants/userConstants';

const UpdateUser = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');

	const dispatch = useDispatch();
	const router = useRouter();

	const { error, isUpdated } = useSelector((state) => state.user);
	const { user, loading } = useSelector((state) => state.userDetails);

	const userId = router.query.id;

	useEffect(() => {
		if (user && user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setRole(user.role);
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			router.push('/admin/users');
			dispatch({ type: UPDATE_USER_RESET });
		}
	}, [dispatch, isUpdated, userId, user, error]);

	const submitHandler = (e) => {
		e.preventDefault();

		const userData = {
			name,
			email,
			role,
		};

		dispatch(updateUser(user._id, userData));
	};

	return (
		<>
			{loading ? (
				<ButtonLoader />
			) : (
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
							<Heading color="#cc0000">Update User</Heading>
						</Box>
						<Box my={4} textAlign="left">
							<form onSubmit={submitHandler}>
								<ClientOnly>
									<FormControl>
										<FormLabel htmlFor="name_field">
											Name
										</FormLabel>
										<Input
											type="text"
											id="name_field"
											name="name"
											value={name}
											size="lg"
											onChange={(e) =>
												setName(e.target.value)
											}
										/>
									</FormControl>
									<FormControl>
										<FormLabel htmlFor="email_field">
											Email
										</FormLabel>
										<Input
											type="text"
											id="email_field"
											name="email"
											value={email}
											size="lg"
											onChange={(e) =>
												setEmail(e.target.value)
											}
										/>
									</FormControl>
									<FormControl>
										<FormLabel htmlFor="role_field">
											Role
										</FormLabel>
										<Select
											className="form-control"
											id="role_field"
											value={role}
											onChange={(e) =>
												setRole(e.target.value)
											}
										>
											{['User', 'Admin'].map((role) => (
												<option key={role} value={role}>
													{role}
												</option>
											))}
										</Select>
									</FormControl>
								</ClientOnly>
								<Button
									bg="#cc0000"
									type="submit"
									width="full"
									color="#fff"
									mt={4}
									mb={2}
								>
									Update
								</Button>
								<br />
							</form>
						</Box>
					</Box>
				</Flex>
			)}
		</>
	);
};

export default UpdateUser;
