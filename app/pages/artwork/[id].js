import Head from 'next/head'
import Link from 'next/link'
import { Group, Image, Text, Center, Title, Container, Grid, List } from '@mantine/core';

const DateText = ({ datetime }) => {
    let date = new Date(datetime);
    let o = new Intl.DateTimeFormat("pt" , {
      dateStyle: "long"
    });
    return (<Text align="right">em {o.format(date)}</Text>);
}

async function fetchArtwork(id) {
    const response = await fetch(process.env.STRAPI_API_URL + `/arts/${id}`);
    if (response.ok) {
        let artwork = await response.json();
        if (artwork) {
            return artwork;
        }
    }
    return null;
}

export async function getServerSideProps({ params }) {
    const artwork = await fetchArtwork(params.id);
    if (artwork) {
        return {
            props: {
                mediaBaseURL: process.env.STRAPI_API_URL,
                artwork: artwork 
            }
        };
    } else {
        return {
            notFound: true
        }
    }
}

export default function Artwork({ mediaBaseURL, artwork }) {
    return (<>
        <Head>
            <title>{artwork.name}</title>
        </Head>
        <Container>
            <Center>
                <Grid>
                    <Grid.Col span={12}>
                        <Container size="sm">
                            <Image src={`${mediaBaseURL + artwork.media.url}`} />
                        </Container>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Group position="apart">
                            <Title>
                                {artwork.name}
                            </Title>
                            <Text weight={600} align="right">
                                por <Link href={`/${artwork.artic_user.Username}`}>{artwork.artic_user.Name}</Link>
                            </Text>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <DateText datetime={artwork.published_at}/>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Text align="justify">
                            {artwork.description}
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Title order={3}>
                            Presente nos álbuns:
                        </Title>
                        <List size="md">
                            {artwork.albums.map((album) => 
                                <List.Item key={album.id}>
                                    <Link href={`/album/${album.id}`}>
                                        {album.name}
                                    </Link>
                                </List.Item>
                            )}
                        </List>
                    </Grid.Col>
                </Grid>
            </Center>
        </Container>
    </>);
}