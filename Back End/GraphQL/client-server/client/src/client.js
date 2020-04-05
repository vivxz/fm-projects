import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

// Link - network interface to access graphQL server ; telling our Apollo are API is here
const link = new HttpLink({ uri: 'http://localhost:4000/' });
const cache = new InMemoryCache();

// initializing the client
const client = new ApolloClient({
  link, cache
});

export default client;