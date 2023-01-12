import React from 'react';
import {ApolloProvider} from '@apollo/client';
import {render, waitFor} from '@testing-library/react-native';
import {graphql} from 'msw';
import App, {client} from './App';
import {server} from './mocks/server';

export const testRenderer = (children, responseOverride) => {
  if (responseOverride) {
    server.use(responseOverride);
  }
  return render(<ApolloProvider client={client}>{children}</ApolloProvider>);
};

describe('<App />', () => {
  beforeEach(() => {
    client.resetStore(); // we are using a real apollo client with inMemoryCache, we should reset the store before each test
  });

  it('should correctly render the component', async () => {
    const {getByTestId} = testRenderer(<App />);

    await waitFor(() => expect(getByTestId('country-0')).toBeDefined());
  });

  it('should correctly render an empty list component', async () => {
    const queryOverride = graphql.query('GetCountries', (req, res, ctx) => {
      return res.once(
        ctx.data({
          countries: [],
        }),
      );
    });
    const {getByText} = testRenderer(<App />, queryOverride);
    await waitFor(() => expect(getByText('Empty List')));
  });

  it('should show display error message when an error gets triggered', async () => {
    const queryOverride = graphql.query('GetCountries', (req, res, ctx) => {
      return res.once(ctx.errors([{message: 'Error message'}]));
    });
    const {getByText} = testRenderer(<App />, queryOverride);
    await waitFor(() =>
      expect(getByText('Service is unavailable. Try again Later')),
    );
  });
});
