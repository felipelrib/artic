import { Header, Navbar, Text } from '@mantine/core';

function Sidebar() {
	return (
		<Navbar width={{ base: 300 }}>
			<Navbar.Section>First section</Navbar.Section>

			<Navbar.Section>Grow section</Navbar.Section>

			<Navbar.Section>Last section</Navbar.Section>
		</Navbar>
	);
}

function NavigationHeader() {
	return (
		<Header height={60} padding='xs'>
			Teste header
		</Header>
	);
}

export { Sidebar, NavigationHeader };
