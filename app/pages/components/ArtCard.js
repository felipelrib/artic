import {
  useMantineTheme,
  Card,
  Image,
  Text,
  Group,
  Button,
  Container
} from '@mantine/core';

export default function ArtCard({ art }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const photo = art.media ? `${process.env.STRAPI_API_URL}${art.media.url}` : undefined;

  return (
    <Container key={art.id} m='sm' size='xs'>
      <Card shadow='md' withBorder>
        <Card.Section>
          <Image src={photo} height={200} alt='Imagem descritiva do projeto' />
        </Card.Section>

        <Group position='apart' style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{art.name}</Text>
          <Group position='right' style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            {art.tags?.map((tag) => (
              <Badge key={tag.id} color='pink' variant='light'>
                {tag.name}
              </Badge>
            ))}
          </Group>
        </Group>

        {art.description && (
          <Text size='sm' style={{ color: secondaryColor, lineHeight: 1.5 }}>
            {art.description.length > 150 ? art.description.slice(0, 150) + ' (...)' : art.description}
          </Text>
        )}

        <Button variant='light' color='blue' fullWidth style={{ marginTop: 14 }}>
          Ver mais
        </Button>
      </Card>
      </Container>
  );
}
