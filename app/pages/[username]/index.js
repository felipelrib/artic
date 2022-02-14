import { useRouter } from 'next/router';

import Head from 'next/head';

import {
	Divider,
	Space,
	Text
} from '@mantine/core';

import ArtistInfo from '../../components/ArtistInfo';

import ArtsGrid from '../../components/ArtsGrid';

import AlbumCard from '../../components/AlbumCard';

const { getUser } = require('../../services/user.js');

async function getAlbumsByUserId(userId) {
	const response = await fetch(process.env.STRAPI_API_URL + `/albums?artic_user.id=${userId}`);
	if (response.ok) {
		let albums = await response.json();
		return albums;
	}
	return null;
}

export async function getServerSideProps({ params }) {
	const user = await getUser(params.username);
	if (user == null) {
		return { notFound: true };
	}
	const albums = await getAlbumsByUserId(user.id);
	if (albums == null) {
		return { notFound: true };
	}
	return {
		props: { baseUrl: process.env.STRAPI_API_URL, user: user, albums: albums },
	};
}

export default function Index({ baseUrl, user, albums }) {
	const router = useRouter();
	const { username } = router.query;

	return (<>
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
	);
}
