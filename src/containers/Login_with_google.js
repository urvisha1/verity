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
  ActivityIndicator 
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Modal from "react-native-modal";


import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import Toast, {DURATION} from 'react-native-easy-toast';


var height = Dimensions.get('window').height;

// import { SocialIcon } from 'react-native-elements'; // apply css for social button
export default class Login extends Component<{}> {

  

    constructor(props) {
      super(props);
        this.state = {
          email:'',
          password:'',
          forgotEmail:'',
          loading:false
          

        }
    }

  componentWillMount() {

      var userId=""
      AsyncStorage.getItem('userId',
      (err,value) => {
        if(value != "" && value != null)
        {
          userId=value;
          this.setState({loading:true});
          setTimeout(function(){ 
              Actions.dashboard(); 
          },3000);
        }
        // else
        // {
        //  Actions.login()
        // }
        
      });
    }  

  signup() {

    Actions.signup()
  }

  state = {
    isModalVisible: false
  };


  googleLogin= () =>
  {
    if(!this.state.loading)
    {
        this.setState({loading:true});

          GoogleSignin.configure({
            iosClientId: '874376514949-57er50ei596s5tn9pbl8kb6mt93f9rtq.apps.googleusercontent.com', // only for iOS
          })
          .then(() => {
              GoogleSignin.signIn()
                .then((user) => {


                  console.log(user);
                  // console.log({
                  //       name:user.name,
                  //       password:"",
                  //       email: user.email,
                  //       birthDay:"",
                  //       mobileNumber:"",
                  //       socialType:"0",
                  //       isSocial:"YES",
                  //       firebaseId:"",
                  //       profileImage:user.photo

                  //     });

                  
                    // "name": ."Hiren Vadher",
                    // "password": "",
                    // "email": "hiren@gmail.com"
                    // "birthDay":"MM-dd-yyyy"
                    // "mobileNumber":""
                    // "socialType":"0"
                    // "isSocial": "YES", 
                    // "firebaseId":"asdfsadf@#$*245324"
                    // "profileImage" : "http://www.google.com"

                    // socialType means one from below
                    // GOOGLE = 0
                    // FACEBOOK = 1
                    // TWITTER = 2

                  fetch('https://t.certified.bz/index.php?option=com_jewebservices&task=signin', {  
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        name:user.name,
                        password:"",
                        email: user.email,
                        birthDay:"",
                        mobileNumber: "",
                        socialType:"0",
                        isSocial:"YES",
                        firebaseId:"",
                        profileImage:user.photo

                      })
                    })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    console.log(responseJson);

                    this.setState({loading:false});
                    if(responseJson.success == 1)
                    {

                      // GoogleSignin.signOut()
                      // .then(() => {
                      //   console.log('out');
                      // })
                      // .catch((err) => {

                      // });
                      console.log(responseJson.profile);
                      console.log(responseJson.profile.email);
                      // var userData={
                      //   'userId':responseJson.profile.userId,
                      //   'email':responseJson.profile.email,
                      //   'name': esponseJson.profile.name
                      // };
                      AsyncStorage.setItem('userId', responseJson.profile.userId);
                      AsyncStorage.setItem('name', responseJson.profile.name);
                      AsyncStorage.setItem('email', responseJson.profile.email);

                      // AsyncStorage.getItem('userId', (err, result) => {
                      //   console.log(result);
                      // });
                      Actions.dashboard();

                      this.email.setNativeProps({ text: '' })
                      this.password.setNativeProps({ text: '' })

                      this.setState({
                        email:''
                       });
                      this.setState({
                       password:''
                       });
                      
                    }
                    else
                    {
                        Alert.alert(
                          'Verity One',
                          'There is no user record corresponding to this identifier. The user may have been deleted.',
                          [
                            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ],
                          { cancelable: false }
                        )
                    }
                    

                    
                  })
                  .catch((error) => {
                    this.setState({loading:false});
                    console.error(error);
                  });  


                })
                .catch((err) => {
                  this.setState({loading:false});
                  console.log('WRONG SIGNIN', err);
                })
                .done();
          });

      }
  }

  normalLogin= () =>
  {
    console.log("login click");
    
    if(!this.state.loading)
    {

        

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        let errcnt=0;
        
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
        if(errcnt == 0)
        {
            
            this.setState({loading:true});
            fetch('https://t.certified.bz/index.php?option=com_jewebservices&task=normalLogin', {  
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: this.state.email,
                  password: this.state.password,
                })
              })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);

              this.setState({loading:false});
              if(responseJson.success == 1)
              {
                console.log(responseJson.profile);
                console.log(responseJson.profile.email);
                // var userData={
                //   'userId':responseJson.profile.userId,
                //   'email':responseJson.profile.email,
                //   'name': esponseJson.profile.name
                // };
                AsyncStorage.setItem('userId', responseJson.profile.userId);
                AsyncStorage.setItem('name', responseJson.profile.name);
                AsyncStorage.setItem('email', responseJson.profile.email);

                Actions.dashboard();

                this.email.setNativeProps({ text: '' })
                this.password.setNativeProps({ text: '' })

                this.setState({
                  email:''
                 });
                this.setState({
                 password:''
                 });
                // AsyncStorage.getItem('userId', (err, result) => {
                //   console.log(result);
                // });
              }
              else
              {
                  Alert.alert(
                    'Verity One',
                    'There is no user record corresponding to this identifier. The user may have been deleted.',
                    [
                      // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
              }
              

              
            })
            .catch((error) => {
              console.error(error);
              this.setState({loading:false});
            });  
        }
    }        
    // .then(function(response) {
    //     // var userData=response.json();

    //   console.log( response.json())
    // })
  }
  emailChange = (text) => {
     this.setState({email:text});
    }
    passwordChange = (text) => {
     this.setState({password:text});
    }

    forgotEmailChange = (text) => {
     this.setState({forgotEmail:text});
    }


  _toggleModal = () =>
  {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }


  _toggleModalOkClick=()=>{
    console.log(this.state.forgotEmail);
    fetch('https://t.certified.bz/index.php?option=com_jewebservices&task=forgotPassword', {  
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.state.forgotEmail
            })
          })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if(responseJson.success == 1)
          {
            
            Alert.alert(
                'Verity One',
                'An email has been sent to your email address for Password Reset.',
                [
                  // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                  // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )

            this.setState({forgotEmail:''});

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
          

          
        })
        .catch((error) => {
          console.error(error);
        });  



    this.setState({ isModalVisible: !this.state.isModalVisible });
  }  

  render(){
    /*<Toast
                    ref="toast"
                    style={{backgroundColor:'#000000'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'#ffffff'}}
                />*/
    return(
      <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
              <Image source = {require('../images/verity.png')} />
            </View>
            <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
          >

                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Email"
                    placeholderTextColor = "#999999"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={()=> this.password.focus()}
                    onChangeText={this.emailChange}
                    ref={(input) => {
                      this.email = input
                    }}
                    />
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor = "#999999"
                    ref={(input) => this.password = input}
                    onChangeText={this.passwordChange}
                    />  

                  <TouchableOpacity onPress={this._toggleModal}><Text style={styles.forgotPassword}> Forgot Password?</Text></TouchableOpacity> 
                  
                 <TouchableOpacity style={styles.button} onPress = {
                        () => this.normalLogin()}>
                   <Text style={styles.buttonText} >Login</Text>
                 </TouchableOpacity>


                 <Text style={{color:'#706f6f',fontWeight:'400',fontSize:16,padding:10}}> OR </Text> 

                 
                 <View style={{ flexDirection:'row' }}>

                      <View style={{ flexDirection:'column',padding:10 }}> 
                         <TouchableOpacity style={[styles.FacebookStyle]} activeOpacity={0.5} onPress = {
                        () => this.googleLogin()}>
               
                           <Image 
                            source={require('../images/google-icon.png')} 
                            style={styles.ImageIconStyle} 
                            />
                   
                         </TouchableOpacity>
                      </View> 
                      <View style={{ flexDirection:'column',padding:10 }}>
                         <TouchableOpacity style={[styles.FacebookStyle]} activeOpacity={0.5}>
               
                           <Image 
                            source={require('../images/facebook.png')} 
                            style={styles.ImageIconStyle} 
                            />
                   
                         </TouchableOpacity>
                      </View>

                      <View style={{ flexDirection:'column',padding:10 }}>
                         <TouchableOpacity style={[styles.FacebookStyle]} activeOpacity={0.5}>
               
                           <Image 
                            source={require('../images/social-twitter-icon.png')} 
                            style={styles.ImageIconStyle} 
                            />
                   
                         </TouchableOpacity>
                      </View>  
                        
                 </View>
                 


                 <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Not Registered? Start Here</Text></TouchableOpacity>
                 
                  <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />
                  </View>


                  <Modal style={{borderRadius:4}} isVisible={this.state.isModalVisible}>
                        <View style={{ backgroundColor:'#ffffff',padding:22 }}>
                          <Text style={{fontWeight:'600',textAlign:'center',fontSize:16,paddingBottom:8}}>Forgot Password</Text>
                          <Text style={{textAlign:'center',fontSize:16,paddingBottom:8}}>Please enter your email address</Text>
                          <TextInput style={[styles.inputBox,{borderRadius:0}]} 
                            underlineColorAndroid='rgba(0,0,0,0)' 
                            placeholder="Enter email address"
                            placeholderTextColor = "#999999"
                            selectionColor="#fff"
                            keyboardType="email-address"
                            onChangeText={this.forgotEmailChange}
                            onSubmitEditing={()=> this.password.focus()}
                            />
                          <TouchableOpacity onPress={this._toggleModal}>
                            <Text style={{textAlign:'left'}}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={this._toggleModalOkClick}>
                            <Text style={{textAlign:'center'}}>Ok</Text>
                          </TouchableOpacity>
                        </View>
                  </Modal> 

                 
            </KeyboardAvoidingView> 
            <View style={styles.signupTextCont}>
              
            </View>

      </View>      

      )
  }
}

