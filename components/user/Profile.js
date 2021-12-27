import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import ClientOnly from '../ClientOnly';
import { Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearErrors } from '../../redux/actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
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

import { toast } from 'react-toastify';

const Profile = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = user;

	const [avatar, setAvatar] = useState('');
	const [avatarPreview, setAvatarPreview] = useState(
		'/images/default_avatar.jpg'
	);

	const { user: loadedUser, loading } = useSelector((state) => state.auth);
	const {
		error,
		isUpdated,
		loading: updateLoading,
	} = useSelector((state) => state.user);

	useEffect(() => {
		if (loadedUser) {
			setUser({
				name: loadedUser.name,
				email: loadedUser.email,
			});
			setAvatarPreview(loadedUser.avatar.url);
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			router.push('/');
			dispatch({ type: UPDATE_PROFILE_RESET });
		}
	}, [dispatch, isUpdated, error, loadedUser]);

	const submitHandler = (e) => {
		e.preventDefault();

		const userData = {
			name,
			email,
			password,
			avatar,
		};

		dispatch(updateProfile(userData));
	};

	const onChange = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatar(reader.result);
					setAvatarPreview(reader.result);
				}
			};

			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	return (
		<>
			{loading ? (
				<Spinner />
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
							<Heading color="#cc0000">Update Profile</Heading>
						</Box>
						<Box my={4} textAlign="left">
							<form onSubmit={submitHandler}>
								<ClientOnly>
									<FormControl>
										<FormLabel htmlFor="name">
											Name
										</FormLabel>
										<Input
											type="text"
											id="name"
											placeholder="Name"
											name="name"
											value={name}
											size="lg"
											onChange={onChange}
										/>
									</FormControl>
									<FormControl>
										<FormLabel htmlFor="email">
											Email
										</FormLabel>
										<Input
											type="text"
											id="email"
											placeholder="Email address"
											name="email"
											value={email}
											size="lg"
											onChange={onChange}
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
											name="password"
											value={password}
											size="lg"
											onChange={onChange}
										/>
									</FormControl>
									<FormControl>
										<FormLabel htmlFor="avatar">
											Avatar
										</FormLabel>
										<Image
											src={avatarPreview}
											alt="image"
											borderRadius="full"
											// height="100px"
											boxSize="100px"
										/>
										<Input
											type="file"
											id="customFile"
											name="avatar"
											accept="/images/*"
											onChange={onChange}
										/>
										<FormLabel htmlFor="choose_avatar">
											Choose Avatar
										</FormLabel>
									</FormControl>
								</ClientOnly>
								<Button
									disabled={updateLoading ? true : false}
									bg="#cc0000"
									type="submit"
									width="full"
									color="#fff"
									mt={4}
									mb={2}
								>
									{updateLoading ? (
										<Spinner color="#cc0000" />
									) : (
										'UPDATE'
									)}
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

export default Profile;
