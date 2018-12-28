
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar 
} from 'react-native';


import Routes from './src/Routes';
import { Font } from 'expo';


export default class App extends Component<{}> {

  componentDidMount() {
    Font.loadAsync({
      'FontAwesome': require('./assets/fonts/FontAwesome.ttf'),
    });
  }

  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor="#ffffff"
           barStyle="dark-content"
         />
        <Routes/>
         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});
