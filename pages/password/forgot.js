import React from 'react';
import ForgotPassword from '../../components/user/ForgotPassword';
import Layout from '../../components/Layout';
import { Container } from '@chakra-ui/react';

function ForgotPasswordPage() {
	return (
		<Layout title="Forgot Password">
			<Container>
				<ForgotPassword align="center" />
			</Container>
		</Layout>
	);
}

export default ForgotPasswordPage;
