import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    FlatList,
    I18nManager,
    ScrollView,
    Animated
} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title, Right, Textarea} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";
import {getOrderDetails , getCancelOrder , getDeleteOrder , getAcceptOrder} from '../actions'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



class DelegateOrderDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: null,
            isModalVisible: false,
            loader: false,
            reason: '',
            isSubmitted: false,

        }
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item , key) => {
        return(
            <TouchableOpacity
                style       = {[styles.position_R , styles.flex_45, {marginTop:25}, styles.height_200, styles.marginHorizontal_10]}
                key         = { key }
                // onPress     = {() => this.props.navigation.navigate('product', { id : item.id })}
            >
                <View style={[styles.lightOverlay, styles.Border]}></View>
                <View style={[styles.bg_White, styles.Border]}>
                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                        <View style={[styles.flex_100, styles.position_R]}>
                            <Image
                                style           = {[styles.Width_100 , styles.height_100, styles.flexCenter]}
                                source          = {item.thumbnail }
                                resizeMode      = {'cover'}
                            />


                        </View>
                    </View>
                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5]}>
                        <Text
                            style           = {[styles.text_gray, styles.textSize_14, styles.textRegular, styles.Width_100, styles.textLeft]}
                            numberOfLines   = { 1 } prop with
                            ellipsizeMode   = "head"
                        >
                            {item.name}
                        </Text>
                        <Text style={[styles.text_light_gray, styles.textSize_13, styles.textRegular, styles.Width_100, styles.textLeft]}>
                            {item.category} - {item.sub_category}
                        </Text>
                        <View style={[styles.rowGroup]}>
                            <Text style={[styles.text_red, styles.textSize_13, styles.textRegular,styles.textLeft, styles.borderText, styles.paddingHorizontal_5]}>
                                {item.price} {i18n.t('RS')}
                            </Text>
                            <Text style={[styles.text_red, styles.textSize_13, styles.textRegular,styles.textLeft,{borderWidth:1 , borderColor:COLORS.orange , textAlign: 'center'}, styles.paddingHorizontal_5]}>
                                3
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        );
    };


    componentWillReceiveProps(nextProps) {
        // this.setState({loader: false , isSubmitted: false});

    }

    componentWillMount(){
        // this.setState({loader: true});

    }

    componentDidMount() {
        this.runPlaceHolder();
    }

    runPlaceHolder() {
        if (Array.isArray(this.loadingAnimated) && this.loadingAnimated.length > 0) {
            Animated.parallel(
                this.loadingAnimated.map(animate => {
                    if (animate && animate.getAnimated) {
                        return animate.getAnimated();
                    }
                    return null;
                }),
                {
                    stopTogether: false,
                }
            ).start(() => {
                this.runPlaceHolder();
            })
        }
    }

    _renderRows(loadingAnimated, numberRow, uniqueKey) {
        let shimmerRows = [];
        for (let index = 0; index < numberRow; index++) {
            shimmerRows.push(
                <ShimmerPlaceHolder
                    key={`loading-${index}-${uniqueKey}`}
                    ref={(ref) => loadingAnimated.push(ref)}
                    style={{marginVertical:7, alignSelf: 'center'}}
                    width={width - 20}
                    height={100}
                    colorShimmer={['#ffffff75', '#FEDAD075', '#ffffff75']}
                />
            )
        }

        return (
            <View >
                {shimmerRows}
            </View>
        )
    }

    onFocus() {
        this.componentWillMount();
    }


    render() {

        this.loadingAnimated = [];

        return (
            <Container>
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent
                                onPress={() => this.props.navigation.navigate('MyOrders')}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right'/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title
                        style={[styles.textRegular, styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>{i18n.t('orderDet')}</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                        <NavigationEvents onWillFocus={() => this.onFocus()}/>
                        {
                            this.state.loader ?
                                this._renderRows(this.loadingAnimated, 5, '5rows') :
                               <View>
                                    <View style={[styles.position_R, styles.flexCenter, styles.Width_90, {marginTop: 20}]}>
                                       <View style={[styles.lightOverlay, styles.Border]}></View>
                                       <View
                                           style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                           <View style={[styles.icImg, styles.flex_30]}>
                                               <Image style={[styles.icImg]}
                                                      source={require('../../assets/images/profile.png')}/>
                                           </View>
                                           <View style={[styles.flex_70]}>
                                               <View style={[styles.rowGroup]}>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_orange]}>amany</Text>
                                               </View>
                                               <View style={[styles.overHidden]}>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_gray, styles.Width_100, styles.textLeft]}>010122365</Text>
                                               </View>
                                               <View style={[styles.overHidden, styles.rowGroup]}>
                                                   <View style={[styles.overHidden, styles.rowRight]}>
                                                       <Icon style={[styles.text_bold_gray, styles.textSize_12]} type="Feather" name='map-pin' />
                                                       <Text style={[styles.textRegular , styles.text_bold_gray, styles.marginHorizontal_5 ,styles.textSize_12]}>
                                                           المنصورة
                                                       </Text>
                                                   </View>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_bold_gray,styles.textSize_12]}>10/10/2020</Text>
                                               </View>
                                           </View>
                                           <TouchableOpacity
                                               style={[styles.width_40, styles.height_40, styles.flexCenter, styles.bg_light_oran, styles.borderLightOran, styles.marginVertical_5, styles.position_A, styles.top_5, styles.right_0]}>
                                               <Text
                                                   style={[styles.textRegular, styles.text_red]}>3</Text>
                                           </TouchableOpacity>
                                       </View>
                                   </View>

                                   <View
                                       style={[styles.position_R, styles.flexCenter, styles.Width_90, {marginTop: 20}]}>
                                       <View style={[styles.lightOverlay, styles.Border]}></View>
                                       <View
                                           style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                           <Text
                                               style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, {marginBottom: 10}]}>{i18n.t('aboutClient')}</Text>
                                           <View style={[styles.notiBlock, {
                                               borderBottomWidth: 0,
                                               marginBottom: 0
                                           }]}>
                                               <Image
                                                   source={require('../../assets/images/profile.png')}
                                                   resizeMode={'cover'}
                                                   style={styles.restImg}/>
                                               <View style={[styles.directionColumn, {flex: 1}]}>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_orange, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>sh3wza</Text>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_gray, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>01236547</Text>
                                                   <View style={[styles.overHidden, styles.rowRight]}>
                                                       <Icon style={[styles.text_bold_gray, styles.textSize_12]} type="Feather" name='map-pin' />
                                                       <Text style={[styles.textRegular , styles.text_bold_gray, styles.marginHorizontal_5 ,styles.textSize_12]}>
                                                           المنصورة
                                                       </Text>
                                                   </View>
                                               </View>
                                           </View>
                                       </View>
                                   </View>

                                   <FlatList
                                       data                    = {this.props.orderDetails.products}
                                       renderItem              = {({item}) => this.renderItems(item)}
                                       numColumns              = {2}
                                       keyExtractor            = {this._keyExtractor}
                                   />
                                   <View
                                       style={[styles.Width_90, {
                                           marginTop: 15,
                                           marginBottom: 15
                                       }, styles.marginHorizontal_10, styles.SelfCenter]}>
                                       <View style={[styles.lightOverlay, styles.Border]}></View>
                                       <View
                                           style={[styles.Width_100, styles.overHidden, styles.bg_White, styles.Border, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7]}>
                                           <View
                                               style={[styles.directionRowSpace, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, {marginTop: 15}]}>
                                               <Text
                                                   style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{i18n.t('productsprice')}</Text>
                                               <Text
                                                   style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>20 {i18n.t('RS')}</Text>
                                           </View>
                                           <View
                                               style={[styles.directionRowSpace, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, {marginTop: 10}]}>
                                               <Text
                                                   style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{i18n.t('deliveredPrice')}</Text>
                                               <Text
                                                   style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>20 {i18n.t('RS')}</Text>
                                           </View>
                                           <View
                                               style={[styles.directionRowSpace, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, {
                                                   marginTop: 10,
                                                   backgroundColor: '#000'
                                               }]}>
                                               <Text
                                                   style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('total')}</Text>
                                               <Text
                                                   style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>80 {i18n.t('RS')}</Text>
                                           </View>
                                       </View>
                                   </View>

                                   <View
                                       style={[styles.position_R, styles.flexCenter, styles.Width_90, {marginTop: 20}]}>
                                       <View style={[styles.lightOverlay, styles.Border]}></View>
                                       <View
                                           style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7
                                               , {
                                                   borderWidth: 1,
                                                   borderTopColor: COLORS.lightWhite,
                                                   borderBottomColor: COLORS.lightWhite,
                                                   borderRightColor: COLORS.lightWhite,
                                                   borderLeftWidth: 5,
                                                   borderLeftColor: COLORS.orange
                                               }]}>
                                           <View style={[styles.directionColumn, {flex: 1}]}>
                                               <View style={[styles.directionRow]}>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{i18n.t('payMethod')}</Text>
                                               </View>
                                               <Text
                                                   style={[styles.textRegular, styles.text_orange, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>فيزا</Text>
                                           </View>
                                       </View>
                                   </View>

                                   <View
                                       style={[styles.position_R, styles.flexCenter, styles.Width_90, {marginTop: 20}]}>
                                       <View style={[styles.lightOverlay, styles.Border]}></View>
                                       <View
                                           style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7
                                               , {
                                                   borderWidth: 1,
                                                   borderTopColor: COLORS.lightWhite,
                                                   borderBottomColor: COLORS.lightWhite,
                                                   borderRightColor: COLORS.lightWhite,
                                                   borderLeftWidth: 5,
                                                   borderLeftColor: COLORS.orange
                                               }]}>
                                           <View style={[styles.directionColumn, {flex: 1}]}>
                                               <View style={[styles.directionRow]}>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{i18n.t('orderStatus')}</Text>
                                               </View>
                                               <Text
                                                   style={[styles.textRegular, styles.text_orange, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>لم يتم الرد</Text>
                                           </View>
                                       </View>
                                   </View>

                                   {
                                       this.props.navigation.state.params.orderType === 0  ||  this.props.navigation.state.params.orderType === 1 ?
                                           <View
                                               style={[styles.directionRowSpace, styles.paddingHorizontal_10, styles.marginVertical_15]}>

                                               <TouchableOpacity
                                                   // onPress={() => this.deleteOrder()}
                                                   style={[styles.cartBtn, styles.SelfCenter, {marginBottom: 20}]}>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('ok')}</Text>
                                               </TouchableOpacity>

                                               <TouchableOpacity
                                                   // onPress={() => this.deleteOrder()}
                                                   style={[styles.cartBtn, styles.SelfCenter, {
                                                       marginBottom: 20,
                                                       backgroundColor: '#8f8f8f96'
                                                   }]}>
                                                   <Text
                                                       style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{i18n.t('refuse')}</Text>
                                               </TouchableOpacity>

                                           </View>
                                           : <View/>
                                   }

                                   {
                                       this.props.navigation.state.params.orderType === 2 ?
                                           <TouchableOpacity
                                               // onPress={() => this.props.navigation.navigate('drawerNavigator')}
                                               style={[styles.cartBtn, styles.SelfCenter, {
                                                   marginBottom: 20,
                                                   backgroundColor: COLORS.bold_gray
                                               }]}>
                                               <Text
                                                   style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('finishOrder')}</Text>
                                           </TouchableOpacity>
                                           :
                                           <View/>
                                   }

                               </View>
                        }

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({lang  , profile, orderDetails}) => {
    return {
        lang: lang.lang,
        user: profile.user,
        orderDetails: orderDetails.orderDetails,
    };
};
export default connect(mapStateToProps, {getOrderDetails , getCancelOrder , getDeleteOrder , getAcceptOrder})(DelegateOrderDetails);
