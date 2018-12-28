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
  Picker,
  Platform, 
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";

import { Actions } from 'react-native-router-flux';

import RNPickerSelect from './pickerContainer';
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var userId="";
var productIndex="";
export default class AddReview extends Component<{}> {
  
    constructor(props) {
      super(props);
        this.state = {
          reviewTitle: '',
          reviewDesc:'',
          rating:'1',
          reportLoading:false,
          

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

     await AsyncStorage.getItem('itemDetail', (errs, result) => {
        result=JSON.parse(result);
        productIndex=result.productIndex;
      });
      
      
  }
  
   
    reviewTitleChange = (text) => {
     this.setState({
      reviewTitle:text
     });
    }
    reviewDescChange = (text) => {
     this.setState({
      reviewDesc:text
     });
    }
    ratingChange = (text) => {
     this.setState({
      rating:text
     });
    }

    onSubmitReview = async () => {
    
    let errcnt=0;
    
    
    if(!this.state.reportLoading)
    {
        
                  
        if(this.state.reviewTitle == "")
        {
            Alert.alert(
                    'Verity One',
                    'Please enter title.',
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

        if(this.state.reviewDesc == "")
        {
            Alert.alert(
                    'Verity One',
                    'Please enter description.',
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
        if(this.state.rating == "")
        {
            Alert.alert(
                    'Verity One',
                    'Please select rating.',
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

            this.setState({reportLoading:true});
          // Actions.confirmation(); 
            await  fetch('https://t.certified.bz/index.php?option=com_jewebservices&task=giveReview', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    
                    userId:userId,
                    reviewTitle:this.state.reviewTitle,
                    reviewText:this.state.reviewDesc,
                    productId:this.props.itemDetail.productId,
                    reviewValue:this.state.rating


                  })
                 
                })
                .then((response) => response.json())
                .then((responseJson) => {
                 
                // Showing response message coming from server after inserting records.
                  console.log(responseJson);
                  this.setState({reportLoading:false});
                  
                  if(responseJson.success == 1)
                  {
                    
                     

                    let review=[];

                    if(responseJson.result.totalReviews != "0")
                    {
                      review.push(responseJson.result.review);
                    }
                    let itemData={
                      "totalReviews":responseJson.result.totalReviews,
                      "review":review,
                      "avgRating": responseJson.result.avgRating,
                      "isRate": responseJson.result.isRate,
                      "isReview": responseJson.result.isReview,
                      "rateUserCount":responseJson.result.rateUserCount,
                      "productIndex":productIndex
                    }
                    console.log(itemData);
                    AsyncStorage.setItem('itemDetail',JSON.stringify(itemData), () => {});


                    
                    this.props.handleClick();
                    // this.props.itemDetail.totalReviews=responseJson.result.totalReviews;
                    // this.props.itemDetail.rateUserCount=responseJson.result.rateUserCount;
                    // this.props.itemDetail.isReview=responseJson.result.isReview;
                    // this.props.itemDetail.isRate=responseJson.result.isRate;


                    // console.log("||||||||||||||||||||||||||||||||||||||||");
                    // console.log(this.props.itemDetail)
                    Alert.alert(
                      'Verity One',
                      responseJson.message,
                      [
                        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

                        {text: 'OK', onPress: () => Actions.pop()},
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
                  this.setState({reportLoading:false});
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
        <View style={styles.row,styles.imageBox, styles.logo}>
                <Image style={{width:152,height:65}} source = {{uri: 'https://t.certified.bz/components/com_applicationsetting/assets/images/backimage/1516711036_homeLogo@2x.png'}} />
        </View> 
            <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            >
                <TextInput style={[styles.inputBox]} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Review Title"
                    placeholderTextColor = "#999999"
                    selectionColor="#fff"
                    ref={(input) => {
                      this.reviewTitle = input
                    }}
                    onChangeText = {this.reviewTitleChange}/>
               


                <TextInput style={[styles.inputBox,styles.textArea]} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Description"
                    placeholderTextColor = "#999999"
                    selectionColor="#fff"
                    ref={(input) => {
                      this.reviewDesc = input
                    }}
                    multiline={true}
                    numberOfLines={14}
                    onChangeText={this.reviewDescChange}
                    /> 
                        
                
                <Picker
                  style={[(Platform.os=== 'ios') ? styles.pickerBoxIOS:styles.pickerBox]}
                  ref={(input) => {
                      this.rating = input
                    }}
                  selectedValue={this.state.rating}
                  onValueChange={(itemValue,itemIndex) => this.setState({rating:itemValue})}
                  >
                  <Picker.Item label="Select your rating" value=""/>
                  <Picker.Item label="Very Poor" value="1" />
                  <Picker.Item label="Fair" value="2"/>
                  <Picker.Item label="Average" value="3" />
                  <Picker.Item label="Good" value="4"/>
                  <Picker.Item label="Excellent!" value="5"/>

                  </Picker>
                  
                 <TouchableOpacity style={styles.button} onPress = {
                        () => this.onSubmitReview()} >
                   <Text style={styles.buttonText}>Submit Review</Text>
                 </TouchableOpacity>   
                  <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.reportLoading} />
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
  textAreaContainer: {
    borderColor: 'blue',
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 130,
    justifyContent: "flex-start",
    textAlignVertical: "top"
  },
  imageBox: {
    flex: 1,
    height: 100,
    backgroundColor: '#333'
  },
  logo: {
    backgroundColor: '#ffffff',
    alignItems:'center',
    justifyContent:'center'
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
    justifyContent :'center',
    paddingHorizontal:2
  },
  container : {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',
    width:width,
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
    height:30,
    backgroundColor:'#ffffff',
    borderWidth:1,
    borderRadius:5,
    borderColor:'#CED0CE',
    fontSize:16,
    color:'#000000',
    marginVertical: 5,
    paddingHorizontal:16,
  },
  pickerBox: {
    flexGrow: 0.1,
    width:width-20,
    height:30,
    backgroundColor:'#ffffff',
    borderWidth:1,
    borderRadius:5,
    
  },
  pickerBoxIOS: {
    flexGrow: 0.1,
    width:width-20,
    marginTop:0
  },
  button: {
    width:150,
      backgroundColor:'#426bb1',
      borderRadius: 5,
      marginVertical: 5,
      paddingVertical: 5
  },
  buttonText: {
    fontSize:18,
    fontWeight:'300',
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
