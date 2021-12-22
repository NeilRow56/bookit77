module.exports = {
	reactStrictMode: true,

	env: {
		DB_LOCAL_URI: process.env.DB_LOCAL_URI,
		CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_NAME,
		CLOUDINARY_API_KEY: process.env.CLOUDINARY_KEY,
		CLOUDINARY_API_SECRET: process.env.CLOUDINARY_SECRET,
	},

	images: {
		domains: ['res.cloudinary.com'],
	},
};
