import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Container, Center, Title, Text, Group } from '@mantine/core';
import { Button } from '@mantine/core';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Artic</title>
				<meta name='description' content='App for comissioning artists' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Container className={styles.main} fluid>
				<Container>
					<Center>
						<Group position='center' direction='column'>
							<Title className='home-name' order={1}>
								Artic
							</Title>
							<Text className='home-description' align='center'>
								Making life easier for art, and art easier for life.
							</Text>
							<Group className='home-actions' position='center' direction='row'>
								<Button
									variant='gradient'
									gradient={{ from: 'teal', to: 'lime', deg: 105 }}
									size='lg'
								>
									Search for art
								</Button>
								<Button
									variant='gradient'
									gradient={{ from: 'teal', to: 'lime', deg: -105 }}
									size='lg'
								>
									Publish yours
								</Button>
							</Group>
						</Group>
					</Center>
				</Container>
			</Container>
		</div>
	);
}
