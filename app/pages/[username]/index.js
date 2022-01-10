import { useRouter } from 'next/router';

import Head from 'next/head';

import {
	Divider,
	Space,
	Text
} from '@mantine/core';

import ArtistInfo from '../components/ArtistInfo';

import ArtsGrid from '../components/ArtsGrid';

import AlbumCard from '../components/AlbumCard';

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

async function getAlbumsByUserId(userId) {
	const response = await fetch(process.env.STRAPI_API_URL + `/albums?artic_user.id=${userId}`);
	if (response.ok) {
		let albums = await response.json();
		return albums;
	}
	return null;
}

export async function getServerSideProps({ params }) {
	const user = await getUserByUsername(params.username);
	const albums = await getAlbumsByUserId(user.id);
	return {
		props: { baseUrl: process.env.STRAPI_API_URL, user: user, albums: albums },
	};
}

export default function Index({ baseUrl, user, albums }) {
	const router = useRouter();
	const { username } = router.query;

	return user ? (
		<>
			<Head>
				<title>{username} | Álbuns</title>
			</Head>
			<ArtistInfo user={user} baseUrl={baseUrl} />
			<Space h='xl' />
			<Divider size='sm' />
			<Space h='xl' />
			<Space h='sm' />
			<ArtsGrid arts={albums.map((album) => (
        <AlbumCard key={album.id} album={album} baseUrl={baseUrl} />
      ))} />
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
