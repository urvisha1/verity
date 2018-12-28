import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  Button,
  View,
  StatusBar ,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  AsyncStorage,
  Image,
  Dimensions,
  Keyboard,
  Platform,
  BackHandler
} from 'react-native';
import Modal from "react-native-modal";

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {BackPress} from './Functions';

var windowDimensions = Dimensions.get('window');

export default class Dashboard extends Component<{}> {

  

  constructor(props) {
    super(props);
        this.state = {
          isModalVisible: false,
        }  
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);  
  }
  
  goBack() {
      Actions.pop();
  }

  componentWillMount() {

      Keyboard.dismiss()
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      AsyncStorage.getItem('userId',
      (err,value) => {
        if(value != "")
        {
          var userId=value;
          
          console.log("Dashboard USer ID:" +userId);

          fetch('https://t.certified.bz/index.php?option=com_jewebservices&task=getConfigurations', {  
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        imageType:"1",
                        userId:userId

                      })
                    })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    

                    
                    if(responseJson.success == 1)
                    {

                      // GoogleSignin.signOut()
                      // .then(() => {
                      //   console.log('out');
                      // })
                      // .catch((err) => {

                      // });
                      // console.log(responseJson);
                      

                      // AsyncStorage.getItem('userId', (err, result) => {
                      //   console.log(result);
                      // });

                      for (let details of responseJson.result.screen) {
                          if(details.screenName == "About Us")
                          {
                            
                            AsyncStorage.setItem('aboutUsScreen', JSON.stringify(details));
                            
                          }
                          else if(details.screenName == "Settings")
                          {
                            AsyncStorage.setItem('settingScreen',JSON.stringify(details));
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
                    

                    
                  })
                  .catch((error) => {
                    
                    console.error(error);
                  }); 
        }
        
      });

         
  }
  handleBackButtonClick() {
    
      // console.log(this.props.title);
      // Alert.alert(
      // 'Exit App',
      // 'Do you want to exit?',
      // [
      //   {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      //   {text: 'Yes', onPress: () => BackHandler.exitApp()},
      // ],
      // { cancelable: false })
      // BackHandler.exitApp();
      BackPress(this.props.title);
      return true;
  } 
  _toggleModal = () =>
  {
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    
  }
  onBarcodeScanClick =() =>
  {
      // Actions.BarcodeScannerScreen();
  }
  onOCRScanClick =() =>
  {
    // Actions.BarcodeScreen();
  }
  onVerityTokenClick()
  {
    Actions.VerityToken();
  }
  async onLogoutClick()
  {
    // Alert.alert(
    //   '',
    //   'Are you sure you want to logout?',
    //   [
    //     {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //     {text: 'Yes', onPress: () => {
            await AsyncStorage.clear();
            
            // setTimeout(function(){ 
                Actions.login(); 
      //       },2000);
      //   }},
      // ],
      // { cancelable: false })
    

  }
  onAbountUsClick = () =>
  {
    
    Actions.AboutUs()
  }
  onSearchClick()
  {
    Actions.SearchProduct();
  }
	render() {
    
    

		return(
        

        <View style={styles.container}>

          <View style={styles.row,styles.imageBox, styles.setting}>
             <Icon name="cog" size={30} color="orange" />
          </View>  
          <View style={styles.row,styles.imageBox, styles.logo}>
            <Image style={styles.logoImage} source = {{uri: 'https://t.certified.bz/components/com_applicationsetting/assets/images/backimage/1516711036_homeLogo@2x.png'}} />
          </View>
           
          
 
          <View style={styles.row}>
            <TouchableOpacity style={[styles.row,styles.box_new]} activeOpacity={1} onPress={() => this._toggleModal()}>
              <Image style={styles.image}  source={{uri: "https://t.certified.bz/components/com_applicationsetting/assets/images/menuicon/1517982732_1517028866_72_scan@2x.png"}} />
                  
                <View style={[styles.textView]}>
                  <Text style={[styles.btnText]}>Scan</Text>
                </View>
            </TouchableOpacity>  
            <TouchableOpacity style={[styles.row,styles.box_new]} activeOpacity={1} onPress={this.onSearchClick}>
              <Image style={styles.image}  source={{uri: "https://t.certified.bz/components/com_applicationsetting/assets/images/menuicon/1517904020_1516714973_search@2x.png"}} />
              <View style={[styles.textView]}>
                  <Text style={[styles.btnText]}>Search</Text>
              </View>    
              
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.row,styles.box_new]} activeOpacity={1} onPress = {
                        () => this.onAbountUsClick()}>
              <Image style={styles.image}  source={{uri: "https://t.certified.bz/components/com_applicationsetting/assets/images/menuicon/1517904020_1516714973_about-us@2x.png"}} />
                  
              <View style={[styles.textView]}>
                  <Text style={[styles.btnText]}>About Us</Text>
              </View>
            </TouchableOpacity> 
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.row,styles.box_new]} activeOpacity={1}>
              <Image style={styles.image}  source={{uri: "https://t.certified.bz/components/com_applicationsetting/assets/images/menuicon/1517904020_1516714973_chat@2x.png"}} />
              
              <View style={[styles.textView]}>
                  <Text style={[styles.btnText]}>Chat</Text>
              </View>    
              
            </TouchableOpacity>  
            <TouchableOpacity style={[styles.row,styles.box_new]} activeOpacity={1} >
              <Image style={styles.image}  source={{uri: "https://t.certified.bz/components/com_applicationsetting/assets/images/menuicon/1517904020_1517219377_RSS_FEEDS2X.png"}} />
              
              <View style={[styles.textView]}>
                  <Text style={[styles.btnText]}>Recall</Text>
              </View>    
              
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.row,styles.box_new]} activeOpacity={1} >
              <Image style={styles.image}  source={{uri: "https://t.certified.bz/components/com_applicationsetting/assets/images/menuicon/1517904020_1516864506_invite@2x.png"}} />
              
              <View style={[styles.textView]}>
                  <Text style={[styles.btnText]}>Invite</Text>
              </View>    
              
            </TouchableOpacity> 
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.row,styles.box_new]} activeOpacity={1} onPress={this.onVerityTokenClick}>
              <Image style={styles.image}  source={{uri: "https://t.certified.bz/components/com_applicationsetting/assets/images/menuicon/1519625621_Verity-form-icon2x.png"}} />
              
              <View style={[styles.textView]}>
                  <Text style={[styles.btnText]}>VERITY Token</Text>
              </View>    
              
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row,styles.box_new]} activeOpacity={1} onPress={this.onLogoutClick}>
              <Image style={styles.image}  source={{uri: "https://t.certified.bz/components/com_applicationsetting/assets/images/menuicon/1519625621_Verity-form-icon2x.png"}} />
              
              <View style={[styles.textView]}>
                  <Text style={[styles.btnText]}>Logout</Text>
              </View> 
            </TouchableOpacity>
            
            <View style={[styles.row,styles.box_new]}></View>
          </View>
 
          
          <View style={styles.row}>
            
          </View>
          <View style={styles.row}>
            
          </View>
          <TouchableWithoutFeedback  onPress={() => this.setState({ isModalVisible: false })}>
          <Modal isVisible={this.state.isModalVisible} onRequestClose = {() => { console.log("Modal has been closed.") } }>
               
                        <View style={{ backgroundColor:'#ffffff',borderRadius:4,opacity: 0.7}}>
                          <View style={{padding:5}}>
                            <TouchableOpacity activeOpacity={1} onPress={this.onBarcodeScanClick}>
                              <Text style={{textAlign:'center',fontSize:16}}>Barcode Scan</Text>
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              height: 1,
                              width: "100%",
                              backgroundColor: "#000",
                            }}
                          />
                          <View style={{padding:5}}>
                            <TouchableOpacity activeOpacity={1} onPress={this.onOCRScanClick}>
                              <Text style={{textAlign:'center',fontSize:16}}>OCR Scan</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                  </Modal>
         </TouchableWithoutFeedback> 
      </View>	   
			)
	}
}

