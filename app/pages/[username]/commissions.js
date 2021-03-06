import Head from 'next/head';
import 'dayjs/locale/pt';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Center, Group, Space, Text, Title, Card, Container, SimpleGrid, Pagination } from '@mantine/core';
import { FaFileImage } from 'react-icons/fa';
import { IMAGE_MIME_TYPE, Dropzone } from '@mantine/dropzone';

import * as commissionsService from '../../services/commissions';
import * as userService from '../../services/user';

const DateText = ({ datetime }) => {
  let date = new Date(datetime);
  let o = new Intl.DateTimeFormat("en" , {
    dateStyle: "medium"
  });
  return (<Text>{o.format(date)}</Text>);
}

const StatusText = ({accepted, uploaded, className}) => {
  let color;
  let text;
  if (accepted === null || accepted === undefined) {
    color = "orange";
    text = "Pending";
  } else if (!uploaded) {
    color = accepted ? "orange" : "red";
    text = accepted ? "In progress" : "Rejected";
  } else {
    color = "black";
    text = "Done";
  }
  return (
    <Text size="md" weight={700} style={{color: color}} className={className}>
      {text}
    </Text>
  );
}

function CommissionCard({commission, received}) {
  const router = useRouter();
  let actions;
  let borderColor;

  function commissionOnAccept() {
    fetch(`/api/commissions/accept/${commission.id}`, {
      method: 'POST'
    }).then(()=> {
      router.replace(router.asPath);
    });
  }

  function commissionOnReject() {
    fetch(`/api/commissions/reject/${commission.id}`, {
      method: 'POST'
    }).then(()=> {
      router.replace(router.asPath);
    });
  }

  function commissionOnDrop(files) {
    const data = new FormData();
    data.append('image', files[0]);
    data.append('commission', JSON.stringify(commission));

    fetch('/api/commissions/uploadCommissionFile', {
      method: 'POST',
      body: data
    }).then(()=> {
      router.replace(router.asPath);
    });
  }

  if (received && commission.accepted === null) {
    borderColor = "orange";
    actions =
      <Group>
        <Button variant="outline" color="green" onClick={commissionOnAccept}> Aceitar </Button>
        <Button variant="outline" color="red" onClick={commissionOnReject}> Rejeitar </Button>
      </Group>
  } else if (received && commission.accepted && !commission.artwork) {
    borderColor = "orange";
    actions =
      <Dropzone multiple={false} onDrop={commissionOnDrop} maxSize={3 * 1024 ** 2} accept={IMAGE_MIME_TYPE} style={{width: "100%"}}>
        {(status) => (
          <Group position="center" style={{ pointerEvents: 'none', width: "100%" }}>
            <FaFileImage />
            <Text size="sm" inline>
              Click to select file or drag and drop it here
            </Text>
          </Group>
        )}
      </Dropzone>
  } else if (!received && commission.accepted === false) {
    borderColor = "red"
  } else if (!received && commission.accepted) {
    borderColor = "lightblue";
    if (commission.artwork) {
      actions = <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{width: "100%"}}>Download</Button>
    }
  }
  else {
    borderColor = "grey";
  }

  return (
    <Card shadow='sm' withBorder style={{borderColor: borderColor, height: 300 }}>
      <Group style={{ height: "100%", width: "100%" }} direction="column" position="apart" noWrap>
        <Group position="apart" style={{width: "100%"}}>
          <Text weight={700}>{received ? commission.requester.Name : commission.executor.Name}</Text>
          <DateText datetime={commission.date}/>
        </Group>
        <Text size="sm" style={{lineHeight: 1.5, marginBottom: "auto"}} lineClamp={4} align="justify" >{commission.description}</Text>
        <StatusText accepted={commission.accepted} uploaded={!!commission.artwork}/>
        {actions}
      </Group>
    </Card>
  );
}

const CommissionSection = ({title, commissions, pageSize, cardProps}) => {
  const [activePage, setPage] = useState(1);
  return (<Container fluid>
    <Title>{title}</Title>
    <Space h="md"/>
    <SimpleGrid cols={4} breakpoints={[
      { maxWidth: 'sm', cols: 1 },
      { maxWidth: 'md', cols: 2 }
    ]}>
      {commissions.slice((activePage-1)*pageSize).map((commission) =>
        <CommissionCard commission={commission} {...cardProps} key={commission.id}/>
      )}
    </SimpleGrid>
    <Center> <Pagination page={activePage} onChange={setPage} total={Math.ceil(commissions.length/pageSize)} style={{marginTop: "2rem"}}/> </Center>
  </Container>);
}

export async function getServerSideProps({ params }) {
  const user = await userService.getUser(params.username);
  const requested = await commissionsService.getRequestedCommissions(params.username);
  const received = await commissionsService.getReceivedCommissions(params.username);
  if (!user) {
    return { notFound: true };
  }
  return {
    props: { user: user, requested: requested, received: received }
  };
}

export default function Commissions({ requested, received }) {
  const sectionPageSize = 4;
  return (<>
    <Head><title>Encomendas</title></Head>
    <Container fluid>
      <Space h="lg"/>
      <CommissionSection title="Requests received" commissions={received} pageSize={sectionPageSize} cardProps={{received: true}}/>
      <Space h="lg"/>
      <CommissionSection title="Requests made" commissions={requested} pageSize={sectionPageSize} />
    </Container>
  </>);
}
