import Head from 'next/head';
import React, { useEffect } from 'react';
import RoomFeatures from './RoomFeatures';
import { StarIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import {
	Text,
	Button,
	Center,
	Heading,
	Flex,
	Container,
	Box,
} from '@chakra-ui/react';
import { Carousel } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors } from '../../redux/actions/roomActions';

const RoomDetails = () => {
	const dispatch = useDispatch();
	const { room, error } = useSelector((state) => state.roomDetails);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors);
		}
	}, []);
	return (
		<>
			<Head>
				<title>{room.name}- BookIT</title>
			</Head>
			<Container maxWidth="900px">
				<Heading>{room.name}</Heading>
				<Flex>
					<Text fontSize="2xl" color="#cc0000">
						{room.address}
					</Text>
				</Flex>
				<Box display="flex" mt="2" alignItems="center">
					{Array(5)
						.fill('')
						.map((_, i) => (
							<StarIcon
								key={i}
								color={
									i < room.ratings ? '#f1c232' : 'gray.300'
								}
							/>
						))}
					<Box as="span" ml="2" color="gray.600" fontSize="sm">
						( {room.numOfReviews} Reviews )
					</Box>
				</Box>
				<br />

				<Carousel hover="pause">
					{room.images &&
						room.images.map((image) => (
							<Carousel.Item key={image.public_id}>
								<div style={{ width: '100%', height: '540px' }}>
									<Image
										className="d-block m-auto"
										src={image.url}
										alt={room.name}
										layout="fill"
									/>
								</div>
							</Carousel.Item>
						))}
				</Carousel>
				<br />
				<Box display={{ md: 'flex' }}>
					<Box mt={{ base: 4, md: 0 }} ml={{ md: 0 }}>
						<Text
							fontSize="2xl"
							color="#cc0000"
							letterSpacing="wide"
							color="#cc0000"
						>
							Description
						</Text>
						<Box width="625px">
							<Text mt={2} color="gray.500">
								{room.description}
							</Text>
						</Box>
					</Box>

					<Box
						border="1px"
						borderColor="gray.200"
						width="320px"
						borderRadius={15}
					>
						<Center mt={5}>
							<Text fontWeight="bold">Price per night</Text>
						</Center>

						<Center>
							<Text fontWeight="bold">
								£ {room.pricePerNight}
							</Text>
						</Center>

						<Center>
							<br />
							<br />
							<br />
							<Button bg="#cc0000" color="#fff">
								Pay Now
							</Button>
						</Center>
					</Box>
				</Box>

				<br />
				<RoomFeatures room={room} />
			</Container>
		</>
	);
};

export default RoomDetails;
