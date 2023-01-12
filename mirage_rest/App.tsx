/* eslint-disable no-catch-shadow */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text, View} from 'react-native';
import {makeServer} from './server';

if (process.env.NODE_ENV === 'development') {
  if (window.server) {
    window.server.shutdown();
  }
  window.server = makeServer();
}

const ListComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState();
  console.log({isLoading, countries, error});
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        let res = await fetch('/api/countries');
        let data = await res.json();
        console.log({data});
        data.errors ? setError(data.errors) : setCountries(data.countries);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);
  if (isLoading) {
    return <Text>Loading.....</Text>;
  }
  if (error) {
    return <Text>Service is unavailable. Try again Later</Text>;
  }
  if (countries.length === 0) {
    return <Text>Empty List</Text>;
  }
  return (
    <View>
      {countries.map((country: any, index: number) => {
        return (
          <View key={country.code} testID={`country-${index}`}>
            <Text>{country.name}</Text>
            <Text>{country.code}</Text>
          </View>
        );
      })}
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ListComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
