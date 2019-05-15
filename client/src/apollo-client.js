import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient, InMemoryCache } from 'apollo-boost';

const GRAPHQL_URI = 'localhost:4000';

const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_URI}`,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({
  uri: `http://${GRAPHQL_URI}`
});

const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' && 
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache()
});