import {Server, Model} from 'miragejs';

export function makeServer({environment = 'development'} = {}) {
  let server = new Server({
    environment,
    models: {
      country: Model,
    },
    seeds(s) {
      s.create('country', {name: 'United States', code: 'US'});
      s.create('country', {name: 'Brazil', code: 'BRA'});
      s.create('country', {name: 'Argentina', code: 'ARG'});
    },

    routes() {
      this.get('/api/countries', schema => {
        return schema.countries.all();
      });
    },
  });
  return server;
}
