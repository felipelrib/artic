import Link from 'next/link';

import {
  useMantineTheme,
  Card,
  Image,
  Text,
  Group,
  Button,
  Container,
  Badge
} from '@mantine/core';

function ArtCard({ baseUrl, art, description, tags, artistName }) {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const photo = art.media ? `${baseUrl}${art.media.url}` : undefined;

  return (
    <Container key={art.id} m='sm' size='xs'>
      <Card shadow='md' withBorder>
        <Card.Section>
          <Image src={photo} height={200} alt='Imagem descritiva do projeto' />
        </Card.Section>


        <Group position='apart' style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{art.name}</Text>
          {tags && (
            <Group position='right' style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
            {art.tags?.map((tag) => (
              <Badge key={tag.id} color='pink' variant='light'>
                {tag.name}
              </Badge>
            ))}
            </Group>
          )}
        </Group>

        {artistName && (
          <Text size="sm" style={{ lineHeight: 1.5 }}>por {art.artic_user.Name}</Text>
        )}

        {description && art.description && (
          <Text size='sm' style={{ color: secondaryColor, lineHeight: 1.5 }}>
            {art.description.length > 150 ? art.description.slice(0, 150) + ' (...)' : art.description}
          </Text>
        )}

        <Button variant='light' color='blue' fullWidth style={{ marginTop: 14 }}>
          <Link href={`/artwork/${art.id}`}>Ver mais</Link>
        </Button>
      </Card>
    </Container>
  );
}

ArtCard.defaultProps = { description: true, tags: true, artistName: false }

export default ArtCard;
