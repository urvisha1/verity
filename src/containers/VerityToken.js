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
  ActivityIndicator 
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { Actions } from 'react-native-router-flux';

var height = Dimensions.get('window').height;
var userId="";
export default class VerityTokenForm extends Component<{}> {
  
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
      
      
      await fetch('https://t.certified.bz/index.php?option=com_jewebservices&task=getVerityTokenForm', {  
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId:userId
                  })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    
                    console.log(responseJson);
                    if(responseJson.success == 1)
                    {

                      console.log(responseJson.result);
                      for (let details of responseJson.result) {
                        
                        if(details.fieldName == "ERC20 Address:")
                        {
                            this.setState({ERCAddress:details.value});
                            this.setState({ERCAddressFieldId:details.fieldId});
                        }
                        else if(details.fieldName == "VRTY Balance:")
                        {
                            this.setState({VRTYBalance:details.value});
                            this.setState({VRTYBalanceFieldId:details.fieldId});
                        }
                        else if(details.fieldName == "VRTY USD Value:")
                        {
                            this.setState({VRTYUSDValue:details.value});
                            this.setState({VRTYUSDValueFieldId:details.fieldId});
                        }
                      }

                      
                    }
                    else
                    {
                        Alert.alert(
                          'Verity One',
                          responseJson.message,
                          [
                            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ],
                          { cancelable: false }
                        )
                    }

                    this.setState({loading:false});
                

                
              })
              .catch((error) => {
                console.error(error);
                this.setState({loading:false});
              });  
  }
  
   
    ERCAddressChange = (text) => {
     this.setState({
      ERCAddress:text
     });
    }
    VRTYBalanceChange = (text) => {
     this.setState({
      VRTYBalance:text
     });
    }
    VRTYUSDValueChange = (text) => {
     this.setState({
      VRTYUSDValue:text
     });
    }

    onSaveClick = () => {
    
    let errcnt=0;
    let arr=[];
    
    if(!this.state.loading)
    {
        var obj = [
                    { "fieldId": this.state.ERCAddressFieldId, 'value':this.state.ERCAddress},
                    { "fieldId": this.state.VRTYBalanceFieldId, 'value':this.state.VRTYBalance},
                    { "fieldId": this.state.VRTYUSDValueFieldId, 'value':this.state.VRTYUSDValue}

                  ];

                  
        if(this.state.VRTYBalance == "")
        {
            Alert.alert(
                    'Verity One',
                    'Please enter VRTY Balance.',
                    [
                      // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
            errcnt++;
            return;
        } 

        if(this.state.VRTYUSDValue == "")
        {
            Alert.alert(
                    'Verity One',
                    'Please enter VRTY USD Value.',
                    [
                      // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
            errcnt++;
            return;
        }


        if(errcnt == 0)
        {

              this.setState({loading:true});
          // Actions.confirmation(); 
              fetch('https://t.certified.bz/index.php?option=com_jewebservices&task=saveVerityToken', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    
                    userId:userId,
                    fields: obj


                  })
                 
                })
                .then((response) => response.json())
                .then((responseJson) => {
                 
                // Showing response message coming from server after inserting records.
                  console.log(responseJson);
                  this.setState({loading:false});
                  
                  if(responseJson.success == 1)
                  {
                    
                    Alert.alert(
                      'Verity One',
                      responseJson.message,
                      [
                        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => Actions.dashboard()},
                      ],
                      { cancelable: false }
                    )

                    // Actions.dashboard();

                    // this.ERCAddress.setNativeProps({ text: '' })
                    // this.VRTYBalance.setNativeProps({ text: '' })
                    // this.VRTYUSDValue.setNativeProps({ text: '' })
                    
                    // this.setState({ERCAddress:''});
                    // this.setState({VRTYBalance:''});
                    // this.setState({VRTYUSDValue:''});


                  
                    // AsyncStorage.getItem('userId', (err, result) => {
                    //   console.log(result);
                    // });
                  } 
                  else
                  {

                 
                    Alert.alert(
                      'Verity One',
                      responseJson.message,
                      [
                        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: false }
                    )
                  } 
                }).catch((error) => {
                  console.error(error);
                  this.setState({loading:false});
                });

        } 
    }    
    
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
            <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            >
                <Text style={styles.labelText}>VERITY Token</Text>
                
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="ERC20 Address"
                    placeholderTextColor = "#999999"
                    value={this.state.ERCAddress}
                    selectionColor="#fff"
                    ref={(input) => {
                      this.ERCAddress = input
                    }}
                    onChangeText = {this.ERCAddressChange}/>
               


                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="VRTY Balance"
                    value={this.state.VRTYBalance}
                    placeholderTextColor = "#999999"
                    selectionColor="#fff"
                    ref={(input) => {
                      this.VRTYBalance = input
                    }}
                    onChangeText={this.VRTYBalanceChange}
                    /> 
                        
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="VRTY USD Value"
                    value={this.state.VRTYUSDValue}
                    placeholderTextColor = "#999999"
                    selectionColor="#fff"
                    ref={(input) => {
                      this.VRTYUSDValue = input
                    }}
                    onChangeText={this.VRTYUSDValueChange}

                    />
                          
                 <TouchableOpacity style={styles.button} onPress = {
                        () => this.onSaveClick()} >
                   <Text style={styles.buttonText}>Save</Text>
                 </TouchableOpacity>   
                  <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />
                  </View>
            </KeyboardAvoidingView>
            <View style={{flex:1,flexDirection: 'row',}}>
          
            </View>
            <View style={{flex:1,flexDirection: 'row',}}>
              
            </View> 
      </View> 
    
      )
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
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
  
});
