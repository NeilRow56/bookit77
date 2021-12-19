import React, { useEffect } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { Text, Container, Box, Link, Wrap } from '@chakra-ui/react';
import RoomItem from './room/RoomItem';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { clearErrors } from '../redux/actions/roomActions';

export default function Home() {
	const dispatch = useDispatch();
	const { rooms, error } = useSelector((state) => state.allRooms);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors);
		}
	}, []);

	return (
		<Container maxW="100%" overflow="hidden" align="center">
			<Text color="#cc0000" mb="30px" mt="30px" fontSize={32}>
				Stays in New York
			</Text>
			<Box marginBottom="20px" align="Start">
				<ArrowBackIcon color="secondary" />{' '}
				<NextLink href="/" passHref>
					<Link color="secondary" style={{ textDecoration: 'none' }}>
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
					rooms.map((room) => <RoomItem key={room._id} room={room} />)
				)}
			</Wrap>
		</Container>
	);
}
