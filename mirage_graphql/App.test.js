import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {render, waitFor} from '@testing-library/react-native';
import App, {client} from './App';
import {makeServer} from './server';

export const testRenderer = children => {
  return render(<ApolloProvider client={client}>{children}</ApolloProvider>);
};

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
    // Component's query never resolves its loading state
    const {getByTestId} = testRenderer(<App />);

    await waitFor(() => expect(getByTestId('country-0')).toBeDefined());
  });
});
