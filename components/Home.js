import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Pagination from 'react-js-pagination';
import { ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import {
	Text,
	Container,
	Alert,
	AlertIcon,
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

	let { location, page = 1 } = router.query;
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

	let count = roomsCount;
	if (location) {
		count = filteredRoomsCount;
	}

	return (
		<>
			<Container maxW="100%" overflow="hidden" align="center">
				<Text color="#cc0000" mb="30px" mt="30px" fontSize={32}>
					{location ? `Rooms in ${location} ` : 'All Rooms'}
				</Text>
				<Flex marginBottom="20px" align="Start">
					<ArrowBackIcon color="#cc0000" mt={1} mx={2} />{' '}
					<NextLink href="/search" passHref>
						<Link
							color="#cc0000"
							style={{ textDecoration: 'none' }}
						>
							{' '}
							Back to search
						</Link>
					</NextLink>
				</Flex>
				<Wrap spacing="20px" justify="center">
					{rooms && rooms.length === 0 ? (
						<Flex width="40%">
							<Alert status="error" width="100%">
								<AlertIcon />
								No Rooms matching search criteria
							</Alert>
						</Flex>
					) : (
						rooms &&
						rooms.map((room) => (
							<RoomItem key={room._id} room={room} />
						))
					)}
				</Wrap>
				<br />
				{resPerPage < count && (
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
