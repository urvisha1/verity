import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity
} from 'react-native';

import Logo from '../components/Logo';
import Form from '../components/Form';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


class Confirmation extends Component<{}> {

  goBack() {
      Actions.pop();
  }

	render() {
    
		return(
			<View style={styles.container}>
				<Logo/>
        
        <View >
          <Text style={{color:'#ffffff'}}>First Name: {this.props.user[0].fname}</Text>
          <Text style={{color:'#ffffff'}}>Last Name: {this.props.user[0].lname}</Text>
          <Text style={{color:'#ffffff'}}>Email: {this.props.user[0].email}</Text>
        </View>
				
        <View style={styles.signupTextCont}>
					<TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> Go Back</Text></TouchableOpacity>
				</View>

        <View>
          <Text style={styles.signupButton}>© Hotel Analytics 2018</Text>
        </View>
			</View>	
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#000000',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
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

function mapStateToProps (state) {
  return {
    user: state.user.user
  }
}


export default connect(
  mapStateToProps,
)(Confirmation)
