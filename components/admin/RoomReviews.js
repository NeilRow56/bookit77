import React, { useEffect, useState } from 'react';
import ButtonLoader from '../../components/ButtonLoader';
import { MDBDataTable } from 'mdbreact';
import { useRouter } from 'next/router';

import {
	Text,
	Container,
	Flex,
	IconButton,
	Link,
	Center,
	Box,
	Button,
} from '@chakra-ui/react';

import { EditIcon, ViewIcon, DeleteIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
	getRoomReviews,
	deleteReview,
	clearErrors,
} from '../../redux/actions/roomActions';
import { DELETE_REVIEW_RESET } from '../../redux/constants/roomConstants';

const RoomReviews = () => {
	const [roomId, setRoomId] = useState('');

	const dispatch = useDispatch();
	const router = useRouter();

	const { loading, error, reviews } = useSelector(
		(state) => state.roomReviews
	);
	const { error: deleteError, isDeleted } = useSelector(
		(state) => state.review
	);

	useEffect(() => {
		if (error) {
			toast.error(error);
			dispatch(clearErrors());
		}

		if (roomId !== '') {
			dispatch(getRoomReviews(roomId));
		}

		if (deleteError) {
			toast.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			toast.success('Review is deleted.');
			dispatch({ type: DELETE_REVIEW_RESET });
		}
	}, [dispatch, error, roomId, deleteError, isDeleted]);

	const setReviews = () => {
		const data = {
			columns: [
				{
					label: 'Review ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Rating',
					field: 'rating',
					sort: 'asc',
				},
				{
					label: 'Comment',
					field: 'comment',
					sort: 'asc',
				},
				{
					label: 'User',
					field: 'user',
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

		reviews &&
			reviews.forEach((review) => {
				data.rows.push({
					id: review._id,
					rating: review.rating,
					comment: review.comment,
					user: review.name,

					actions: (
						<IconButton
							aria-label="delete icon"
							bg="red.600"
							mx={2}
							onClick={() => deleteReviewHandler(review._id)}
							icon={
								<DeleteIcon
									bg="red.600"
									color="#fff"
									size="lg"
									mx={2}
								/>
							}
						/>
					),
				});
			});

		return data;
	};

	const deleteReviewHandler = (id) => {
		dispatch(deleteReview(id, roomId));
	};

	return (
		<Container maxW="container.xl">
			<div className="row justify-content-center mt-5">
				<div className="col-5">
					<form>
						<div className="form-group">
							<label htmlFor="roomId_field">Enter Room ID</label>
							<input
								type="email"
								id="roomId_field"
								className="form-control"
								value={roomId}
								onChange={(e) => setRoomId(e.target.value)}
							/>
						</div>
					</form>
				</div>
			</div>

			{reviews && reviews.length > 0 ? (
				<MDBDataTable
					data={setReviews()}
					className="px-3"
					bordered
					striped
					hover
				/>
			) : (
				<Flex>
					<Text color="orange.500">No Reviews</Text>
				</Flex>
			)}
		</Container>
	);
};

export default RoomReviews;
