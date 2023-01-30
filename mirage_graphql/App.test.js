import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App, {client, ListComponent, urqlClient} from './App';
import {makeServer} from './server';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

describe('<App />', () => {
  let server;

  beforeEach(() => {
    server = makeServer({environment: 'test'});
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should correctly render the component', async () => {
    server.create('country', {name: 'United States', code: 'US'});

    const testClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: '/graphql',
        fetch: (...pl) => {
          const [_, options] = pl;
          const body = JSON.parse(options.body);
          console.log(
            `📡${body.operationName || ''}\n${body.query}`,
            body.variables,
          );
          return fetch(...pl);
        },
      }),
    });
    const {getByTestId, findByText} = render(
      <ApolloProvider client={testClient}>
        <ListComponent />
      </ApolloProvider>,
    );
    await waitFor(() => expect(getByTestId('country-0')).toBeDefined());
  });
});
