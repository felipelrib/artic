import { useRouter } from 'next/router';

import Head from 'next/head';

import {
	Container,
	Divider,
	Space,
	SimpleGrid,
	Text,
} from '@mantine/core';

import ArtistInfo from '../components/ArtistInfo';

import ArtCard from '../components/ArtCard';

// TODO: Add user data to context
async function getUserByUsername(username) {
	const response = await fetch(process.env.STRAPI_API_URL + `/artic-users/?Username=${username}`);
	if (response.ok) {
		let users = await response.json();
		if (users.length !== 0) {
			return users[0];
		}
	}
	return null;
}

export async function getServerSideProps({ params }) {
	const user = await getUserByUsername(params.username);
	return {
		props: { user: user },
	};
}

export default function WorksOfUser({ user }) {
	const router = useRouter();
	const { username } = router.query;

	const { arts } = user;

	return user ? (
		<>
			<Head>
				<title>{username} | Obras</title>
			</Head>
			<ArtistInfo user={user} />
			{arts && arts.length > 0 && (
				<>
					<Space h='xl' />
					<Divider size='sm' />
					<Space h='xl' />
					<Space h='sm' />
					<SimpleGrid
						cols={3}
						spacing='lg'
						breakpoints={[
							{ maxWidth: 'md', cols: 2, spacing: 'md' },
							{ maxWidth: 'sm', cols: 1, spacing: 'sm' },
						]}>
						{arts.map((art) => (
							<Container key={art.id} m='sm' size='xs'>
								<ArtCard art={art} />
							</Container>
						))}
					</SimpleGrid>
				</>
			)}
		</>
	) : (
		<>
			<Head>
				<title>Not Found</title>
			</Head>
			<Text>Usuário {username} não encontrado</Text>
		</>
	);
}
