import Link from 'next/link';

import { getMonthsNames } from '@mantine/dates';

import 'dayjs/locale/pt';

import { Container, Card, Group, Avatar, Text, Button } from '@mantine/core';

function convertDateToPT(dateString) {
	const date = new Date(dateString);
	return `${getMonthsNames('en')[date.getMonth()]} ${date.getFullYear()}`;
}

export default function ArtistInfo({ baseUrl, user }) {
	const photo = user.Picture ? `${baseUrl}${user.Picture.url}` : undefined;
	return (
		<Container size='md' padding='sm'>
			<Card withBorder>
				<Group>
					<Card.Section>
						<Link href={`/${user.Username}`} passHref>
							<Avatar
								id='user-photo'
								src={photo}
								alt='Foto do usuário'
								size='200px'
							/>
						</Link>
					</Card.Section>
					{(user.Name || user.Username || user.created_at || user.Bio) && (
						<Card.Section>
							{user.Name && (
								<Text
									id='user-name'
									weight={700}
									size='lg'
									style={{ lineHeight: 1.5 }}
								>
									{user.Name}
								</Text>
							)}
							{user.Username && (
								<Text id='user-username' style={{ lineHeight: 1.5 }}>
									@{user.Username}
								</Text>
							)}
							{user.created_at && (
								<Text color='dimmed' style={{ lineHeight: 1.5 }}>
									Joined {convertDateToPT(user.created_at)}
								</Text>
							)}
							{user.Bio && <Card.Section id='user-bio'>{user.Bio}</Card.Section>}
						</Card.Section>
					)}
					<Card.Section>
						<Button id='request-btn'>Request</Button>
					</Card.Section>
				</Group>
			</Card>
		</Container>
	);
}
