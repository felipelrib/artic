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

const { getUserAlbums } = require('../../services/album.js');

export async function getServerSideProps({ params }) {
	const user = await getUser(params.username);
	if (user == null) {
		return { notFound: true };
	}
	const albums = await getUserAlbums(user.id);
	if (albums == null) {
		return { notFound: true };
	}
	return {
		props: { baseUrl: process.env.STRAPI_MEDIA_BASE_URL, user: user, albums: albums },
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
