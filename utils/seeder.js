const Room = require('../models/room');
const mongoose = require('mongoose');

const rooms = require('../data/rooms');

mongoose.connect(
	'mongodb+srv://Sterling:Loddington4@cluster0.sijso.mongodb.net/bookit77?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const seedRooms = async () => {
	try {
		await Room.deleteMany();
		console.log('Rooms are deleted');

		await Room.insertMany(rooms);
		console.log('All Rooms are seeded');

		process.exit();
	} catch (error) {
		console.log(error.message);
	}
};

seedRooms();
