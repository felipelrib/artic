import { useRouter } from 'next/router';

import Head from 'next/head';

import {
	Avatar,
	Badge,
	Button,
	Card,
	Container,
	Divider,
	Group,
	Image,
	Space,
	SimpleGrid,
	Text,
	useMantineTheme,
} from '@mantine/core';

// TODO: Add user data to context
async function fetchUser(username) {
	console.log({ apiUrl: process.env.STRAPI_API_URL });
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
	const user = await fetchUser(params.username);
	return {
		props: { user: user },
	};
}

function BasicArtistInfo({ user }) {
	const photo = user.Picture ? `${process.env.STRAPI_API_URL}${user.Picture.url}` : undefined;
	return (
		<Container size='md' padding='sm'>
			<Card withBorder>
				<Group>
					<Card.Section>
						<Avatar src={photo} alt='Foto do usuário' size='xl' />
						{/* User profile pic */}
					</Card.Section>
					{user.Name && (
						<Card.Section>
							<Text weight={700} size='lg' style={{ lineHeight: 1.5 }}>
								{user.Name}
							</Text>
						</Card.Section>
					)}
					{user.Bio && <Card.Section>{user.Bio}</Card.Section>}
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
					Tag 1
				</Badge>
				<Badge color='pink' variant='light'>
					Tag 2
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

export default function WorksOfUser({ user }) {
	const router = useRouter();
	const { username } = router.query;

	let works = [1, 2, 3, 4, 5, 6]; // let { works } = user;

	return user ? (
		<>
			<Head>
				<title>{username} | Obras</title>
			</Head>
			<BasicArtistInfo user={user} />
			{works && (
				<>
					<Space h='xl' />
					<Divider size='sm' />
					<Space h='xl' />
					<Space h='sm' />
					<SimpleGrid cols={3} spacing='lg'>
						{works.map((work, idx) => (
							<Container key={idx} m='sm' size='xs'>
								<WorkCard work={work} />
							</Container>
						))}
					</SimpleGrid>
				</>
			)}
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
