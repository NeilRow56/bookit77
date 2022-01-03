import React, { useEffect } from 'react';
import { ArrowBackIcon, ViewIcon, DownloadIcon } from '@chakra-ui/icons';
import { MDBDataTable } from 'mdbreact';
import NextLink from 'next/link';
import {
	Text,
	Container,
	Button,
	IconButton,
	Alert,
	AlertIcon,
	Box,
	Link,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	Wrap,
	Flex,
	Center,
	LinkOverlay,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/bookingActions';

const MyBookings = () => {
	const dispatch = useDispatch();

	const { bookings, error } = useSelector((state) => state.bookings);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch]);

	const setBookings = () => {
		const data = {
			columns: [
				{
					label: 'Booking ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Check In',
					field: 'checkIn',
					sort: 'asc',
				},
				{
					label: 'Check Out',
					field: 'checkOut',
					sort: 'asc',
				},
				{
					label: 'Amount Paid',
					field: 'amount',
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

		bookings &&
			bookings.forEach((booking) => {
				data.rows.push({
					id: booking._id,
					checkIn: new Date(booking.checkInDate).toLocaleDateString(
						'en-GB'
					),
					checkOut: new Date(booking.checkOutDate).toLocaleDateString(
						'en-GB'
					),
					amount: `£ ${booking.amountPaid}`,
					actions: (
						<>
							<NextLink
								href={`/bookings/${booking._id}`}
								passHref
							>
								<Link>
									<IconButton
										aria-label="viewicon"
										bg="blue.100"
										mx={2}
										icon={
											<ViewIcon
												bg="blue.100"
												size="lg"
												mx={2}
											/>
										}
									/>
								</Link>
							</NextLink>
							<IconButton
								aria-label="download icon"
								bg="green.600"
								mx={2}
								icon={
									<DownloadIcon
										bg="green.600"
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
			<Center>
				<Text fontWeight="bold" fontSize="24px">
					My Bookings
				</Text>
			</Center>

			<MDBDataTable
				data={setBookings()}
				className="px-3"
				bordered
				striped
				hover
			/>
		</Container>
	);
};

export default MyBookings;
