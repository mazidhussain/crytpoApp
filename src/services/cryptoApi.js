import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders={
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': 'f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85'
}

const baseUrl='https://coinranking1.p.rapidapi.com';

const createRequest=(url)=>({url,headers:cryptoApiHeaders});

export const cryptoApi=createApi({
    reducerPath:'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
          query: (count) => createRequest(`/coins?limit=${count}`),
        }),
    
        getCryptoDetails: builder.query({
          query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
    
        // Note: Change the coin price history endpoint from this - `coin/${coinId}/history/${timeperiod} to this - `coin/${coinId}/history?timeperiod=${timeperiod}`
        getCryptoHistory: builder.query({
          query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
        }),
    
        // Note: To access this endpoint you need premium plan
        getExchanges: builder.query({
          query: () => createRequest('/exchanges'),
        }),
      }),
})
export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetExchangesQuery,
    useGetCryptoHistoryQuery,
  } = cryptoApi;
  