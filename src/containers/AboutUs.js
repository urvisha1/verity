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
  FlatList,
  ActivityIndicator 
} from 'react-native';

import { Constants } from 'expo';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Actions } from 'react-native-router-flux';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
var userId="";
export default class AboutUS extends Component<{}> {
  
    constructor(props) {
      super(props);
        this.state = {
          list:'',
          
          

        }
    }

    async componentWillMount() {
      
     this.setState({loading:true}); 
     await AsyncStorage.getItem('aboutUsScreen',
      (err,value) => {
        if(value != "")
        {
          this.setState({'list':JSON.parse(value)});
          console.log("-------------");
          console.log(this.state.list);
          console.log(this.state.list.screenName);
          console.log(this.state.list.items);
        }
        
      }); 
    } 

    goBack() {
      Actions.pop();
    }
  openWebView = (pageName,pageLink) =>
  {
    if(pageLink != "" && pageLink != "Location Summary" && pageLink != null)
    {
      Actions.WebViewScreen({'pageName':pageName,'pageLink':pageLink});
    }
    
  }
  
  render(){

    return(
      
      <View style={styles.mainContainer}>
      
        <View style={{ flexDirection:'row',alignSelf:'flex-start',paddingTop:25,paddingLeft:10 }}>

                
        <TouchableOpacity onPress={this.goBack}><Image 
                      source={{uri:'https://t.certified.bz/components/com_applicationsetting/assets/images/backimage/1516711035_backimage.png'}} 
                      style={styles.ImageIconStyle} 
                      /></TouchableOpacity>

        </View> 
        <View
            style={styles.container}>
                <Text style={styles.labelText}>{this.state.list.screenName}</Text>
        </View>
            <View style={[styles.row,styles.flatcontainer]}>
               <FlatList
                data={this.state.list.items}
                extraData={this.state}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => 
                  <View style={styles.flatview}>
                    <TouchableOpacity activeOpacity={1} onPress = {() => this.openWebView(item.itemName,item.redirectUrl)}>
                      <View style={styles.upcCodeView}>
                        <Text style={styles.codeLabel}>{item.itemName}</Text>
                      </View>
                      
                    </TouchableOpacity>
                  </View>
                }
                keyExtractor={item => item.itemId}
                onEndThreshold={0}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always"
                refreshing={false}
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
  flatcontainer:{
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
    color:'#045781',
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
    justifyContent :'center',
     // paddingTop: Constants.statusBarHeight,
  },
  labelText : {
    marginVertical: 15,
    fontWeight:'bold',
    fontSize:20,
    color:'#426bb1'
  },
});
