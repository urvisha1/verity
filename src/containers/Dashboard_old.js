import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  StatusBar ,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
  Image,
  Dimensions,
  Keyboard
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


var windowDimensions = Dimensions.get('window');

export default class Dashboard extends Component<{}> {

  goBack() {
      Actions.pop();
  }

  componentDidMount() {

      Keyboard.dismiss()
      
      AsyncStorage.getItem('userId',
      (err,value) => {
        if(value != "")
        {
          var userId=value;
          console.log("USer ID:" +userId);
        }
        
      });
  }

  constructor (props) {
    super(props)
    this.state = {dimensions: undefined}
  }

  // onLayout = event => {
  //   if (this.state.dimensions) return // layout was already called
  //   let {width, height} = event.nativeEvent.layout
  //   this.setState({dimensions: {width, height}})
  // }
  onVerityTokenClick()
  {
    Actions.VerityToken();
  }
  onLogoutClick()
  {
    AsyncStorage.clear();
    Actions.login();

  }
  onSearchClick()
  {
    Actions.SearchProduct();
  }
	render() {
    
    // if (this.state.dimensions) {

    //   var { dimensions } = this.state
    //   var { width, height } = dimensions
      
    // }

		return(
        /*<View style={styles.container}>
            <View style={{width:windowDimensions.width,height:20,top:30,backgroundColor:'#ffffff',}}>
              <Text style={{color:'#000000',textAlign:'right'}}>setting</Text>
            </View>
            <View style={{flex:1,width:windowDimensions.width,height:'5%',top:50,backgroundColor:'#ffffff'}}>
            				<Image style={{
                      top: 30,
                      width: 370,
                      marginLeft:20,
                      height: 90,borderRadius:5}} source = {require('../images/verity.png')} />
            </View >
            <View style={{flexDirection:'row',flex:1,borderWidth:1}}>
                <View style={{flex:1,borderWidth:1}}>
                    <Image style={{
                      
                      borderRadius:5,borderWidth:1}} source = {require('../images/verity.png')} />
                </View>
                <View style={{flex:1,borderWidth:1}}>
                    <Image style={{
                      borderRadius:5,borderWidth:1}} source = {require('../images/verity.png')} />
                </View>
                <View style={{flex:1,borderWidth:1}}>
                    <Image style={{
                      borderRadius:5,borderWidth:1}} source = {require('../images/verity.png')} />
                </View>
            </View >
            
            
            <View style={{flex:2,backgroundColor:'#074d76'}}>
            </View>
                
			  </View>*/

        <View style={styles.container}>

          <View style={styles.row,styles.imageBox, styles.setting}>
             <Icon name="cog" size={30} color="orange" />
          </View>  
          <View style={styles.row,styles.imageBox, styles.logo}>
            <Image  source = {require('../images/verity.png')} />
          </View>
           
          
 
          <View style={styles.row}>
            <TouchableOpacity style={styles.row} activeOpacity={1}>
              <View style={[styles.box, styles.box2]}>
                  <Icon name="barcode" size={70} color="green" />
                  <Text style={{color: 'green'}}>Scan</Text>
              </View>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.row} activeOpacity={1} onPress={this.onSearchClick}>  
              <View style={[styles.box,styles.box2]}>
                  <Icon name="search" size={70} color="pink" />
                  <Text style={{color: 'pink'}}>Search</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} activeOpacity={1}>
              <View style={[styles.box, styles.box2]}>
                  <Icon name="info-circle" size={70} color="orange" />
                  <Text style={{color: 'orange'}}>About Us</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.row} activeOpacity={1}>
              <View style={[styles.box, styles.box2]}>
                <Icon name="comments" size={70} color="#ff7c4c" />
                  <Text style={{color: '#ff7c4c'}}>Chat</Text>
              </View>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.row} activeOpacity={1}>  
              <View style={[styles.box,styles.box2]}>
                  <Icon name="book" size={70} color="#00d4ff" />
                  <Text style={{color: '#00d4ff'}}>Recall</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} activeOpacity={1}>
              <View style={[styles.box, styles.box2]}>
                  <Icon name="users" size={65} color="#a500ff" />
                  <Text style={{color: '#a500ff'}}>Invite</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.row} activeOpacity={1} onPress={this.onVerityTokenClick}>
                <View style={[styles.box, styles.box2]} >
                    <Icon name="file" size={65} color="#8a02e5" />
                    <Text style={{color: '#8a02e5'}}>VERITY Token</Text>
                </View>
            </TouchableOpacity>
            <View style={[styles.row]}>
              <TouchableOpacity style={styles.row} activeOpacity={1} onPress={this.onLogoutClick}>
                <View style={[styles.box, styles.box2]} >
                    <Icon name="sign-out" size={65} color="#ff6666" />
                    <Text style={{color: '#ff6666'}}>Logout</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View style={[styles.box2]}></View>
          </View>
 
          
          <View style={styles.row}>
            
          </View>
          <View style={styles.row}>
            
          </View>
          
      </View>	   
			)
	}
}

const styles = StyleSheet.create({
  img:{
     position: 'absolute',
    backgroundColor: 'green',
    
    
  },
   topRow: {
    flex: 1,
    flexDirection: 'row',
    height:50
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  logo: {
    backgroundColor: '#ffffff',
    alignItems:'center',
    justifyContent:'center'
  },
  setting: {
    backgroundColor: '#ffffff',
    alignItems:'flex-end',
    justifyContent:'flex-end'
  },
  imageBox: {
    flex: 1,
    height: 100,
    backgroundColor: '#333'
  },  
  box: {
    flex: 1,
    height: 100,
    backgroundColor: '#333',
     borderWidth: 1,
    borderRadius: 2,
    borderColor: '#9f9f9f',
    borderBottomWidth: 0,
    shadowColor: '#666',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  box2: {
    backgroundColor: '#ffffff',
    alignItems:'center',
    justifyContent:'center'
  },
  two: {
    flex: 2
  },
   container: {
    flex: 1,
    flexDirection: 'column',
    top:20,
    backgroundColor:'#ffffff'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  }
});



