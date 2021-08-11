import React from 'react'

import { ApolloProvider } from './src/config/graphql'
import Home from './src/screens/Home'

export default function App() {
  return (
    <ApolloProvider>
      <Home/>
    </ApolloProvider>
  )
}
