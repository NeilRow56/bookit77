import React, { useEffect } from 'react';
import ButtonLoader from '../../components/ButtonLoader';
import { MDBDataTable } from 'mdbreact';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
	Text,
	Container,
	IconButton,
	Link,
	Center,
	Box,
	Button,
} from '@chakra-ui/react';

import { EditIcon, ViewIcon, DeleteIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAdminUsers,
	deleteUser,
	clearErrors,
} from '../../redux/actions/userActions';
import { DELETE_USER_RESET } from '../../redux/constants/userConstants';

const AllUsers = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { loading, error, users } = useSelector((state) => state.allUsers);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.user
	);

	useEffect(() => {
		dispatch(getAdminUsers());

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			router.push('/admin/users');
			dispatch({ type: DELETE_USER_RESET });
		}
	}, [dispatch, error, isDeleted]);

	const setUsers = () => {
		const data = {
			columns: [
				{
					label: 'User ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Name',
					field: 'name',
					sort: 'asc',
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc',
				},
				{
					label: 'Role',
					field: 'role',
					sort: 'asc',
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'asc',
				},
			],
			rows: [],
		};

		users &&
			users.forEach((user) => {
				data.rows.push({
					id: user._id,
					name: user.name,
					email: user.email,
					role: user.role,

					actions: (
						<>
							<NextLink
								href={`/admin/users/${user._id}`}
								passHref
							>
								<Link>
									<IconButton
										aria-label="Edit Icon"
										bg="blue.100"
										mx={2}
										icon={
											<EditIcon
												bg="blue.100"
												size="lg"
												mx={2}
											/>
										}
									/>
								</Link>
							</NextLink>
							<IconButton
								aria-label="delete icon"
								bg="red.600"
								mx={2}
								onClick={() => deleteUserHandler(user._id)}
								icon={
									<DeleteIcon
										bg="red.600"
										color="#fff"
										size="lg"
										mx={2}
									/>
								}
							/>
						</>
					),
				});
			});

		return data;
	};

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
	};

	return (
		<Container maxW="container.xl">
			{loading ? (
				<ButtonLoader />
			) : (
				<>
					<Center>
						<Text fontWeight="bold" fontSize="24px">
							{`${users && users.length} Users`}
						</Text>
					</Center>

					<MDBDataTable
						data={setUsers()}
						className="px-3"
						bordered
						striped
						hover
					/>
				</>
			)}
		</Container>
	);
};

export default AllUsers;
