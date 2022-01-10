import { useRouter } from 'next/router';

import Head from 'next/head';

import {
  Space,
  Divider,
  Title,
  Container
} from '@mantine/core';

import ArtistInfo from '../../components/ArtistInfo';

import ArtsGrid from '../../components/ArtsGrid';

import ArtCard from '../../components/ArtCard';

async function getAlbumById(albumId) {
  const response = await fetch(process.env.STRAPI_API_URL + `/albums/${albumId}`);
  if (response.ok) {
    let album = await response.json();
    return album;
  }
  return null;
}

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
  const album = await getAlbumById(params.id);
  return {
    props: { user: user, album: album },
  };
}

export default function Album({ user, album }) {
  const router = useRouter();
  const { username } = router.query;

  return user ? (
    <>
      <Head>
        <title>{username} | Obras em {album.name} </title>
      </Head>
      <ArtistInfo user={user} />
      <Space h='xl' />
      <Divider size='sm' />
      <Space h='xl' />
      <Space h='sm' />
      <Container size='xl'>
        <Title>
          {album.name ? (<>Obras em <em>{album.name}</em></>) : (<>Obras do álbum</>)}
        </Title>
        <ArtsGrid arts={album.arts.map((art) => (
          <ArtCard art={art} />
        ))} />
      </Container>
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
