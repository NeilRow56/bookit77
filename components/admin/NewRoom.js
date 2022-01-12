import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ClientOnly from '../ClientOnly';
import NextLink from 'next/link';
import {
	Image,
	Input,
	FormLabel,
	FormControl,
	Checkbox,
	Text,
	Flex,
	Select,
	Heading,
	Container,
	IconButton,
	Link,
	Center,
	Spinner,
	Box,
	Button,
} from '@chakra-ui/react';
import ButtonLoader from '../../components/ButtonLoader';

import { toast } from 'react-toastify';
import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import { newRoom, clearErrors } from '../../redux/actions/roomActions';
import { NEW_ROOM_RESET } from '../../redux/constants/roomConstants';

function NewRoom() {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [address, setAddress] = useState('');
	const [category, setCategory] = useState('King');
	const [guestCapacity, setGuestCapacity] = useState(1);
	const [numOfBeds, setNumOfBeds] = useState(1);
	const [internet, setInternet] = useState(false);
	const [breakfast, setBreakfast] = useState(false);
	const [airConditioned, setAirConditioned] = useState(false);
	const [petsAllowed, setPetsAllowed] = useState(false);
	const [roomCleaning, setRoomCleaning] = useState(false);

	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

	const dispatch = useDispatch();
	const router = useRouter();

	const { loading, error, success } = useSelector((state) => state.newRoom);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			router.push('/admin/rooms');
			dispatch({ type: NEW_ROOM_RESET });
		}
	}, [dispatch, error, success]);

	const submitHandler = (e) => {
		e.preventDefault();

		const roomData = {
			name,
			pricePerNight: price,
			description,
			address,
			category,
			guestCapacity: Number(guestCapacity),
			numOfBeds: Number(numOfBeds),
			internet,
			breakfast,
			airConditioned,
			petsAllowed,
			roomCleaning,
			images,
		};

		if (images.length === 0) return toast.error('Please upload images.');

		dispatch(newRoom(roomData));
	};

	const onChange = (e) => {
		const files = Array.from(e.target.files);

		setImages([]);
		setImagesPreview([]);

		files.forEach((file) => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImages((oldArray) => [...oldArray, reader.result]);
					setImagesPreview((oldArray) => [
						...oldArray,
						reader.result,
					]);
				}
			};

			reader.readAsDataURL(file);
		});
	};

	return (
		<Flex width="full" align="center" justifyContent="center">
			<Box
				p={8}
				marginTop="75px"
				width="700px"
				borderWidth={1}
				borderRadius={8}
				boxShadow="lg"
			>
				<Box textAlign="center">
					<Heading color="#cc0000">New Room</Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form
						onSubmit={submitHandler}
						encType="multipart/form-data"
					>
						<ClientOnly>
							<FormControl>
								<FormLabel htmlFor="name_field">Name</FormLabel>
								<Input
									type="text"
									id="name_field"
									name="name"
									value={name}
									size="lg"
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="price_field">
									Price
								</FormLabel>
								<Input
									type="text"
									id="price_field"
									name="price"
									value={price}
									size="lg"
									onChange={(e) => setPrice(e.target.value)}
									required
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="description_field">
									Description
								</FormLabel>
								<Input
									type="text"
									id="description_field"
									name="description"
									value={description}
									size="lg"
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="address_field">
									Address
								</FormLabel>
								<Input
									type="text"
									id="address_field"
									name="address"
									value={address}
									size="lg"
									onChange={(e) => setAddress(e.target.value)}
								/>
							</FormControl>
							<FormControl>
								<FormLabel htmlFor="category_field">
									Category
								</FormLabel>
								<Select
									className="form-control"
									id="room_type_field"
									value={category}
									onChange={(e) =>
										setCategory(e.target.value)
									}
								>
									{['King', 'Single', 'Twins'].map(
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
							<FormControl>
								<FormLabel htmlFor="guest_field">
									Guest(s)
								</FormLabel>
								<Select
									className="form-control"
									id="guest_field"
									value={guestCapacity}
									onChange={(e) =>
										setGuestCapacity(e.target.value)
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
								<FormLabel htmlFor="beds_field">
									Number of Beds
								</FormLabel>
								<Select
									className="form-control"
									id="numofbeds_field"
									value={numOfBeds}
									onChange={(e) =>
										setNumOfBeds(e.target.value)
									}
								>
									{[1, 2, 3].map((num) => (
										<option key={num} value={num}>
											{num}
										</option>
									))}
								</Select>
							</FormControl>
							<FormControl>
								<FormLabel color="#cc0000" fontSize="20px">
									Room Features
								</FormLabel>
								<Checkbox
									type="checkbox"
									id="internet_checkbox"
									value={internet}
									onChange={(e) =>
										setInternet(e.target.checked)
									}
								/>
								<FormLabel>Internet</FormLabel>
							</FormControl>
							<FormControl>
								<Checkbox
									type="checkbox"
									id="breakfast_checkbox"
									value={breakfast}
									onChange={(e) =>
										setBreakfast(e.target.checked)
									}
								/>
								<FormLabel>Breakfast</FormLabel>
							</FormControl>
							<FormControl>
								<Checkbox
									type="checkbox"
									id="airConditioned_checkbox"
									value={airConditioned}
									onChange={(e) =>
										setAirConditioned(e.target.checked)
									}
								/>
								<FormLabel>Air Conditioned</FormLabel>
							</FormControl>
							<FormControl>
								<Checkbox
									type="checkbox"
									id="petsAllowed_checkbox"
									value={petsAllowed}
									onChange={(e) =>
										setPetsAllowed(e.target.checked)
									}
								/>
								<FormLabel>Pets Allowed</FormLabel>
							</FormControl>
							<FormControl>
								<Checkbox
									type="checkbox"
									id="roomCleaning_checkbox"
									value={roomCleaning}
									onChange={(e) =>
										setRoomCleaning(e.target.checked)
									}
								/>
								<FormLabel>Room Cleaning</FormLabel>
							</FormControl>

							<FormControl>
								<FormLabel>Images</FormLabel>

								<Input
									type="file"
									id="customFile"
									name="room_images"
									onChange={onChange}
									multiple
								/>
								<FormLabel htmlFor="customFile">
									Choose Images
								</FormLabel>

								{imagesPreview.map((img) => (
									<img
										src={img}
										key={img}
										alt="Images Preview"
										className="mt-3 mr-2"
										width="55"
										height="52"
									/>
								))}
							</FormControl>
						</ClientOnly>
						<Button
							disabled={loading ? true : false}
							bg="#cc0000"
							type="submit"
							width="full"
							color="#fff"
							mt={4}
							mb={2}
						>
							{loading ? <Spinner color="#cc0000" /> : 'CREATE'}
						</Button>
						<br />
					</form>
				</Box>
			</Box>
		</Flex>
	);
}

export default NewRoom;
