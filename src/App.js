import { useEffect, useMemo, useState } from 'react';
import { Box, Container, Heading, Spinner } from '@chakra-ui/react';

import DataTable from './components/DataTable';
import Footer from './components/Footer';

const url =
  '/transparency/service/market/intra-day-trade-history?endDate=2022-01-26&startDate=2022-01-26';

function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [tradeHistory, setTradeHistory] = useState([]);

  const data = useMemo(() => tradeHistory, [tradeHistory]);

  const columns = useMemo(
    () => [
      {
        Header: 'Tarih',
        accessor: 'date',
      },
      {
        Header: 'Toplam Işlem Miktarı(MWh)',
        accessor: 'islemMiktari',
      },
      {
        Header: 'Toplam Işlem Turarı(TL)',
        accessor: 'islemTutari',
      },
      {
        Header: 'Ağırlık Ortalama Fiyat(TL/MWh)',
        accessor: 'ortalamaFiyat',
        isNumeric: true,
      },
    ],
    []
  );

  const getData = () => {
    setIsFetching(true);
    const result = [];

    fetch(url)
      .then((res) => res.text())
      .then((text) => JSON.parse(text))
      .then((data) => {
        data.body.intraDayTradeHistoryList
          .filter((x) => x.conract.includes('PH'))
          .reduce((res, value) => {
            if (!res[value.conract]) {
              const dateString = value.conract.slice(2);
              const year = '20' + dateString.slice(0, 2);
              const month = dateString.slice(2, 4);
              const day = dateString.slice(4, 5);
              const hour = dateString.slice(-2);

              res[value.conract] = {
                conract: value.conract.slice(2),
                date: `${day}.${month}.${year} ${hour}:00`,
                price: 0,
                quantity: 0,
              };
              result.push(res[value.conract]);
            }
            res[value.conract].quantity += value.quantity;
            res[value.conract].price += value.price;
            return res;
          }, {});

        result.sort((a, b) => a.conract - b.conract);

        const response = result.map((x) => {
          const islemTutari = (x.price * x.quantity) / 10;
          const islemMiktari = x.quantity / 10;
          const ortalamaFiyat = islemTutari / islemMiktari;
          return {
            ...x,
            islemTutari: islemTutari.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            }),
            islemMiktari: islemMiktari.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            }),
            ortalamaFiyat: ortalamaFiyat.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            }),
          };
        });
        setTradeHistory(response);
        setIsFetching(false);
      })
      .catch((err) => {
        console.error(err);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container maxW='container.xl'>
      <Heading textAlign='center' my='16'>
        SmartPulse A.Ş. Stajyer Değerlendirme Teknik Mülakat Ödevi
      </Heading>
      <Box w='100%'>
        {isFetching ? (
          <Spinner size='xl' />
        ) : (
          <DataTable data={data} columns={columns} />
        )}
      </Box>
      <Footer />
    </Container>
  );
}

export default App;
