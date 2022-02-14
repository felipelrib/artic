import { useRouter } from 'next/router';

import Head from 'next/head';

import {
  Space,
  Divider,
  Title,
  Container,
  Text
} from '@mantine/core';

import ArtistInfo from '../../../components/ArtistInfo';

import ArtsGrid from '../../../components/ArtsGrid';

import ArtCard from '../../../components/ArtCard';

const { getUser } = require('../../../services/user.js');

async function getAlbumById(albumId) {
  const response = await fetch(process.env.STRAPI_API_URL + `/albums/${albumId}`);
  if (response.ok) {
    let album = await response.json();
    return album;
  }
  return null;
}

export async function getServerSideProps({ params }) {
  const user = await getUser(params.username);
  const album = await getAlbumById(params.id);
  if(user == null || album == null) {
    return { notFound: true };
  }
  return {
    props: { baseUrl: process.env.STRAPI_API_URL, user: user, album: album },
  };
}

export default function Album({ baseUrl, user, album }) {
  const router = useRouter();
  const { username } = router.query;

  return user ? (
    <>
      <Head>
        <title>{username} | Obras em {album.name} </title>
      </Head>
      <ArtistInfo user={user} baseUrl={baseUrl} />
      <Space h='xl' />
      <Divider size='sm' />
      <Space h='xl' />
      <Space h='sm' />
      <Container size='xl'>
        <Title>
          {album.name ? (<>Obras em <em>{album.name}</em></>) : (<>Obras do álbum</>)}
        </Title>
        <ArtsGrid arts={album.arts.map((art) => (
          <ArtCard key={art.id} art={art} baseUrl={baseUrl} />
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
