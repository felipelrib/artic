import Head from 'next/head';
import { MantineProvider, NormalizeCSS, GlobalStyles } from '@mantine/core';

import Layout from '../components/Layout';

export default function App(props) {
	const { Component, pageProps } = props;

	// TODO: Com autenticação, salvar no session storage o usuário corrente

	// sessionStorage.setItem('currentLogin', 'rafaelpardini');
	// sessionStorage.setItem('currentUserName', 'Rafael Pardini');

	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>

			<MantineProvider
				theme={{
					/** Put your mantine theme override here */
					colorScheme: 'light',
				}}
			>
				<NormalizeCSS />
				<GlobalStyles />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MantineProvider>
		</>
	);
}
