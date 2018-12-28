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
  Image ,
  Button,
  FlatList,
  ActivityIndicator,
  Platform,
  Keyboard,
  NativeModules
} from 'react-native';

import { Rating } from 'react-native-elements';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import StarRating from 'react-native-star-rating';

import { Actions } from 'react-native-router-flux';


var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

var userId="";
export default class SearchProduct extends Component<{}> {
  
    constructor(props) {
      super(props);
        this.state = {
          searchKey: '',
          // products:[{"productId":"5041","productName":"PURA !!! COSTA DVD","category":"Music","isFeatured":"0","lat":"37.090240","lng":"-95.712891","companyUniqueId":"NA","sealPercentage":"NA","productSharelink":"https://t.certified.bz/index.php/us/5041-pura-costa-dvd.html","upcCode":"5012345678900","website":"NA","address":",US","productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/4990.jpg","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/4990.jpg","images":[{"productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/4990.jpg","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/4990.jpg"}],"isReview":"0","isRate":"0","avgRating":"0.000000","rateUserCount":"0","totalReviews":"0","productDetails":[{"placeholder":"UPC:","type":"0","value":"5012345678900"},{"placeholder":"Tags","type":"0","value":"Music"}]},{"productId":"35036","productName":"Disguise Toddler Frozen&#39;s Olaf Deluxe Costume, 3T-4T","category":"Label Makers","isFeatured":"0","lat":"37.090240","lng":"-95.712891","companyUniqueId":"NA","sealPercentage":"NA","productSharelink":"https://t.certified.bz/index.php/us/35036-disguise-toddler-frozen-39-s-olaf-deluxe-costume-3t-4t.html","upcCode":"0123456789012","website":"NA","address":",US","productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/5293.jpg","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/5293.jpg","images":[{"productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/5293.jpg","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/5293.jpg"}],"isReview":"0","isRate":"0","avgRating":"0.000000","rateUserCount":"0","totalReviews":"0","productDetails":[{"placeholder":"UPC:","type":"0","value":"0123456789012"},{"placeholder":"Tags","type":"0","value":"Label Makers"}]},{"productId":"35037","productName":"Disguise Toddler Frozen&#39;s Olaf Deluxe Costume, 3T-4T","category":"Label Makers","isFeatured":"0","lat":"37.090240","lng":"-95.712891","companyUniqueId":"NA","sealPercentage":"NA","productSharelink":"https://t.certified.bz/index.php/us/35037-disguise-toddler-frozen-39-s-olaf-deluxe-costume-3t-4t.html","upcCode":"0123456789012","website":"NA","address":",US","thumbImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","productImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","images":[{"productImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","thumbImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png"}],"isReview":"0","isRate":"0","avgRating":"0.000000","rateUserCount":"0","totalReviews":"0","productDetails":[{"placeholder":"UPC:","type":"0","value":"0123456789012"},{"placeholder":"Tags","type":"0","value":"Label Makers"}]},{"productId":"35038","productName":"Assassin's Creed Unity PC Game Download Code","category":"Label Makers","isFeatured":"0","lat":"37.090240","lng":"-95.712891","companyUniqueId":"NA","sealPercentage":"NA","productSharelink":"https://t.certified.bz/index.php/us/35038-assassin-s-creed-unity-pc-game-download-code.html","upcCode":"0123456789012","website":"NA","address":",US","productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/5295.jpg","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/5295.jpg","images":[{"productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/5295.jpg","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/5295.jpg"}],"isReview":"0","isRate":"0","avgRating":"0.000000","rateUserCount":"0","totalReviews":"0","productDetails":[{"placeholder":"UPC:","type":"0","value":"0123456789012"},{"placeholder":"Tags","type":"0","value":"Label Makers"}]},{"productId":"35039","productName":"Assassin's Creed Unity PC Game Download Code","category":"Label Makers","isFeatured":"0","lat":"37.090240","lng":"-95.712891","companyUniqueId":"NA","sealPercentage":"NA","productSharelink":"https://t.certified.bz/index.php/us/35039-assassin-s-creed-unity-pc-game-download-code.html","upcCode":"0123456789012","website":"NA","address":",US","thumbImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","productImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","images":[{"productImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","thumbImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png"}],"isReview":"0","isRate":"0","avgRating":"0.000000","rateUserCount":"0","totalReviews":"0","productDetails":[{"placeholder":"UPC:","type":"0","value":"0123456789012"},{"placeholder":"Tags","type":"0","value":"Label Makers"}]},{"productId":"35044","productName":"OPI Avoplex Nail & Cuticle Replenishing Oil Cuticle Treatment 1 2oz","category":"Label Makers","isFeatured":"0","lat":"37.090240","lng":"-95.712891","companyUniqueId":"NA","sealPercentage":"NA","productSharelink":"https://t.certified.bz/index.php/us/35044-opi-avoplex-nail-cuticle-replenishing-oil-cuticle-treatment-1-2oz.html","upcCode":"0123456789012","website":"NA","address":",US","productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/5297.jpg","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/5297.jpg","images":[{"productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/5297.jpg","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/5297.jpg"}],"isReview":"0","isRate":"0","avgRating":"0.000000","rateUserCount":"0","totalReviews":"0","productDetails":[{"placeholder":"UPC:","type":"0","value":"0123456789012"},{"placeholder":"Tags","type":"0","value":"Label Makers"}]},{"productId":"35045","productName":"OPI Avoplex Nail & Cuticle Replenishing Oil Cuticle Treatment 1 2oz","category":"Label Makers","isFeatured":"0","lat":"37.090240","lng":"-95.712891","companyUniqueId":"NA","sealPercentage":"NA","productSharelink":"https://t.certified.bz/index.php/us/35045-opi-avoplex-nail-cuticle-replenishing-oil-cuticle-treatment-1-2oz.html","upcCode":"0123456789012","website":"NA","address":",US","thumbImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","productImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","images":[{"productImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","thumbImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png"}],"isReview":"0","isRate":"0","avgRating":"0.000000","rateUserCount":"0","totalReviews":"0","productDetails":[{"placeholder":"UPC:","type":"0","value":"0123456789012"},{"placeholder":"Tags","type":"0","value":"Label Makers"}]},{"productId":"35048","productName":"Troy Brannon","category":"Label Makers","isFeatured":"0","lat":"37.090240","lng":"-95.712891","companyUniqueId":"NA","sealPercentage":"NA","productSharelink":"https://t.certified.bz/index.php/us/35048-troy-brannon.html","upcCode":"0123456789012","website":"NA","address":",US","productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/5299.gif","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/5299.gif","images":[{"productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/5299.gif","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/5299.gif"}],"isReview":"0","isRate":"0","avgRating":"0.000000","rateUserCount":"0","totalReviews":"0","productDetails":[{"placeholder":"UPC:","type":"0","value":"0123456789012"},{"placeholder":"Tags","type":"0","value":"Label Makers"}]},{"productId":"35049","productName":"Troy Brannon","category":"Label Makers","isFeatured":"0","lat":"37.090240","lng":"-95.712891","companyUniqueId":"NA","sealPercentage":"NA","productSharelink":"https://t.certified.bz/index.php/us/35049-troy-brannon.html","upcCode":"0123456789012","website":"NA","address":",US","thumbImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","productImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","images":[{"productImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png","thumbImage":"https://t.certified.bz/media/com_mtree/images/noimage_thb.png"}],"isReview":"0","isRate":"0","avgRating":"0.000000","rateUserCount":"0","totalReviews":"0","productDetails":[{"placeholder":"UPC:","type":"0","value":"0123456789012"},{"placeholder":"Tags","type":"0","value":"Label Makers"}]},{"productId":"35050","productName":"HP 1U Rackmount Keyboard with USB Hub - AG072A","category":"Label Makers","isFeatured":"0","lat":"37.090240","lng":"-95.712891","companyUniqueId":"NA","sealPercentage":"NA","productSharelink":"https://t.certified.bz/index.php/us/35050-hp-1u-rackmount-keyboard-with-usb-hub-ag072a.html","upcCode":"0123456789012","website":"NA","address":",US","productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/5301.jpg","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/5301.jpg","images":[{"productImage":"https://t.certified.bz/media/com_mtree/images/listings/m/5301.jpg","thumbImage":"https://t.certified.bz/media/com_mtree/images/listings/s/5301.jpg"}],"isReview":"0","isRate":"0","avgRating":"0.000000","rateUserCount":"0","totalReviews":"0","productDetails":[{"placeholder":"UPC:","type":"0","value":"0123456789012"},{"placeholder":"Tags","type":"0","value":"Label Makers"}]}] 
// ,
          products:[],
          loading:false,
          offset:0,
          isDataAvailable:true,
          starCount: 0,
          emptyMessage:""
          
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
    // onStarRatingPress(rating) {
    //   this.setState({
    //     starCount: rating
    //   });
    // }

    searchKeyChange = (text) => {
     this.setState({searchKey:text});
     this.setState({offset:0});
     this.setState({products:[]});
     this.setState({isDataAvailable:true});
    }

    onSearchbtnClick()
    {     

        let errcnt=0;
        Keyboard.dismiss();
        if(!this.state.loading)
        {
            if(this.state.searchKey == "")
            {
                Alert.alert(
                        'Verity One',
                        'Please enter product name to search.',
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
              this.fetchData();
            }

        }   
   }

    handleLoadMore = () => {
        this.setState({
          offset: this.state.offset + 10
        }, () => {
          this.fetchData();
        });
    };

    async fetchData()
    {
          if(this.state.searchKey != "" && this.state.isDataAvailable)
          {
            this.setState({loading:true});


            await fetch('https://t.certified.bz/index.php?option=com_jewebservices&task=search', {  
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        searchword:this.state.searchKey,
                        userId:userId,
                        offset:this.state.offset,
                        isUpdated:"1"

                      })
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        // alert(responseJson.result[0].productName)
                        // console.log(responseJson.result);
                        this.setState({loading:false});
                        if(responseJson.success == 1)
                        {
                          if(responseJson.result.length <= 0)
                          {
                            this.setState({isDataAvailable:false});
                          }
                          // console.log(responseJson.result);
                          
                             this.setState({
                                products: [...this.state.products, ...responseJson.result]
                              })
                           
                          // console.log(this.state.products);
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
                    this.setState({loading:false});
                  });  
            }
            else
            {
              this.setState({loading:false});
            } 

            if(this.state.products.length == 0)
            {
              this.setState({emptyMessage:" No results found. "});
            }      
            else
            {
              this.setState({emptyMessage:""});
            } 
    }
     onItemClick = async (item, index) => {

      // console.log("index---------"+index)
      let review=[];
      // console.log(item.review);

      if(Array.isArray(item.review))
      {
        if(item.totalReviews != "0")
        {
          review=item.review;
        }
      }
      else
      {
        if(item.totalReviews != "0")
        {
          review.push(item.review);
        }
      }
      
      let itemData={
        "totalReviews":item.totalReviews,
        "review":review,
        "avgRating": item.avgRating,
        "isRate": item.isRate,
        "isReview": item.isReview,
        "rateUserCount":item.rateUserCount,
        "productIndex":index

      }
      await AsyncStorage.setItem('itemDetail',JSON.stringify(itemData), () => {});

      var refreshproductClick = this.refreshStateProduct.bind(this);
      var updateRatingClick = this.updateRating.bind(this);

      Actions.ProductDetail({'itemDetail':item,'refreshproductClick':refreshproductClick,'updateRatingClick':updateRatingClick});
    }
    updateRating= (item,itemObj) => {
        let products = this.state.products;

          // console.log(itemObj);
          let targetProduct = products[itemObj.productIndex];
          // console.log(targetProduct);
          // Flip the 'liked' property of the targetPost
          targetProduct.rateUserCount = itemObj.rateUserCount;
          targetProduct.avgRating = itemObj.avgRating;
          targetProduct.isRate = "1";

          products[itemObj.productIndex]=targetProduct;
          // console.log(targetProduct);
          this.setState({ products });

          // console.log("**************");
    }
    refreshStateProduct = (item,index) => {
       AsyncStorage.getItem('itemDetail', (errs, result) => {

        result=JSON.parse(result);
        // console.log("**********")
        //   console.log(result);
        

          let products = this.state.products;

          // console.log(products);
          let targetProduct = products[index];
          // console.log(targetProduct);
          // Flip the 'liked' property of the targetPost
          targetProduct.totalReviews = result.totalReviews;
          targetProduct.avgRating = result.avgRating;
          targetProduct.isRate = result.isRate;
          targetProduct.isReview = result.isReview;
          targetProduct.rateUserCount = result.rateUserCount;
          targetProduct.review = result.review;


          // console.log("--------------");
          products[index]=targetProduct;
          // console.log(targetProduct);
          this.setState({ products });

          // console.log("**************");
      }); 
   }

   renderItem(data) {

    let { item, index } = data;
    return (
      <View style={styles.flatview}>
              <TouchableOpacity activeOpacity={1} onPress = {() => this.onItemClick(item, index)}>
                <View style={styles.upcCodeView}>
                  <Text style={styles.codeLabel}>UPC : </Text>
                  <Text style={styles.codeValue}>{item.upcCode}</Text>
                  <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={10}
                  starStyle={{paddingRight:2,paddingTop:5,paddingLeft:5}}  
                  emptyStartColor={"#d1d3d1"}
                  rating={Number(item.avgRating)}
                  fullStarColor='#e5bf02'
                    
                  />
                </View>
                <View style={styles.innerView}>
                    <View style={{flexDirection:'column',width:Platform.OS === 'ios' ? 'auto' : '25%'}}>
                      <Image style={styles.image} resizeMode='cover' source={{uri: item.thumbImage}} />
                    </View>
                    <View style={{flexDirection:'column',width:Platform.OS === 'ios' ? 'auto' : '75%'}}>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.productName}>{item.productName.substr(0,60)}{item.productName.length > 60 ? <Text>...</Text>: null }</Text>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.categoryLabel}>Category : </Text>
                        <Text style={styles.categoryValue}>{item.category}</Text>
                      </View>
                    </View>
                </View>
              </TouchableOpacity>
            </View>
    ) 
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
        <View style={styles.row}>
            <View style={[styles.box, styles.box2]}>
                  <TextInput style={styles.inputBox} 
                    placeholder="Search Here"
                    placeholderTextColor = "#878787"
                    value={this.state.searchKey}
                    selectionColor="#fff"
                    autoFocus = {true}
                    underlineColorAndroid="transparent"
                    ref={(input) => {
                      this.searchKey = input
                    }}
                    clearButtonMode= "while-editing"
                    onChangeText = {this.searchKeyChange}/>
            </View>
            <View style={[styles.box, styles.box2]}>
              <TouchableOpacity activeOpacity={1} style={[styles.button]} onPress = {
                        () => this.onSearchbtnClick()} >
              
                   
                    
                      <Text style={styles.buttonText}>Search</Text>
              
              </TouchableOpacity>
            </View>
        </View> 
        
        <View style={[styles.row,styles.flatcontainer]}>
         <FlatList
          data={this.state.products}
          extraData={this.state.products}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => item.productId}
          onEndReached={this.handleLoadMore}
          onEndThreshold={0}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          refreshing={false}
          ListFooterComponent={() => <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />}
          ListEmptyComponent={<View style={styles.MainContainer}>
 
              <Text style={{textAlign: 'center'}}>{this.state.emptyMessage}</Text>
       
            </View>}
        />  
        </View>

        
            
            
        
