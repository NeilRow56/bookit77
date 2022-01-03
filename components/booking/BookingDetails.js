import React, { useEffect } from 'react';
import { ArrowBackIcon, ViewIcon, DownloadIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import NextLink from 'next/link';
import {
	Text,
	Heading,
	Container,
	Button,
	IconButton,
	Alert,
	AlertIcon,
	Box,
	Link,
	Wrap,
	Flex,
	Center,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/bookingActions';

function BookingDetails() {
	const dispatch = useDispatch();

	const { booking, error } = useSelector((state) => state.bookingDetails);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch]);

	return (
		<Flex width="full" align="center" justifyContent="center">
			<Box
				p={8}
				marginTop="30px"
				width="800px"
				borderWidth={1}
				borderRadius={8}
				boxShadow="lg"
			>
				<Box textAlign="center">
					<Heading color="#cc0000">Booking Details</Heading>
				</Box>
				<Box my={4} textAlign="left">
					{booking && booking.room && booking.user && (
						<>
							<Text fontSize="3xl" fontWeight="bold">
								Booking Ref: {booking._id}
							</Text>
							<br />
							<Text fontSize="2xl" fontWeight="bold">
								User Details:
							</Text>
							<br />

							<Text fontWeight="bold">
								Name: {booking.user && booking.user.name}
							</Text>
							<Text fontWeight="bold">
								Email: {booking.user && booking.user.email}
							</Text>
							<Text fontWeight="bold">
								Amount Paid: £ {booking.amountPaid}
							</Text>
							<br />
							<hr />
							<br />
							<Text fontSize="2xl" fontWeight="bold">
								Booking Information:
							</Text>
							<br />
							<Text fontWeight="bold">
								Check In:{' '}
								{new Date(
									booking.checkInDate
								).toLocaleDateString('en-GB')}
							</Text>
							<Text fontWeight="bold">
								Check Out:{' '}
								{new Date(
									booking.checkOutDate
								).toLocaleDateString('en-GB')}
							</Text>
							<Text fontWeight="bold">
								Days of Stay: {booking.daysOfStay}
							</Text>
							<br />
							<hr />
							<br />
							<Text fontSize="2xl" fontWeight="bold">
								Payment Status:
							</Text>
							<br />
							<hr />
							<br />
							<Text fontSize="2xl" fontWeight="bold">
								Booked Accommodation:
							</Text>
							<Flex flexDirection="row" mt={3}>
								<Image
									className="d-block m-auto"
									src={booking.room.images[0].url}
									alt={booking.room.name}
									height={45}
									width={65}
									mt={3}
								/>

								<NextLink
									href={`/room/${booking.room._id}`}
									passHref
								>
									<Link color="#cc0000" mx={2}>
										{booking.room.name}
									</Link>
								</NextLink>

								<br />
								<Flex textAlign="center" mx={2}>
									<Text fontWeight="bold" marginRight="10px">
										£ {booking.room.pricePerNight} / night
									</Text>
								</Flex>
								<Flex mx={3}>
									<Text fontWeight="bold">
										{booking.daysOfStay} Day(s)
									</Text>
								</Flex>
							</Flex>
						</>
					)}
				</Box>
			</Box>
		</Flex>
	);
}

export default BookingDetails;
