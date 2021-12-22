import React from 'react';
import { Button } from '@chakra-ui/react';

function ButtonLoader() {
	return (
		<Button
			isLoading
			loadingText="Submitting"
			colorScheme="teal"
			variant="outline"
		></Button>
	);
}

export default ButtonLoader;
