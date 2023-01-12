import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {Response} from 'miragejs';
import App from './App';
import {makeServer} from './server';

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
    const {getByTestId} = render(<App />);

    await waitFor(() => expect(getByTestId('country-0')).toBeDefined());
  });

  it('should correctly render an empty list component', async () => {
    server.get('/api/countries', () => ({
      countries: [],
    }));
    const {getByText} = render(<App />);
    await waitFor(() => expect(getByText('Empty List')));
  });

  it('should show display error message when an error gets triggered', async () => {
    server.get('/api/countries', () => {
      return new Response(500, {}, {errors: ['The database went on vacation']});
    });
    const {getByText} = render(<App />);
    await waitFor(() =>
      expect(getByText('Service is unavailable. Try again Later')),
    );
  });
});
