module.exports = {
	reactStrictMode: true,

	env: {
		DB_LOCAL_URI: process.env.DB_LOCAL_URI,

		STRIPE_API_KEY: process.env.STRIPE_API_KEY,
		STRIPE_API_SECRET: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

		CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_NAME,
		CLOUDINARY_API_KEY: process.env.CLOUDINARY_KEY,
		CLOUDINARY_API_SECRET: process.env.CLOUDINARY_SECRET,

		SMTP_HOST: process.env.SMTP_HOST,
		SMTP_PORT: process.env.SMTP_PORT,
		SMTP_USER: process.env.SMTP_USER,

		SMTP_PASSWORD: process.env.SMTP_PASSWORD,
		SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
		SMTP_FROM_NAME: process.env.SMTP_FROM_NAME,
	},

	images: {
		domains: ['res.cloudinary.com'],
	},
};
