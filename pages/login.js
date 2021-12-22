import Login from '../components/auth/Login';
import Layout from '../components/Layout';
import { Container } from '@chakra-ui/react';

export default function LoginPage() {
	return (
		<Layout title="Login">
			<Container>
				<Login align="center" />
			</Container>
		</Layout>
	);
}
