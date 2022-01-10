import {
  SimpleGrid,
} from '@mantine/core';

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
          {arts}
        </SimpleGrid>
      </>
    );
  }
  return null;
}
