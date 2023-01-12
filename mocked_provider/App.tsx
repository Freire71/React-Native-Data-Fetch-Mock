import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  gql,
  useQuery,
} from '@apollo/client';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://countries.trevorblades.com/',
    fetch,
  }),
});

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      code
    }
  }
`;

const ListComponent = () => {
  const {loading, error, data} = useQuery(GET_COUNTRIES);
  if (loading) {
    return <Text>Loading.....</Text>;
  }
  if (error) {
    return <Text>Service is unavailable. Try again Later</Text>;
  }
  if (data.countries.length > 0) {
    return (
      <View>
        {data.countries.map((country: any, index: number) => {
          return (
            <View key={country.code} testID={`country-${index}`}>
              <Text>{country.name}</Text>
              <Text>{country.code}</Text>
            </View>
          );
        })}
      </View>
    );
  }
  return <Text>Empty List</Text>;
};
const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <ListComponent />
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
