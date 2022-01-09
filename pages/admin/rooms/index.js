import React from 'react';
import { getSession } from 'next-auth/react';
import AllRooms from '../../../components/admin/AllRooms';
import Layout from '../../../components/Layout';

function UpdateAllRoomsPage() {
	return (
		<Layout title="All Rooms ">
			<AllRooms />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession({ req: context.req });
	if (!session || session.user.role !== 'admin') {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
}
export default UpdateAllRoomsPage;
