import { AppShell } from '@mantine/core';
import Sidebar from './Navigation';

export default function Layout({ children }) {
	return (
		<AppShell fixed navbar={<Sidebar />}>
			<main>{children}</main>
		</AppShell>
	);
}
