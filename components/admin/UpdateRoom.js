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
import {
	updateRoom,
	getRoomDetails,
	clearErrors,
} from '../../redux/actions/roomActions';
import { UPDATE_ROOM_RESET } from '../../redux/constants/roomConstants';

function UpdateRoom() {
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
	const [oldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

	const dispatch = useDispatch();
	const router = useRouter();

	const { loading, error, isUpdated } = useSelector((state) => state.room);
	const {
		loading: roomDetailsLoading,
		error: roomDetailsError,
		room,
	} = useSelector((state) => state.roomDetails);

	const { id } = router.query;

	useEffect(() => {
		if (room && room._id !== id) {
			dispatch(getRoomDetails('', id));
		} else {
			setName(room.name);
			setPrice(room.pricePerNight);
			setDescription(room.description);
			setAddress(room.address);
			setCategory(room.category);
			setGuestCapacity(room.guestCapacity);
			setNumOfBeds(room.numOfBeds);
			setInternet(room.internet);
			setBreakfast(room.breakfast);
			setAirConditioned(room.airConditioned);
			setPetsAllowed(room.petsAllowed);
			setRoomCleaning(room.roomCleaning);
			setOldImages(room.images);
		}

		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (roomDetailsError) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			router.push('/admin/rooms');
			dispatch({ type: UPDATE_ROOM_RESET });
		}
	}, [dispatch, error, roomDetailsError, isUpdated, room, id]);

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
		};

		if (images.length !== 0) roomData.images = images;

		dispatch(updateRoom(room._id, roomData));
	};

	const onChange = (e) => {
		const files = Array.from(e.target.files);

		setImages([]);
		setOldImages([]);
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
		<>
			{roomDetailsLoading ? (
				<ButtonLoader />
			) : (
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
							<Heading color="#cc0000">Update Room</Heading>
						</Box>
						<Box my={4} textAlign="left">
							<form
								onSubmit={submitHandler}
								encType="multipart/form-data"
							>
								<ClientOnly>
									<FormControl>
										<FormLabel htmlFor="name_field">
											Name
										</FormLabel>
										<Input
											type="text"
											id="name_field"
											name="name"
											value={name}
											size="lg"
											onChange={(e) =>
												setName(e.target.value)
											}
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
											onChange={(e) =>
												setPrice(e.target.value)
											}
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
											onChange={(e) =>
												setAddress(e.target.value)
											}
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
										<FormLabel
											color="#cc0000"
											fontSize="20px"
										>
											Room Features
										</FormLabel>
										<Checkbox
											type="checkbox"
											id="internet_checkbox"
											value={internet}
											onChange={(e) =>
												setInternet(e.target.checked)
											}
											isChecked={internet}
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
											isChecked={breakfast}
										/>
										<FormLabel>Breakfast</FormLabel>
									</FormControl>
									<FormControl>
										<Checkbox
											type="checkbox"
											id="airConditioned_checkbox"
											value={airConditioned}
											onChange={(e) =>
												setAirConditioned(
													e.target.checked
												)
											}
											isChecked={airConditioned}
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
											isChecked={petsAllowed}
										/>
										<FormLabel>Pets Allowed</FormLabel>
									</FormControl>
									<FormControl>
										<Checkbox
											type="checkbox"
											id="roomCleaning_checkbox"
											value={roomCleaning}
											onChange={(e) =>
												setRoomCleaning(
													e.target.checked
												)
											}
											isChecked={roomCleaning}
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
										{oldImages &&
											oldImages.map((img) => (
												<img
													src={img.url}
													key={img.public_id}
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
									{loading ? (
										<Spinner color="#cc0000" />
									) : (
										'UPDATE'
									)}
								</Button>
								<br />
							</form>
						</Box>
					</Box>
				</Flex>
			)}
		</>
	);
}

export default UpdateRoom;
