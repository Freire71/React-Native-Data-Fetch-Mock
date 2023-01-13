import {Server, Model} from 'miragejs';
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
  let server = new Server({
    environment,
    models: {
      country: Model,
    },
    seeds(s) {
      s.create('country', {name: 'United States', code: 'US'} as any);
      s.create('country', {name: 'Brazil', code: 'BRA'} as any);
      s.create('country', {name: 'Argentina', code: 'ARG'} as any);
    },

    routes() {
      const graphQLHandler = createGraphQLHandler(graphQLSchema, this.schema);
      this.post('https://countries.trevorblades.com/', graphQLHandler);
    },
  });
  return server;
}
