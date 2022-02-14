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

  const photo = art && art.media ? `${baseUrl}${art.media.url}` : undefined;

  return (
    <Container key={art.id} m='sm' size='xs'>
      <Link href={`/artwork/${art.id}`} passHref>
        <Card shadow='md' withBorder component='a'>
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

          {description && art.description && (
            <Text size='sm' style={{ color: secondaryColor, lineHeight: 1.5 }}>
              {art.description.length > 150 ? art.description.slice(0, 150) + ' (...)' : art.description}
            </Text>
          )}

        </Card>
      </Link>
    </Container>
  );
}

ArtCard.defaultProps = { description: true, tags: true, artistName: false }

export default ArtCard;
