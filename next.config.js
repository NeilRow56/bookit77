module.exports = {
	reactStrictMode: true,

	env: {
		DB_LOCAL_URI: process.env.DB_LOCAL_URI,
	},

	images: {
		domains: ['res.cloudinary.com'],
	},
};