const styles = StyleSheet.create({

  mainContainer:{  
   backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent :'center',
    height:height,
    
    
  },
  logoContainer : {
    alignItems: 'center',
    
  },
  container : {
    justifyContent:'center',
    alignItems: 'center'
  },
  FacebookStyle: {
    
    // backgroundColor: '#485a96',
    borderWidth: .5,
    borderColor: '#fff',
    height: 40,
    borderRadius: 5 ,
    margin: 0,
    flexDirection:'column',
    justifyContent: 'flex-start',
    
   
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
        
  ImageIconStyle: {
     padding: 10,
     margin: 5,
     height: 40,
     width: 40,
     borderRadius:5,
     resizeMode : 'stretch',
   
  },
  inputBox: {
    width:300,
    backgroundColor:'#ffffff',
    borderWidth:1,
    flexGrow: 0.1,
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
      paddingVertical: 5,
  },
  fbbutton: {
    width:100,
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 10
  },
  buttonText: {
    fontSize:18,
    fontWeight:'800',
    color:'#ffffff',
    textAlign:'center'
  },
  signupButton: {
    color:'#426bb1',
    fontSize:16,
    fontWeight:'500'
  },
  forgotPassword: {
    color:'#426bb1',
    fontSize:16,
    fontWeight:'500',
    textAlign:'left',
    padding:10
  }

  
});