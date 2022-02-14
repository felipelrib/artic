import Head from 'next/head';
import 'dayjs/locale/pt';
import { useState, useEffect } from 'react';
import { Image, TextInput, Center, Space, Text, Title, Card, Container, SimpleGrid, Pagination } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { FaSearch } from 'react-icons/fa'
import axios from 'axios';
import qs from 'qs';
import ArtCard from '../../components/ArtCard';

export async function getServerSideProps() {
  
  return {
    props: { apiBaseURL: process.env.STRAPI_API_URL }
  };
}

export default function Search({ apiBaseURL }) {
  const [activePage, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const pageSize = 4;
  const form = useForm({
    initialValues: {
      search: '',
    }
  });

  useEffect(() => {
    const api = axios.create({
      baseURL: apiBaseURL
    });
    if (activePage > 1) {
      setActivePage(1);
      return;
    }
    const query = qs.stringify({
      _limit: pageSize,
      _start: pageSize*(activePage-1),
      _where: [{
        _or:[
          { name_contains: searchText }, 
          { description_contains: searchText },
          { 'artic_user.Username_eq': searchText },
        ]
      }],
    });
    return api.get(`/arts?${query}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchText, activePage, apiBaseURL]);

  return (<>
    <Head><title>Pesquisa por obras</title></Head>
    <Container fluid style={{margin: "5rem 5rem"}}>
      <Center>
        <form onSubmit={form.onSubmit((values) => setSearchText(values.search))}>
          <TextInput 
            icon={<FaSearch/>}
            placeholder="Pesquise por um termo ou username" 
            style={{width: "50vw"}}
            {...form.getInputProps('search')}
          />
        </form>
      </Center>
      <Space h="lg"/>
      <Center>
        <Title>Resultados</Title>
      </Center>
      <Space h="md"/>
      <Container fluid>
        <Center>
          <SimpleGrid cols={searchResults.length > 3 ? 3 : searchResults.length || 1} breakpoints={[
            { maxWidth: 'sm', cols: 1 },
            { maxWidth: 'md', cols: 2 }
          ]}>
            {searchResults.length ?
              searchResults.slice((activePage-1)*pageSize).map((art) => 
              <ArtCard baseUrl={apiBaseURL} art={art} key={art.id} description={false} tags={false} />
              ) : "Não há resultados para o termo pesquisado."
            }
          </SimpleGrid>
        </Center>
        <Center> <Pagination page={activePage} onChange={setPage} total={Math.ceil(searchResults.length/pageSize)} style={{marginTop: "2rem"}}/> </Center>
      </Container>
    </Container>
  </>);
}