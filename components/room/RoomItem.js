import React from 'react';
import { StarIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import NextLink from 'next/link';
import {
	Text,
	AspectRatio,
	Button,
	Center,
	Spacer,
	Flex,
	Container,
	Box,
	Badge,
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

function RoomItem({ room }) {
	return (
		<WrapItem>
			<LinkBox
				width="400px"
				boxShadow="sm"
				borderWidth="1px"
				rounded="20px"
				overflow="hidden"
			>
				<Image src={room.images[0].url} height={350} width={400} />

				<Box p="6">
					<Center display="flex" alignItems="baseline">
						<Badge borderRadius="full" px="2" colorScheme="teal">
							New
						</Badge>
						<Center
							color="gray.500"
							fontWeight="semibold"
							letterSpacing="wide"
							fontSize="xs"
							textTransform="uppercase"
							ml="2"
						>
							<NextLink href={`/room/${room._id}`} passHref>
								<LinkOverlay>
									<Center>{room.name}</Center>
								</LinkOverlay>
							</NextLink>
						</Center>
					</Center>

					<Center
						marginTop="5px"
						as="span"
						color="gray.600"
						fontSize="sm"
						display="flex"
					>
						<Center>
							<Text>Price per night: £ {room.pricePerNight}</Text>
						</Center>
					</Center>
					<Center>
						<Button
							size="sm"
							bg="#cc0000"
							color="#fff"
							mt={1}
							variant="secondaryOutline"
						>
							<Link href={`/room/${room._id}`}>View Details</Link>
						</Button>
					</Center>
					<Box display="flex" mt="2" alignItems="center">
						<Box display="flex" mt="2" alignItems="center">
							{Array(5)
								.fill('')
								.map((_, i) => (
									<StarIcon
										key={i}
										color={
											i < room.ratings
												? '#f1c232'
												: 'gray.300'
										}
									/>
								))}
						</Box>
						<Box as="span" ml="2" color="gray.600" fontSize="sm">
							<Text>{room.numOfReviews} Reviews</Text>
						</Box>
					</Box>
				</Box>
			</LinkBox>
		</WrapItem>
	);
}

export default RoomItem;
