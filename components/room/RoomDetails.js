import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import RoomFeatures from './RoomFeatures';
import NewReview from '../review/NewReview';
import ListReviews from '../review/ListReviews';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import { StarIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
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
import {
	checkBooking,
	getBookedDates,
} from '../../redux/actions/bookingActions';
import { CHECK_BOOKING_RESET } from '../../redux/constants/bookingConstants';
import getStripe from '../../utils/getStripe';
import axios from 'axios';

const RoomDetails = () => {
	const [checkInDate, setCheckInDate] = useState();
	const [checkOutDate, setCheckOutDate] = useState();
	const [daysOfStay, setDaysOfStay] = useState();
	const [paymentLoading, setPaymentLoading] = useState(false);

	const dispatch = useDispatch();
	const router = useRouter();

	const { dates } = useSelector((state) => state.bookedDates);

	const { user } = useSelector((state) => state.loadedUser);
	const { room, error } = useSelector((state) => state.roomDetails);
	const { available, loading: bookingLoading } = useSelector(
		(state) => state.checkBooking
	);

	const excludedDates = [];
	dates.forEach((date) => {
		excludedDates.push(new Date(date));
	});

	const onChange = (dates) => {
		const [checkInDate, checkOutDate] = dates;

		setCheckInDate(checkInDate);
		setCheckOutDate(checkOutDate);

		if (checkInDate && checkOutDate) {
			// Calclate days of stay

			const days = Math.floor(
				(new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
			);

			setDaysOfStay(days);

			dispatch(
				checkBooking(
					id,
					checkInDate.toISOString(),
					checkOutDate.toISOString()
				)
			);
		}
	};

	const { id } = router.query;

	const newBookingHandler = async () => {
		const bookingData = {
			room: router.query.id,
			checkInDate,
			checkOutDate,
			daysOfStay,
			amountPaid: 90,
			paymentInfo: {
				id: 'STRIPE_PAYMENT_ID',
				status: 'STRIPE_PAYMENT_STATUS',
			},
		};

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const { data } = await axios.post(
				'/api/bookings',
				bookingData,
				config
			);

			console.log(data);
		} catch (error) {
			console.log(error.response);
		}
	};

	const bookRoom = async (id, pricePerNight) => {
		setPaymentLoading(true);

		const amount = pricePerNight * daysOfStay;

		try {
			const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`;

			const { data } = await axios.get(link, { params: { amount } });

			const stripe = await getStripe();

			// Redirect to checkout
			stripe.redirectToCheckout({ sessionId: data.id });

			setPaymentLoading(false);
		} catch (error) {
			setPaymentLoading(false);
			console.log(error);
			toast.error(error.message);
		}
	};

	useEffect(() => {
		dispatch(getBookedDates(id));

		toast.error(error);
		dispatch(clearErrors());

		return () => {
			dispatch({ type: CHECK_BOOKING_RESET });
		};
	}, [dispatch, id]);

	return (
		<>
			<Head>
				<title>{room.name}- BookIT</title>
			</Head>
			<Container maxWidth="1100px">
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
						<Box width="725px">
							<Text mt={2} color="gray.500">
								{room.description}
							</Text>
						</Box>
						<br />
						<RoomFeatures room={room} />
					</Box>

					<Box
						border="1px"
						borderColor="gray.200"
						width="375px"
						borderRadius={15}
					>
						<Center my={1}>
							<Text fontWeight="bold">Price per night</Text>
						</Center>

						<Center my={1}>
							<Text fontWeight="bold">
								£ {room.pricePerNight}
							</Text>
						</Center>
						<hr />
						<Center>
							<Text color="#cc0000" my={3}>
								Select Check In and Check Out dates
							</Text>
						</Center>
						<Center>
							<DatePicker
								className="w-100"
								selected={checkInDate}
								onChange={onChange}
								startDate={checkInDate}
								endDate={checkOutDate}
								minDate={new Date()}
								excludeDates={excludedDates}
								selectsRange
								inline
							/>
						</Center>
						{available === true && (
							<Alert
								status="success"
								alignItems="center"
								justifyContent="center"
								textAlign="center"
								borderRadius="10px"
							>
								<AlertIcon />
								Room is available.
							</Alert>
						)}

						{available === false && (
							<Alert
								status="error"
								alignItems="center"
								justifyContent="center"
								textAlign="center"
								borderRadius="10px"
							>
								<AlertIcon />
								Room not available. Try different dates.
							</Alert>
						)}

						{available && !user && (
							<Alert
								status="error"
								alignItems="center"
								justifyContent="center"
								textAlign="center"
								borderRadius="10px"
							>
								<AlertIcon />
								Login to book a room.
							</Alert>
						)}

						<Center>
							<br />
							<br />
							<br />
							{available && user && (
								<Button
									bg="#cc0000"
									color="#fff"
									onClick={() =>
										bookRoom(room._id, room.pricePerNight)
									}
									disabled={
										bookingLoading || paymentLoading
											? true
											: false
									}
								>
									Pay - £ {daysOfStay * room.pricePerNight}
								</Button>
							)}
						</Center>
					</Box>
				</Box>

				<br />
				<NewReview />
				{room.reviews && room.reviews.length > 0 ? (
					<ListReviews reviews={room.reviews} />
				) : (
					<p>
						<b>No Reviews for this room</b>
					</p>
				)}
			</Container>
		</>
	);
};

export default RoomDetails;
