import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Platform,
  StatusBar,
  KeyboardAvoidingView } from 'react-native';
import SearchInput from './components/TextInput';
import getImage from './api/images';
import { fetchLocationId, fetchWeatherData } from './api/getWeatherApi';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
      location: '',
      temperature:  24,
      weather: ''
    };
    this.changeLocation = this.changeLocation.bind(this);
  }

  componentDidMount() {
    this.changeLocation('San Francisco');
  }

   async changeLocation(city) {
     if (!city) return;
    this.setState({loading: true}, async () => {
      try {
        const id = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeatherData(id);
        this.setState({location, weather, temperature, loading: false});
      } catch(e) {
        this.setState({
          loading: false,
          error: true
        })
      }
    });
  }

  render() {
    const { location, weather, temperature, loading, error } = this.state;
    return (
     <KeyboardAvoidingView style={styles.container} behavior='padding' >
      <StatusBar barStyle='light-content' />
       <ImageBackground source={getImage(weather)} style={styles.imageContainer} imageStyle={styles.image} >
          <View style={styles.content} >
          <ActivityIndicator animating={loading} size='small' color='white' />
          {!loading && (
            <View>
            {error && (
              <View>
                <Text style={[styles.textStyle, styles.smallText]}>There was an error loading weather data.</Text>
              </View>
            )}
            {!error && (
              <View>
                <Text style={[styles.textStyle, styles.largeText]}>{location}</Text>
                <Text style={[styles.textStyle, styles.smallText]} >{weather}</Text>
                <Text style={[styles.textStyle, styles.largeText]}>{Math.round(temperature) + '°'}</Text>
              </View>
            )}
            </View>
          )}
              <SearchInput placeholder='Please enter your location' onSubmit={this.changeLocation} />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E'
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20
  },
  textStyle: {
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
    textAlign: 'center'
  },
  smallText: {
    fontSize: 18
  },
  largeText: {
    fontSize: 44
  }
})
