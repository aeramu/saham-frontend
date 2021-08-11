import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';

interface ApolloProviderProps{
    children: any
}
export const ApolloProvider = ({children}: ApolloProviderProps) => {
    const client = new ApolloClient({
        uri: "https://saham-backend.herokuapp.com",
        cache: new InMemoryCache(),
    })

    return(
        <Provider client={client}>
            {children}
        </Provider>
    )
}