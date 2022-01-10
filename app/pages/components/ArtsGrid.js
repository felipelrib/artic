import {
  SimpleGrid,
  Container
} from '@mantine/core';

import ArtCard from './ArtCard';

export default function ArtsGrid({ arts }) {
  if (arts && arts.length > 0) {
    return (
      <>
        <SimpleGrid
          cols={3}
          spacing='lg'
          breakpoints={[
            { maxWidth: 'md', cols: 2, spacing: 'md' },
            { maxWidth: 'sm', cols: 1, spacing: 'sm' },
          ]}>
          {arts.map((art) => (
            <Container key={art.id} m='sm' size='xs'>
              <ArtCard art={art} />
            </Container>
          ))}
        </SimpleGrid>
      </>
    );
  }
  return null;
}
