import Register from '../components/auth/Register';
import { getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { Container } from '@chakra-ui/react';

export default function RegisterPage() {
	return (
		<Layout title="Register">
			<Container maxW="container.md">
				<Register align="center" />
			</Container>
		</Layout>
	);
}
export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session) {
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
