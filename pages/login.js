import Login from '../components/auth/Login';
import Layout from '../components/Layout';
import { Container } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';

export default function LoginPage() {
	return (
		<Layout title="Login">
			<Container>
				<Login align="center" />
			</Container>
		</Layout>
	);
}
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}
