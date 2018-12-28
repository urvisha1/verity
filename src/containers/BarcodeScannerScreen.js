import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView,
  Dimensions,
  Image 
} from 'react-native';

// import Camera from 'react-native-camera';
// import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import BarcodeScanner from 'react-native-barcodescanner';
// import { BarCodeScanner, Permissions } from 'expo';

import { Actions } from 'react-native-router-flux';

var height = Dimensions.get('window').height;
var userId="";
export default class BarcodeScannerScreen extends Component<{}> {
  
    constructor(props) {
      super(props);
        this.state = {
          torchMode: 'off',
          cameraType: 'back',
          hasCameraPermission: null,
       }
    }
    goBack() {
      Actions.pop();
    }
   async componentWillMount() {
      
      
     await AsyncStorage.getItem('userId',
      (err,value) => {
        if(value != "")
        {
          userId=value;
        }
        
      });

      
      
   }

   barcodeReceived(e) {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
  }
  
  render() {
    
  }




}

const styles = StyleSheet.create({
  ImageIconStyle: {
     padding: 10,
     margin: 5,
     height: 10,
     width: 10,
     borderRadius:5,
     resizeMode : 'stretch',
   
  },
  mainContainer : {
    backgroundColor:'#ffffff',
    height:height,
    alignItems:'center',
    justifyContent :'center'
  },
  container : {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',

  },
  labelText : {
    marginVertical: 15,
    fontWeight:'bold',
    fontSize:20,
    color:'#426bb1'
  },
  inputBox: {
    flexGrow: 0.1,
    width:300,
    backgroundColor:'#ffffff',
    borderWidth:1,
    borderRadius:5,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000000',
    marginVertical: 10
  },
  button: {
    width:100,
      backgroundColor:'#426bb1',
      borderRadius: 5,
      marginVertical: 5,
      paddingVertical: 5
  },
  buttonText: {
    fontSize:18,
    fontWeight:'800',
    color:'#ffffff',
    textAlign:'center'
  },
  
});
