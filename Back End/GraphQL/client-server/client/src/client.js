import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

const typeDefs = gql`
 extend type User {
   type: Int
 }
`

const resolvers = {
  User: {
    age() {
      return 35
    }
  }
}

// Link - network interface to access graphQL server ; telling our Apollo are API is here
const http = new HttpLink({ uri: 'http://localhost:4000/' });
const delay = setContext(
  request =>
    new Promise((sucess, fail) => {
      setTimeout(() => {
        sucess()
      }, 800)
    })
)
const link = ApolloLink.from([
  delay,
  http
])

const cache = new InMemoryCache();

// initializing the client
const client = new ApolloClient({
  link, cache, typeDefs, resolvers
});

export default client;