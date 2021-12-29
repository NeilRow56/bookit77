import NextAuth from 'next-auth';
import { getToken } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/user';
import dbConnect from '../../../config/dbConnect';

const options = {
	site: process.env.NEXTAUTH_URL,
};

export default NextAuth({
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'credentials',

			async authorize(credentials, req) {
				dbConnect();

				const { email, password } = credentials;
				// Check if email and password is entered
				if (!email || !password) {
					throw new Error('Please enter email or password');
				}

				// Find user in the database
				const user = await User.findOne({ email }).select('+password');

				if (!user) {
					throw new Error('Invalid Email or Password');
				}

				// Check if password is correct or not
				const isPasswordMatched = await user.comparePassword(password);

				if (!isPasswordMatched) {
					throw new Error('Invalid Email or Password');
				}

				return Promise.resolve(user);
			},
		}),
	],
	callbacks: {
		// called when token is created
		jwt: async ({ token, user }) => {
			if (user) {
				// console.log(user);
				token.user = user;
			}
			return Promise.resolve(token);
		},

		session: async ({ session, token }) => {
			if (token) {
				session.user = token.user;
			}

			return Promise.resolve(session);
		},
	},
	secret: process.env.SECRET,
	jwt: {
		secret: process.env.SECRET,
		encryption: true,
	},
});
