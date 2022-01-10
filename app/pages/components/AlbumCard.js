import {
  useMantineTheme,
  Card,
  Image,
  Text,
  Group,
  Button,
  Container
} from '@mantine/core';

export default function ArtCard({ album }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const photo = album.arts[0].media ? `${process.env.STRAPI_API_URL}${album.arts[0].media.url}` : undefined;

  return (
    <Container key={album.id} m='sm' size='xs'>
      <Card shadow='md' withBorder>
        <Card.Section>
          <Image src={photo} height={200} alt='Imagem descritiva do projeto' />
        </Card.Section>

        <Group position='apart' style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{album.name} ({album.arts.length})</Text>
        </Group>

        {album.description && (
          <Text size='sm' style={{ color: secondaryColor, lineHeight: 1.5 }}>
            {album.description}
          </Text>
        )}

        <Button variant='light' color='blue' fullWidth style={{ marginTop: 14 }}>
          Ver mais
        </Button>
      </Card>
      </Container>
  );
}
