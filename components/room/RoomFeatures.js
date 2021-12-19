import React from 'react';
import { Text, Center, Icon, Flex } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { FaBed, FaUsers } from 'react-icons/fa';

function RoomFeatures({ room }) {
	return (
		<>
			<Flex>
				<Text fontSize="2xl" color="#cc0000">
					Features:
				</Text>
			</Flex>

			<Flex>
				<Flex mt={1} marginEnd={2}>
					{' '}
					<Icon as={FaUsers} />
				</Flex>{' '}
				{room.guestCapacity} Guests
			</Flex>
			<Flex>
				<Flex mt={1} marginEnd={2}>
					{' '}
					<Icon as={FaBed} />
				</Flex>{' '}
				{room.numOfBeds} Bed(s)
			</Flex>
			<Flex>
				<Center>
					{(() => {
						if (room.breakfast) {
							return <CheckIcon color="green.400" />;
						} else {
							return <CloseIcon color="red.400" />;
						}
					})()}{' '}
				</Center>
				<Text mx="10px"> Breakfast Included</Text>
			</Flex>
			<Flex>
				<Center>
					{(() => {
						if (room.internet) {
							return <CheckIcon color="green.400" />;
						} else {
							return <CloseIcon color="red.400" />;
						}
					})()}{' '}
				</Center>
				<Text mx="10px"> Internet</Text>
			</Flex>
			<Flex>
				<Center>
					{(() => {
						if (room.airConditioned) {
							return <CheckIcon color="green.400" />;
						} else {
							return <CloseIcon color="red.400" />;
						}
					})()}{' '}
				</Center>
				<Text mx="10px"> Air Conditioning</Text>
			</Flex>
			<Flex>
				<Center>
					{(() => {
						if (room.petsAllowed) {
							return <CheckIcon color="green.400" />;
						} else {
							return <CloseIcon color="red.400" />;
						}
					})()}{' '}
				</Center>
				<Text mx="10px"> Pets Allowed</Text>
			</Flex>
			<Flex>
				<Center>
					{(() => {
						if (room.roomCleaning) {
							return <CheckIcon color="green.400" />;
						} else {
							return <CloseIcon color="red.400" />;
						}
					})()}{' '}
				</Center>
				<Text mx="10px"> Room Cleaning</Text>
			</Flex>
		</>
	);
}

export default RoomFeatures;
