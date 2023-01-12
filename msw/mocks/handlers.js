import {graphql} from 'msw';

export const handlers = [
  graphql.query('GetCountries', (req, res, ctx) => {
    return res(
      ctx.data({
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
      }),
    );
  }),
];
