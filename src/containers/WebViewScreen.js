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
  Image,
  ActivityIndicator,
  WebView 
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { Actions } from 'react-native-router-flux';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var userId="";
export default class WebViewScreen extends Component<{}> {
  
    constructor(props) {
      super(props);
        this.state = {
          ERCAddress: '',
          VRTYBalance:'',
          VRTYUSDValue:'',
          ERCAddressFieldId: '',
          VRTYBalanceFieldId:'',
          VRTYUSDValueFieldId:'',
          loading:false

       }
    }
    goBack() {
      Actions.pop();
    }
   async componentWillMount() {
      
     this.setState({loading:true}); 
     await AsyncStorage.getItem('userId',
      (err,value) => {
        if(value != "")
        {
          userId=value;
        }
        
      });
      
      
      
  }
  
   
    
  render(){

    return(
      
      <View style={styles.mainContainer}>
      
        <View style={{ flexDirection:'row',alignSelf:'flex-start',paddingTop:25,paddingLeft:10 }}>

                
        <TouchableOpacity onPress={this.goBack}><Image 
                      source={require('../images/backarraow.png')} 
                      style={styles.ImageIconStyle} 
                      /></TouchableOpacity>

        </View> 
        <View
            style={styles.container}>
                <Text style={styles.labelText}>{this.props.pageName}</Text>
        </View>
            <View style={[styles.row,styles.subcontainer]}>
               <WebView
                  source={{uri: this.props.pageLink}}
                  style={{marginTop: 20}}
                />
            </View>
            <View style={{flex:1,flexDirection: 'row',}}>
          
            </View>
            <View style={{flex:1,flexDirection: 'row',}}>
              
            </View> 
      </View> 
    
      )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width:width,
    paddingHorizontal:10
  },
  subcontainer:{
    height:height,
    flex:10,

  },
  flatview: {
    justifyContent: 'center',
    // paddingTop: 30,
    borderRadius: 2,
    flexGrow:3,
    backgroundColor:'#ffffff',
    margin: 5,
    padding: 10,
    paddingRight:10,
    borderRadius: 2,
    borderColor: '#9f9f9f',
    borderBottomWidth: 0,
    shadowColor: '#666',
    shadowRadius: 3,
    elevation: 1,
    // shadowOffset: { width: 2, height: 3 },
    // shadowOpacity: 0.9,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.8

  },
  codeLabel: {
    color:'#426bb1',
    fontSize:20
  },
  container : {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',
      },
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
  labelText : {
    marginVertical: 15,
    fontWeight:'bold',
    fontSize:20,
    color:'#426bb1'
  },
});
