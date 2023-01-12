import {createServer, Server} from 'miragejs';
import {createGraphQLHandler} from '@miragejs/graphql';

export const graphQLSchema = `

type Country {
  code: String!
  name: String!
}

type Query {
  countries: [Country]
}
`;

export function makeServer({environment = 'development'} = {}) {
  return createServer({
    environment,
    routes() {
      const graphQLHandler = createGraphQLHandler(graphQLSchema, this.schema);
      this.post('https://countries.trevorblades.com/', graphQLHandler);
    },
    seeds(server) {
      server.create('country', {code: 'US', name: 'United States'} as any);
    },
  });
}
