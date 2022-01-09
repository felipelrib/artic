import Head from 'next/head';
import 'dayjs/locale/pt';
import { getMonthsNames } from '@mantine/dates';
import { Group, Space, Text, Title, Card, Container, SimpleGrid } from '@mantine/core';

const DateText = ({ datetime }) => {
  let date = new Date(datetime);
  let o = new Intl.DateTimeFormat("pt" , {
    dateStyle: "medium"
  });
  return (<Text>{o.format(date)}</Text>);
}

const StatusText = ({accepted}) => {
  let color;
  let text;
  if (accepted === null || accepted === undefined) {
    color = "orange";
    text = "Pendente";
  } else {
    color = accepted ? "blue" : "red";
    text = accepted ? "Em progresso" : "Rejeitada";
  }
  return (
    <Text size="md" weight={700} style={{color: color}}>
      {text}
    </Text>
  );
}

const CommissionCard = ({commission}) => {
  return (
    <Card shadow='sm' withBorder>
      <Group style={{ minHeight: 200, minWidth: 300 }} direction="column" position="apart">
        <Group position="apart">
          <Text weight={700}>{commission.requester.Name}</Text>
          <DateText datetime={commission.date}/>
        </Group>
        <Text size="sm" style={{lineHeight: 1.5}}>{commission.description}</Text>
        <StatusText accepted={commission.accepted} />
      </Group>
    </Card>
  );
}


async function fetchUser(username) {
  const response = await fetch(process.env.STRAPI_API_URL + `/artic-users?Username=${username}`);
  if (response.ok) {
    let users = await response.json();
    if (users.length !== 0) {
      return users[0];
    }
  }
  return null;
}

async function fetchRequestedCommissions(username) {
  const response = await fetch(process.env.STRAPI_API_URL + `/commissions?requester.Username=${username}`);
  if (response.ok) {
    let commissions = await response.json();
    return commissions;
  }
  return null;
}

async function fetchReceivedCommissions(username) {
  const response = await fetch(process.env.STRAPI_API_URL + `/commissions?executor.Username=${username}`);
  if (response.ok) {
    let commissions = await response.json();
    return commissions;
  }
  return null;
}

export async function getServerSideProps({ params }) {
  const user = await fetchUser(params.username);
  const requested = await fetchRequestedCommissions(params.username);
  const received = await fetchReceivedCommissions(params.username);
  if (!user) {
    return { notFound: true };
  }
  return {
    props: { user: user, requested: requested, received: received }
  };
}

export default function Commissions({ requested, received }) {
  return (<>
    <Head><title>Encomendas</title></Head>
    <Container fluid>
      <Title>Pedidos recebidos</Title>
      <Space h="md"/>
      <SimpleGrid breakpoints={[
        { minWidth: 'xs', cols: 3 },
        { minWidth: 'md', cols: 4 }
      ]}>
        {received.map((commission) => 
          <div key={commission.id}>
            <CommissionCard commission={commission} />
          </div>
        )}
      </SimpleGrid>
      <Space h="lg"/>
      <Title>Pedidos feitos</Title>
      <Space h="md"/>
      <SimpleGrid breakpoints={[
        { minWidth: 'xs', cols: 3 },
        { minWidth: 'md', cols: 4 }
      ]}>
        {requested.map((commission) => 
          <div key={commission.id}>
            <CommissionCard commission={commission} />
          </div>
        )}
      </SimpleGrid>
    </Container>
  </>);
}