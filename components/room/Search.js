import React, { useState } from 'react';
import ClientOnly from '../ClientOnly';
import { useRouter } from 'next/router';
import {
	Flex,
	Heading,
	Input,
	Select,
	Button,
	Box,
	FormLabel,
	FormControl,
} from '@chakra-ui/react';

const Search = () => {
	const [location, setLocation] = useState('');
	const [guests, setGuests] = useState('');
	const [category, setCategory] = useState('');

	const router = useRouter();

	const submitHandler = (event) => {
		event.preventDefault();

		if (location.trim()) {
			router.push(
				`/?location=${location}&guests=${guests}&category=${category}`
			);
		} else {
			router.push('/');
		}
	};
	return (
		<Flex width="full" align="center" justifyContent="center">
			<Box
				p={8}
				marginTop="150px"
				width="800px"
				borderWidth={1}
				borderRadius={8}
				boxShadow="lg"
			>
				<Box textAlign="center">
					<Heading color="#cc0000">Search Rooms</Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form onSubmit={submitHandler}>
						<ClientOnly>
							<FormControl>
								<FormLabel htmlFor="location">
									Location
								</FormLabel>
								<Input
									type="text"
									id="location"
									placeholder="Location"
									value={location}
									size="lg"
									onChange={(event) =>
										setLocation(event.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="guest_field">
									No. of Guests
								</FormLabel>
								<Select
									id="guest_field"
									value={guests}
									onChange={(event) =>
										setGuests(event.target.value)
									}
								>
									{[1, 2, 3, 4, 5, 6].map((num) => (
										<option key={num} value={num}>
											{num}
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="room_type_field">
									Room Type
								</FormLabel>
								<Select
									id="room_type_field"
									value={category}
									onChange={(event) =>
										setCategory(event.target.value)
									}
									placeholder="Select room type"
								>
									{['King', 'Single', 'Twin Beds'].map(
										(category) => (
											<option
												key={category}
												value={category}
											>
												{category}
											</option>
										)
									)}
								</Select>
							</FormControl>
						</ClientOnly>
						<Button
							bg="#cc0000"
							type="submit"
							width="full"
							color="#fff"
							mt={4}
						>
							Search
						</Button>
					</form>
				</Box>
			</Box>
		</Flex>
	);
};

export default Search;
