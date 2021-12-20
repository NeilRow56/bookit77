import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Pagination from 'react-js-pagination';
import { ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import {
	Text,
	Container,
	Box,
	Link,
	Wrap,
	Flex,
	Center,
} from '@chakra-ui/react';
import RoomItem from './room/RoomItem';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { clearErrors } from '../redux/actions/roomActions';

export default function Home() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { rooms, resPerPage, roomsCount, filteredRoomsCount, error } =
		useSelector((state) => state.allRooms);

	let { page = 1 } = router.query;
	page = Number(page);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors);
		}
	}, []);

	const handlePagination = (pageNumber) => {
		router.push(`/?page=${pageNumber}`);
	};

	return (
		<>
			<Container maxW="100%" overflow="hidden" align="center">
				<Text color="#cc0000" mb="30px" mt="30px" fontSize={32}>
					Stays in New York
				</Text>
				<Box marginBottom="20px" align="Start">
					<ArrowBackIcon color="secondary" />{' '}
					<NextLink href="/" passHref>
						<Link
							color="secondary"
							style={{ textDecoration: 'none' }}
						>
							Back to search
						</Link>
					</NextLink>
				</Box>
				<Wrap spacing="20px" justify="center">
					{rooms && rooms.length === 0 ? (
						<Box alert alert-danger>
							<Text>No Rooms Found</Text>
						</Box>
					) : (
						rooms.map((room) => (
							<RoomItem key={room._id} room={room} />
						))
					)}
				</Wrap>
				<br />
				{resPerPage < roomsCount && (
					<Flex justifyContent="center">
						<Pagination
							activePage={page}
							itemsCountPerPage={resPerPage}
							totalItemsCount={roomsCount}
							onChange={handlePagination}
							nextPageText={'Next'}
							prevPageText={'Prev'}
							firstPageText={'First'}
							lastPageText={'Last'}
							itemClass="page-item"
							linkClass="page-link"
						/>
					</Flex>
				)}
			</Container>
		</>
	);
}
