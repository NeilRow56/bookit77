import React from 'react';
import NewPassword from '../../../components/user/NewPassword';
import Layout from '../../../components/Layout';
import { Container } from '@chakra-ui/react';

function NewPasswordPage() {
	return (
		<Layout title="New Password">
			<Container>
				<NewPassword align="center" />
			</Container>
		</Layout>
	);
}

export default NewPasswordPage;
