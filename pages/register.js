import Register from '../components/auth/Register';
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
