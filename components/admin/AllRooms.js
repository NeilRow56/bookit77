import React, { useEffect } from 'react';
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
	Skeleton,
	SkeletonCircle,
	SkeletonText,
} from '@chakra-ui/react';

import { EditIcon, ViewIcon, DeleteIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminRooms } from '../../redux/actions/roomActions';

const AllRooms = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { loading, error, rooms } = useSelector((state) => state.allRooms);

	useEffect(() => {
		dispatch(getAdminRooms());

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch]);

	const setRooms = () => {
		const data = {
			columns: [
				{
					label: 'Room ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Name',
					field: 'name',
					sort: 'asc',
				},
				{
					label: 'Price / Night',
					field: 'price',
					sort: 'asc',
				},
				{
					label: 'Category',
					field: 'category',
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

		rooms &&
			rooms.forEach((room) => {
				data.rows.push({
					id: room._id,
					name: room.name,
					price: `£${room.pricePerNight}`,
					category: room.category,

					actions: (
						<>
							<NextLink
								href={`/admin/rooms/${room._id}`}
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

	return (
		<Container maxW="container.xl">
			{loading ? (
				<Box padding="6" boxShadow="lg" bg="#white">
					<SkeletonCircle size="10" />
					<SkeletonText mt="4" noOfLines={4} spacing="4" />
				</Box>
			) : (
				<>
					<Center>
						<Text fontWeight="bold" fontSize="24px">
							{`${rooms && rooms.length} Rooms`}
						</Text>
					</Center>

					<MDBDataTable
						data={setRooms()}
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

export default AllRooms;