      </View> 
      )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    margin: 3,
    borderRadius: 2,
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
    backgroundColor:'#d3ecff',
    margin: 5,
    padding: 5,
    borderRadius: 2,
    borderColor: '#9f9f9f',
    borderBottomWidth: 0,
    

  },
  
  upcCodeView:
  {
    borderBottomWidth: 1,
    borderColor:'#a0a0a0',
    flexDirection: "row",
    
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    
  },
  innerView:
  {
    
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-between',
    
  },
  
  codeLabel: {
    color:'#08914d',
    fontWeight:'bold',
    fontSize:18
  },
  codeValue: {
    fontSize:18,
    color:'#2278bf'
    // alignSelf: 'flex-start',
  },
  categoryLabel: {
    color:'#878787',
    fontSize:18
  },
  categoryValue: {
    fontSize: 14,
    fontSize:18,
    color:'#08914d',
    flexWrap: 'wrap',
    width:'60%'
    // alignSelf: 'flex-start',
  },
  productName:{
    color:'#257fca',
    fontWeight:'bold',
    fontSize:18,
    flexWrap: 'wrap',
    marginRight:4,
    width:'93%'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    width:width,
    paddingHorizontal:10
  },
  logo: {
    backgroundColor: '#ffffff',
    alignItems:'center',
    justifyContent:'center'
  },
  box: {
    
    marginLeft: 0,
    marginRight: 5,
    marginTop: 10,
  },
  box2:
  {
    height:150
  },
  imageBox: {
    flex: 1,
    height: 100,
    backgroundColor: '#333'
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
    justifyContent :'center'
  },
  container : {
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#ffffff',

  },
  inputBox: {
    flexGrow: 0.1,
    width:250,
    backgroundColor:'#ffffff',
    borderWidth:0.6,
    borderRadius:5,
    fontSize:16,
    color:'#000000',
    alignSelf:'flex-start',
    paddingHorizontal:10,
  },
  button: {
    width:100,
    height:33,
    borderRadius: 5,
    borderWidth:0.6,
    // marginVertical: 2,
    // paddingVertical: 2,
    // top:0
  },
  buttonText: {
    fontSize:18,
    textAlign:'center',
    marginVertical: 2,
    paddingVertical: 2,
  },
  
});
