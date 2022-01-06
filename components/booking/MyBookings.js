import React, { useEffect } from 'react';
import { ArrowBackIcon, ViewIcon, DownloadIcon } from '@chakra-ui/icons';
import { MDBDataTable } from 'mdbreact';
import easyinvoice from 'easyinvoice';
import NextLink from 'next/link';
import { Text, Container, IconButton, Link, Center } from '@chakra-ui/react';
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
								onClick={() => downloadInvoice(booking)}
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

	const downloadInvoice = async (booking) => {
		const data = {
			customize: {},

			images: {
				// The logo on top of your invoice
				logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png',
				// The invoice background
				// background:
				// 	'https://public.easyinvoice.cloud/img/watermark-draft.jpg',
			},
			// Your own data
			sender: {
				company: 'Bookit',
				address: '28 Stag Road',
				city: 'NN14 6GD',
				zip: 'Rothwell',
				country: 'England',

				custom3: 'VAT Number: 123 456 789',
			},
			// Your recipient
			client: {
				company: `${booking.user.name}`,
				address: `${booking.user.email}`,
				zip: 'BOOKING DATES',
				custom1: `check In: ${new Date(
					booking.checkInDate
				).toLocaleDateString('en-GB')}`,
				custom2: `check Out: ${new Date(
					booking.checkOutDate
				).toLocaleDateString('en-GB')}`,
				// "custom3": "custom value 3"
			},
			information: {
				// Invoice number
				number: `${booking._id}`,
				// Invoice data
				date: `${new Date(Date.now()).toLocaleString('en-GB')}`,
				// Invoice due date
				'due-date': `${new Date(Date.now()).toLocaleString('en-GB')}`,
			},

			products: [
				{
					quantity: `${booking.daysOfStay}`,
					description: `${booking.room.name}`,
					'tax-rate': 20,
					price: booking.room.pricePerNight,
				},
			],
			// The message you would like to display on the bottom of your invoice
			'bottom-notice':
				'This is an auto generated Invoice of your booking with Book IT.',
			// Settings to customize your invoice
			settings: {
				currency: 'GBP', // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
				locale: 'en-GB', // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
				'tax-notation': 'VAT', // Defaults to 'vat'
				'margin-top': 25, // Defaults to '25'
				'margin-right': 25, // Defaults to '25'
				'margin-left': 25, // Defaults to '25'
				'margin-bottom': 25, // Defaults to '25'
				format: 'A4', // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
			},
			// Translate your invoice to your preferred language
			translate: {},
		};
		const result = await easyinvoice.createInvoice(data);
		easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf);
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
