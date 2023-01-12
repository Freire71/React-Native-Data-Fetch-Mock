import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {MockedProvider} from '@apollo/client/testing';
import App, {GET_COUNTRIES} from './App';

export const testRenderer = (children, mocks) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>,
  );
};

const happyPathMock = [
  {
    request: {
      query: GET_COUNTRIES,
    },
    result: {
      data: {
        countries: [
          {
            name: 'Brazil',
            code: 'BR',
          },
          {
            name: 'United States',
            code: 'US',
          },
          {
            name: 'Colombia',
            code: 'COL',
          },
          {
            name: 'Argentina',
            code: 'ARG',
          },
        ],
      },
    },
  },
];

describe('<App />', () => {
  it('should correctly render the component', async () => {
    const {getByTestId} = testRenderer(<App />, happyPathMock);

    await waitFor(() => expect(getByTestId('country-0')).toBeDefined());
  });

  it('should correctly render an empty list component', async () => {
    const mock = [
      {
        request: {
          query: GET_COUNTRIES,
        },
        result: {
          data: {
            countries: [],
          },
        },
      },
    ];
    const {getByText} = testRenderer(<App />, mock);
    await waitFor(() => expect(getByText('Empty List')));
  });

  it('should show display error message when an error gets triggered', async () => {
    const mock = [
      {
        request: {
          query: GET_COUNTRIES,
        },
        error: new Error('Service is unavailable. Try again Later'),
      },
    ];
    const {getByText} = testRenderer(<App />, mock);
    await waitFor(() =>
      expect(getByText('Service is unavailable. Try again Later')),
    );
  });
});
