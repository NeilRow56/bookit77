import { combineReducers } from 'redux';
import {
	allRoomsReducer,
	newRoomReducer,
	roomDetailsReducer,
	newReviewReducer,
	checkReviewReducer,
	roomReducer,
} from './roomReducers';
import {
	authReducer,
	userReducer,
	loadedUserReducer,
	forgotPasswordReducer,
} from './userReducers';

import {
	checkBookingReducer,
	bookedDatesReducer,
	bookingsReducer,
	bookingDetailsReducer,
	bookingReducer,
} from './bookingReducers';

const reducer = combineReducers({
	allRooms: allRoomsReducer,
	roomDetails: roomDetailsReducer,
	newRoom: newRoomReducer,
	room: roomReducer,
	auth: authReducer,
	user: userReducer,
	loadedUser: loadedUserReducer,
	forgotPassword: forgotPasswordReducer,
	checkBooking: checkBookingReducer,
	bookedDates: bookedDatesReducer,
	bookings: bookingsReducer,
	bookingDetails: bookingDetailsReducer,
	booking: bookingReducer,
	newReview: newReviewReducer,
	checkReview: checkReviewReducer,
});

export default reducer;
