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
  Animated,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker'

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default class SignupForm extends Component<{}> {
  
    constructor(props) {
      super(props);
        this.state = {
          name: '',
          birthday:'',
          mobile:'',
          email:'',
          password:'',
          cpassword:'',
          referalCode:'',
          loading:false


       }
       
    }

    goBack() {
      Actions.pop();
    }

    nameChange = (text) => {
      this.setState({ name: text })
      
    }
    
    birthdayChange = (text) => {
     this.setState({
      birthday:text
     });
    }
    emailChange = (text) => {
     this.setState({
      email:text
     });
    }
    mobileChange = (text) => {
     this.setState({
      mobile:text
     });
    }
    passwordChange = (text) => {
     this.setState({
     password:text
     });
    }
    cpasswordChange = (text) => {
     this.setState({
     cpassword:text
     });
    }

    referalCodeChange= (text) => {
     this.setState({
     referalCode:text
     });
    }

    signupClick = () => {
       
    
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    let errcnt=0;
    if(!this.state.loading)
    {
        if(this.state.email == "")
        {
            Alert.alert(
                    'Verity One',
                    'Please enter your email address.',
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

        if(reg.test(this.state.email) === false)
        {
            Alert.alert(
                    'Verity One',
                    'Please enter valid email address.',
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

        if(this.state.password == "")
        {
            Alert.alert(
                    'Verity One',
                    'Please enter password.',
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
        if(this.state.cpassword == "")
        {
            Alert.alert(
                    'Verity One',
                    'Please enter confirm password.',
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
        if(this.state.password != this.state.cpassword)
        {
            Alert.alert(
                    'Verity One',
                    'Password does not match.',
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
        if((this.state.password).length < 6)
        {
            Alert.alert(
                    'Verity One',
                    'The password must be 6 characters long or more.',
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

          // if(this.state.birthday != "")
          // {
          //     var todayTime = new Date(this.state.birthday);
          //     var month = todayTime .getMonth() + 1;
          //     var day = todayTime .getDate();
          //     var year = todayTime .getFullYear();

          //     if(day<10){day='0'+day} if(month<10){month='0'+month}

          //     var userBirthday=month+"-"+day+"-"+year;  
          // }
          // else
          // {
          //     var userBirthday=this.state.birthday;
          // }
          
          console.log({
            name: this.state.name,
            birthday: this.state.birthday,
            email: this.state.email,
            mobile: this.state.mobile,
            password:this.state.password,
            referalCode:this.state.referalCode
          });  
        
          this.setState({loading:true});
          // Actions.confirmation(); 
              fetch('https://t.certified.bz/index.php?option=com_jewebservices&task=signin', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                 
                    name: this.state.name,
                    password:this.state.password,
                    email: this.state.email,
                    birthday: this.state.birthday,
                    mobileNumber: this.state.mobile,
                    socialType:"0",
                    isSocial: "NO", 
                    firebaseId:"",
                    profileImage : "",
                    referalCode:this.state.referalCode 


                  })
                 
                })
                .then((response) => response.json())
                .then((responseJson) => {
                 
                // Showing response message coming from server after inserting records.
                  console.log(responseJson);

                  this.setState({loading:false});
                  if(responseJson.success == 1)
                  {
                    
                    AsyncStorage.setItem('userId', responseJson.profile.userId);
                    AsyncStorage.setItem('name', responseJson.profile.name);
                    AsyncStorage.setItem('email', responseJson.profile.email);

                    Actions.dashboard();

                    this.name.setNativeProps({ text: '' })
                    this.mobile.setNativeProps({ text: '' })
                    this.email.setNativeProps({ text: '' })
                    this.password.setNativeProps({ text: '' })
                    this.cpassword.setNativeProps({ text: '' })
                    this.referalCode.setNativeProps({ text: '' })
                    
                    this.setState({name:''});
                    this.setState({birthday:''});
                    this.setState({mobile:''});
                    this.setState({email:''});
                    this.setState({password:''});
                    this.setState({cpassword:''});
                    this.setState({referalCode:''});

                  
                    // AsyncStorage.getItem('userId', (err, result) => {
                    //   console.log(result);
                    // });
                  }
                  else if(responseJson.success == 0 && responseJson.message == "User already exist")
                  {

                   
                      Alert.alert(
                        'Verity One',
                        'The email address is already in use by another account.',
                        [
                          // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                          // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                      )
                  } 
                  else
                  {

                 
                    Alert.alert(
                      'Verity One',
                      'some error occurred, Please try after few minutes.',
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
        <View style={{ flexDirection:'row',alignSelf:'flex-start',paddingTop:Platform.OS === 'ios' ? 25 : 45,paddingLeft:10 }}>

                
        <TouchableOpacity onPress={this.goBack}><Image 
                      source={require('../images/backarraow.png')} 
                      style={styles.ImageIconStyle} 
                      /></TouchableOpacity>

        </View>
            <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            keyboardShouldPersistTaps="always"
            scrollEnabled={true}
            behavior="padding"
            >

                <Text style={styles.labelText}>Sign Up</Text>
                
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Name"
                    placeholderTextColor = "#999999"
                    selectionColor="#fff"
                    ref={(input) => {
                      this.name = input
                    }}
                    onChangeText = {this.nameChange}/>
                
                
                <DatePicker
                    style={{
                    width:width-20,
                    height:30,
                    backgroundColor:'#ffffff',
                    borderWidth:1,
                    marginVertical: 10,
                    borderRadius:5}}
                    date={this.state.birthday}
                    mode="date"
                    placeholder="Birthday"
                    format="MM-DD-YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        height: 0,
                        width: 0
                      },
                      dateInput: {
                        borderWidth:0,
                        alignSelf:'flex-start'
                      },
                      dateText:{
                        color: '#c7c8ca',
                        alignSelf:'flex-start',
                        color:'#000000',
                        paddingHorizontal:16,
                        marginTop: -8
                      },
                      placeholderText: {
                            fontSize: 16,
                            color: '#999999',
                            alignSelf:'flex-start',
                            paddingHorizontal:16,
                            marginTop: -8
                        }

                    }}
                    ref={(input) => {
                      this.birthday = input
                    }}
                    onDateChange={(date) => {this.setState({birthday: date})}}
                />
               
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Mobile Number"
                    placeholderTextColor = "#999999"
                    selectionColor="#fff"
                    ref={(input) => {
                      this.mobile = input
                    }}
                    onChangeText={this.mobileChange}
                    /> 
                        
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Email"
                    placeholderTextColor = "#999999"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    ref={(input) => {
                      this.email = input
                    }}
                    onChangeText={this.emailChange}

                    />
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor = "#999999"
                    ref={(input) => {
                      this.password = input
                    }}
                    onChangeText={this.passwordChange}
                    />
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    placeholderTextColor = "#999999"
                    ref={(input) => {
                      this.cpassword = input
                    }}
                    onChangeText={this.cpasswordChange}
                    />
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Referral Code"
                    placeholderTextColor = "#999999"
                    selectionColor="#fff"
                    ref={(input) => {
                      this.referalCode = input
                    }}
                    onChangeText={this.referalCodeChange}
                    /> 
                          
                 <TouchableOpacity style={styles.button} onPress = {
                        () => this.signupClick()} >
                   <Text style={styles.buttonText}>Register</Text>
                 </TouchableOpacity>   
                 <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" color="#0000ff"
                      animating={this.state.loading} />
                </View>
            </KeyboardAwareScrollView>
            <View style={{flex:1}}></View>
            
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
    width:width-20,
    backgroundColor:'#ffffff',
    borderWidth:1,
    borderRadius:5,
    paddingHorizontal:16,
    fontSize:16,
    color:'#000000',
    marginVertical: 10,
    paddingHorizontal:16,
    height:30
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
