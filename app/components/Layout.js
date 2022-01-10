import { AppShell } from '@mantine/core';
import { NavigationHeader, Sidebar } from './Navigation';

export default function Layout({ children }) {
	return (
		<AppShell header={<NavigationHeader />} navbar={<Sidebar />}>
			<main>{children}</main>
		</AppShell>
	);
}
