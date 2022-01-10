import { Avatar, Group, Header, Navbar, Text, UnstyledButton } from '@mantine/core';
import { createStyles, useMantineTheme } from '@mantine/styles';
import Link from 'next/Link';

// const userLogin = sessionStorage.getItem('currentLogin');
// const userName = sessionStorage.getItem('currentUserName');

const useStyles = createStyles((theme) => ({
	user: {
		display: 'block',
		width: '100%',
		padding: theme.spacing.xs,
		borderRadius: theme.radius.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},
	button: {
		display: 'block',
		width: '100%',
		padding: theme.spacing.xs,
		borderRadius: theme.radius.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},
}));

function HeaderLinkButton({ label, destination }) {
	const { classes } = useStyles();
	return (
		<UnstyledButton className={classes.button}>
			<Link href={destination}>
				<Text weight={700} size='lg'>
					{label}
				</Text>
			</Link>
		</UnstyledButton>
	);
}

function Sidebar() {
	const theme = useMantineTheme();
	const { classes } = useStyles();

	// const userPhoto = `${process.env.STRAPI_API_URL}/[current user photo url]`;

	return (
		<Navbar padding='sm' width={{ base: 225 }}>
			<Navbar.Section grow>
				<Group spacing='lg'>
					{/* TODO: Com autenticação, verificar qual o user corrente */}
					<HeaderLinkButton label='Home' destination='/' />
					<HeaderLinkButton label='My Profile' destination='/rafaelpardini' />
					<HeaderLinkButton label='Search' destination='/search' />
					<HeaderLinkButton
						label='Commissions'
						destination='/rafaelpardini/commissions'
					/>
				</Group>
			</Navbar.Section>

			<Navbar.Section>
				<div
					style={{
						paddingTop: theme.spacing.sm,
						borderTop: `1px solid ${
							theme.colorScheme === 'dark'
								? theme.colors.dark[4]
								: theme.colors.gray[2]
						}`,
					}}
				>
					<Group className={classes.user}>
						{/* 						<Avatar
							src={userPhoto}
							radius='xl'
						/> */}
						<div style={{ flex: 1 }}>
							<Text size='sm' weight={500}>
								Rafael Pardini
							</Text>
							<Text color='dimmed' size='xs'>
								@rafaelpardini
							</Text>
						</div>
					</Group>
				</div>
			</Navbar.Section>
		</Navbar>
	);
}

function NavigationHeader() {
	return (
		<Header height={60} padding='xs'>
			<Group position='apart' spacing='md'>
				<Link href='/'>
					<Text>Home</Text>
				</Link>
				<Text>Texto</Text>
				{/* <Text weight={700}>Olá, Rafael Pardini</Text> */}
			</Group>
		</Header>
	);
}

export { Sidebar, NavigationHeader };