const styles = StyleSheet.create({
  
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 10 : 15,
    height: Platform.OS === 'ios' ? '100%' : 300,
  },
  innerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
  },
  logo: {
    backgroundColor: '#045781',
    alignItems:'center',
    justifyContent:'center',
    height:'15%',
    marginTop:0
  },
  logoImage: {
    width: '70%',
    height: '70%',
    borderRadius:5
  },
  setting: {
    backgroundColor: '#ffffff',
    alignItems:'flex-end',
    justifyContent:'flex-end',
  },
  imageBox: {
    
    height: 100,
    backgroundColor: '#333'
  },
  box_new: {
    flex: 1,
    // height: '100%',
    height: Platform.OS === 'ios' ? '100%' : 100,
    width:'100%',
    marginLeft: 5,
    marginRight: 7,
    marginBottom: 7,
  }, 
  box2_new:{
    backgroundColor:'#9a0ef7',
  },
  textView:{
    top: Platform.OS === 'ios' ? '80%' : '73%',
    height:Platform.OS === 'ios' ? '20%': '27%',width:'100%',alignItems:'center',position: 'absolute',backgroundColor:'rgba(0, 0, 0, 0.1)'
  },
  btnText:{
    color:'#fff',fontSize:Platform.OS === 'ios' ? 17 :16,paddingTop:'1%'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    top:20,
    backgroundColor:'#045781',
    paddingHorizontal:'1%'
  },
 
  image: {
    flex:1,
    // height: Platform.OS === 'ios' ? '300' : 1,
    // width: Platform.OS === 'ios' ? '100' : 1,
    // height:400,
    // width:null,
    resizeMode:'stretch',

  },
});



