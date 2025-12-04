import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ApolloClient,ApolloProvider,InMemoryCache,} from '@apollo/client'

const client = new ApolloClient({
  // The URI contain the link to the Apollo Server
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />

    </ApolloProvider>
    
  </StrictMode>,
)
