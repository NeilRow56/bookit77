import { StarIcon, ArrowBackIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import {
	Text,
	AspectRatio,
	Button,
	Center,
	Spacer,
	Flex,
	Image,
	Container,
	Box,
	Badge,
	Link,
	LinkBox,
	LinkOverlay,
	UnorderedList,
	ListItem,
	Stack,
	Wrap,
	WrapItem,
	Grid,
	GridItem,
} from '@chakra-ui/react';
// import data from '../utils/data';

import { useSelector } from 'react-redux';
import RoomItem from './room/RoomItem';

export default function Home() {
	const { rooms } = useSelector((state) => state.allRooms);

	return (
		<Container maxW="100%" overflow="hidden" align="center">
			<Text mb="30px" mt="30px" fontSize={32}>
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
