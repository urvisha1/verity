import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  BackHandler 
} from 'react-native';

import {Actions} from 'react-native-router-flux';


import Login from './containers/Login';
import Signup from './containers/Signup';
import Dashboard from './containers/Dashboard';
import VerityToken from './containers/VerityToken';
import SearchProduct from './containers/SearchProduct';
import ProductDetail from './containers/ProductDetail';
import AboutUs from './containers/AboutUs';
import WebViewScreen from './containers/WebViewScreen';
import AddReview from './containers/AddReview';
import AddReport from './containers/AddReport';
import AddClaim from './containers/AddClaim';
import AllReview from './containers/AllReview';
import BarcodeScannerScreen from './containers/BarcodeScannerScreen';

export default class Routes extends Component<{}> {

	constructor(props) {
	    super(props);
	    this.state ={ isLoggedIn: false };
	    
	  }

	  componentWillMount() {

	  	// var userId=""
	   //  AsyncStorage.getItem('userId',
	   //  (err,value) => {
	   //  	if(value != "" && value != null)
	   //  	{
	   //  		userId=value;
	   //  		Actions.dashboard();
	   //  	}
	   //  	// else
	   //  	// {
	   //  	// 	Actions.login()
	   //  	// }
	      
	   //  });
	   
	  }
	  
	  // initial={true}
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login"/>
			      <Scene key="dashboard" component={Dashboard} title="Dashboard" />
			      <Scene key="signup" component={Signup} title="Register" />
			      
			      <Scene key="VerityToken" component={VerityToken} title="VerityToken" />
			      <Scene key="AboutUs" component={AboutUs} title="AboutUs"/>
			      <Scene key="WebViewScreen" component={WebViewScreen} title="WebViewScreen"/>

			      <Scene key="SearchProduct" component={SearchProduct} title="SearchProduct" />
			      <Scene key="ProductDetail" component={ProductDetail} title="ProductDetail"  />
			      <Scene key="AddReview" component={AddReview} title="AddReview"  />
			      <Scene key="AddReport" component={AddReport} title="AddReport"  />
			      <Scene key="AddClaim" component={AddClaim} title="AddClaim"  />
			      <Scene key="AllReview" component={AllReview} title="AllReview" />

			      <Scene key="BarcodeScannerScreen" component={BarcodeScannerScreen} title="BarcodeScannerScreen" />
			      
			    </Stack>
			 </Router>
			)
	}
}