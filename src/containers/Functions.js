import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  BackHandler
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Modal from "react-native-modal";




import Toast, {DURATION} from 'react-native-easy-toast';
import Expo from 'expo';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export function BackPress(currentScreen) {
      console.log("current Screen: "+currentScreen);
      // Alert.alert(
      // 'Exit App',
      // 'Do you want to exit?',
      // [
      //   {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      //   {text: 'Yes', onPress: () => BackHandler.exitApp()},
      // ],
      // { cancelable: false })
      if(currentScreen == "Login" || currentScreen == "Dashboard")
      {
        BackHandler.exitApp();
      }
      return true;
}
   