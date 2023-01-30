import {Server, Model} from 'miragejs';
import {createGraphQLHandler} from '@miragejs/graphql';

export const API_URl = 'https://countries.trevorblades.com/';
export const LOCAL_URL = 'http://localhost:3000/graphql';

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
  let server = new Server({
    environment,
    routes() {
      const graphQLHandler = createGraphQLHandler(graphQLSchema, this.schema);
      this.post('/graphql', graphQLHandler);
    },
    models: {
      country: Model,
    },
    seeds(s) {
      s.create('country', {name: 'United States', code: 'US'} as any);
      s.create('country', {name: 'Brazil', code: 'BRA'} as any);
      s.create('country', {name: 'Argentina', code: 'ARG'} as any);
      s.create('country', {name: 'Colombia', code: 'COL'} as any);
    },
  });
  server.logging = true;
  return server;
}
