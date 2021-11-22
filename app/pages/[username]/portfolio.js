import { useRouter } from 'next/router';

import {
	Avatar,
	Badge,
	Button,
	Card,
	Center,
	Container,
	Divider,
	Group,
	Grid,
	Image,
	Space,
	SimpleGrid,
	Title,
	Text,
	useMantineTheme,
} from '@mantine/core';

function fetchUser(username) {}

async function fetchWorksByUser(username) {
	try {
		const response = await fetch(
			`${process.env.STRAPI_API_URL}/artic-works/?Username=${username}`
		);

		if (response.ok) {
			const worksByUser = await response.json();
			return worksByUser;
		}
	} catch (error) {
		console.error({ error });
	}

	return null;
}

function BasicArtistInfo({ user }) {
	return (
		<Container size='md' padding='sm'>
			<Card withBorder>
				<Group>
					<Card.Section>
						<Avatar alt='Foto do usuário' size='xl' />
					</Card.Section>
					<Card.Section>
						<Text weight={700} size='lg' style={{ lineHeight: 1.5 }}>
							diegobarros
						</Text>
					</Card.Section>
					<Card.Section>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ligula dui,
						cursus a orci et, mattis efficitur massa. Nulla convallis volutpat velit vel
						eleifend. Mauris quis quam mi. Nulla facilisi. Pellentesque tristique
						sagittis finibus. Proin efficitur, quam id elementum venenatis, urna metus
						tristique orci, a feugiat velit ipsum sit amet lacus. Ut sollicitudin
						faucibus sapien. Pellentesque consequat ex at aliquam viverra. Duis
						vestibulum metus et mi rutrum tempus. Donec erat justo, malesuada sed risus
						at, consequat dictum metus. Nam posuere condimentum bibendum.{' '}
					</Card.Section>
				</Group>
			</Card>
		</Container>
	);
}

function WorkCard({ work }) {
	const theme = useMantineTheme();

	const secondaryColor =
		theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

	return (
		<Card shadow='md' withBorder>
			<Card.Section>
				<Image
					src='https://images.unsplash.com/photo-1634698046002-73019c646268?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=875&q=80'
					height={160}
					alt='Imagem descritiva do projeto'
				/>
			</Card.Section>

			<Group position='apart' style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
				<Text weight={500}>Nome da obra</Text>
				<Badge color='pink' variant='light'>
					On Sale
				</Badge>
			</Group>

			<Text size='sm' style={{ color: secondaryColor, lineHeight: 1.5 }}>
				Nostrum corporis sit consequatur laudantium id. Ullam error tempore voluptatum natus
				aspernatur sit. Odio illum beatae necessitatibus numquam eos. Et consequatur eaque
				dolor. Ipsa aspernatur eveniet eveniet. Veritatis sap...
			</Text>

			<Button variant='light' color='blue' fullWidth style={{ marginTop: 14 }}>
				Ver mais
			</Button>
		</Card>
	);
}

export default function WorksOfUser({ user, works }) {
	const router = useRouter();
	const { username } = router.query;

	let placeholderArray = [1, 2, 3, 4, 5, 6];

	return (
		<>
			<BasicArtistInfo user={user} />
			<Space h='xl' />
			<Divider size='sm' />
			<Space h='xl' />
			<Space h='sm' />
			<SimpleGrid cols={3} spacing='lg'>
				{placeholderArray.map((work) => (
					<Container m='sm' size='xs'>
						<WorkCard work={work} />
					</Container>
				))}
			</SimpleGrid>
		</>
	);
}
