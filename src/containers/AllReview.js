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
  Platform,
  FlatList, 
} from 'react-native';

import { Rating } from 'react-native-elements'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating';

import { Actions } from 'react-native-router-flux';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var userId="";
export default class AllReview extends Component<{}> {
  
    constructor(props) {
      super(props);
        this.state = {
          reviewDetails:[],
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
      
      
      await fetch('https://t.certified.bz/index.php?option=com_jewebservices&task=reviewListing', {  
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    productId:this.props.itemDetail.productId
                    // productId:"3228",
                  })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    
                    // console.log(responseJson.result);
                    if(responseJson.success == 1)
                    {

                      

                      this.setState({
                                reviewDetails: [...this.state.reviewDetails, ...responseJson.result]
                              })

                      console.log("---------------------------------")
                      console.log(this.state.reviewDetails)
                      
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
  
  renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#CED0CE",
          }}
        />
      );
    }; 
  dateToMDY(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + m +' '+ (d <= 9 ? '0' + d : d) +', ' + y;
  }  
  
  render(){

    return(
      
      <View style={styles.mainContainer}>
      
        <View style={{ flexDirection:'row',width:width,alignSelf:'flex-start',paddingTop:28,paddingLeft:10 }}>

                
          <TouchableOpacity onPress={this.goBack}><Image 
                        source={require('../images/backarraow.png')} 
                        style={styles.ImageIconStyle} 
                        /></TouchableOpacity>
          <View style={{ width:width-50,alignItems:'center'}}>
          <Text style={{ flexDirection:'row',alignSelf:'center',fontSize:20}}>Reviews</Text>
          </View>
        </View> 

          
        <View style={[styles.row,styles.flatcontainer]}>
         <FlatList
          data={this.state.reviewDetails}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => 
            <View style={styles.flatview}>
              <TouchableOpacity activeOpacity={1}>
                
                <View style={styles.innerView}>
                    <View style={{flexDirection:'column',marginRight:3,width:Platform.OS === 'ios' ? 'auto' : '30%'}}>
                      <Image style={styles.reviewImage} resizeMode='cover' source={{uri: item.profileImage}} />
                      
                      
                    </View>
                    <View style={{flexDirection:'column',width:'70%'}}>

                      <View style={{flexDirection:'row'}}>
                        <StarRating
                          disabled={true}
                          maxStars={5}
                          starSize={10}
                          starStyle={{paddingRight:10,paddingTop:3}}  
                          emptyStartColor={"#c0c4c0"}
                          rating={Number(item.reviewValue)}
                          fullStarColor='#e5bf02'
                            
                          />
                        <Text style={styles.usernameText}>{item.userName}</Text>

                      </View>

                      <View style={{flexDirection:'row',flex:1,marginBottom:5}}>
                        <Text style={styles.reviewTitle}>{item.reviewTitle}</Text>
                      </View>
                      <View style={{flexDirection:'row',flex:1,marginBottom:5}}>
                        <Text style={styles.reviewText}>{item.reviewText}</Text>
                      </View>
                    </View>
                </View>
                <View style={styles.innerView}>
                  <Text style={styles.reviewDate}>{this.dateToMDY(new Date(item.reviewDate))}</Text>
                </View>

              </TouchableOpacity>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
          onEndThreshold={0}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          refreshing={false}
          ListFooterComponent={() => <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />}
          ItemSeparatorComponent={this.renderSeparator}
        />  
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
  
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width:width,
    paddingHorizontal:5
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
  flatcontainer:{
    height:height,
    flex:10,
    marginTop:Platform.OS === 'ios' ? '1%' : '5%',
  },
  flatview: {
    justifyContent: 'center',
    // paddingTop: 30,
    borderRadius: 2,
    flexGrow:3,
    backgroundColor:'#fff',
    margin: 5,
    padding: 5,
    borderRadius: 2,
    borderColor: '#9f9f9f',
    borderBottomWidth: 0,
    

  },
  innerView:
  {
    
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    
  },
  
  
  usernameText: {
    fontSize:18,
    // alignSelf: 'flex-start',
  },
  reviewImage: {
    width: 80,
    height: 80,
    margin: 3,
    borderWidth:2,
    borderColor:'#000',
    borderRadius: 80/2
  },
  reviewText: {
    fontSize:18,
    flexWrap: 'wrap',
    width:'85%',
    // alignSelf: 'flex-start',
  },
  reviewTitle:{
    fontWeight:'bold',
    fontSize:18,
    flexWrap: 'wrap',
    marginRight:4,
    width:'85%'
  },
  reviewDate:{
    fontSize:15,
    flexWrap: 'wrap',
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
