import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    Share,
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
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";

class OrderDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: null,
            isModalVisible: false,

        }
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    componentWillMount(){

    }
    onFocus() {
        this.componentWillMount();
    }

    render() {

        // alert(this.props.navigation.state.params.orderType)
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
                        <View style={styles.viewBlock}>
                            <Swiper
                                containerStyle={[styles.Width_90, styles.marginVertical_15, styles.swiper, styles.viewBlock]}
                                autoplay={true}
                                paginationStyle={{
                                    alignSelf: "flex-end",
                                    paddingHorizontal: 30,
                                    position: 'absolute',
                                    transform: [{rotate: '90deg'}],
                                    right: -330,
                                    zIndex: 999
                                }}
                                dotStyle={{backgroundColor: '#fff'}}
                                activeDotStyle={{backgroundColor: '#F00', width: 20,}}
                                animated={true}
                                loop={true}
                                autoplayTimeout={2}
                            >
                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_90, styles.swiper]}
                                           source={require('../../assets/images/img_product.png')}
                                           resizeMode={'cover'}/>
                                </View>
                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_90, styles.swiper]}
                                           source={require('../../assets/images/img_two.png')} resizeMode={'cover'}/>
                                </View>
                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_90, styles.swiper]}
                                           source={require('../../assets/images/img_three.png')} resizeMode={'cover'}/>
                                </View>
                            </Swiper>
                        </View>

                        <View
                            style={[styles.Width_95, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter]}>
                            <View style={[styles.lightOverlay, styles.Border]}></View>
                            <View
                                style={[styles.Width_100, styles.overHidden, styles.bg_White, styles.Border, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7]}>
                                <View style={[styles.overHidden]}>
                                    <View style={[styles.rowGroup]}>
                                        <Text
                                            style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}
                                            numberOfLines={1} prop with ellipsizeMode="head">قهوة فرنسية</Text>

                                        <View style={[styles.rowGroup]}>
                                            <Text
                                                style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft]}>{i18n.t('productPrice')}</Text>
                                            <Text
                                                style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, {
                                                    borderRightWidth: 2,
                                                    borderRightColor: COLORS.orange,
                                                    paddingRight: 5,
                                                    marginLeft: 5
                                                }]}>20 {i18n.t('RS')}</Text>
                                        </View>
                                    </View>
                                    <Text
                                        style={[styles.textRegular, styles.text_bold_gray, styles.Width_100, styles.textSize_12, styles.textLeft]}
                                        numberOfLines={1} prop with ellipsizeMode="head">حليب - بن - بندق</Text>
                                </View>
                                <View style={[styles.Width_100]}>
                                    <Text style={[styles.textRegular, styles.text_black, styles.textSize_14]}
                                          numberOfLines={1} prop with
                                          ellipsizeMode="head">{i18n.t('productSpec')}</Text>
                                    <Text style={[styles.textRegular, styles.text_bold_gray, styles.textSize_12]}>قهوة
                                        فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية
                                        قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية </Text>
                                </View>
                                <View
                                    style={[styles.directionRowSpace, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, {marginTop: 15}]}>
                                    <Text
                                        style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>{i18n.t('productNum')}</Text>
                                    <Text
                                        style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>4</Text>
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
                                        style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>50 {i18n.t('RS')}</Text>
                                </View>
                            </View>
                        </View>

                        {
                            this.props.navigation.state.params.orderType === 0 || this.props.navigation.state.params.orderType === 1|| this.props.navigation.state.params.orderType === 2|| this.props.navigation.state.params.orderType === 4 ?
                                <View
                                    style={[styles.position_R, styles.Width_95, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter]}>
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
                                                    style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>حالة
                                                    الطلب</Text>
                                            </View>
                                            <Text
                                                style={[styles.textRegular, styles.text_orange, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>لم
                                                يتم قبول الطلب بعد</Text>
                                        </View>
                                    </View>
                                </View>
                                :
                                <View/>
                        }
                        {
                            this.props.navigation.state.params.orderType === 0 || this.props.navigation.state.params.orderType === 1 ?
                                    <TouchableOpacity onPress={() => this.toggleModal()}
                                                      style={[styles.cartBtn, styles.SelfCenter, {marginBottom: 20}]}>
                                        <Text
                                            style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('cancelOrder')}</Text>
                                    </TouchableOpacity>
                                :
                                <View/>
                        }


                        {
                            this.props.navigation.state.params.orderType === 2 ?
                            <View>
                                <View
                                    style={[styles.position_R, styles.Width_95, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter]}>
                                    <View style={[styles.lightOverlay, styles.Border]}></View>
                                    <View
                                        style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White, styles.bgFullWidth, styles.paddingHorizontal_7, styles.paddingVertical_7]}>
                                        <Text
                                            style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, {marginBottom: 10}]}>عن
                                            المندوب</Text>
                                        <View style={[styles.notiBlock, {borderBottomWidth: 0, marginBottom: 0}]}>
                                            <Image source={require('../../assets/images/img_product.png')} resizeMode={'cover'}
                                                   style={styles.restImg}/>
                                            <View style={[styles.directionColumn, {flex: 1}]}>
                                                <Text
                                                    style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>اسم
                                                    المندوب</Text>
                                                <Text
                                                    style={[styles.textRegular, styles.text_orange, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>000000000</Text>
                                                <Text
                                                    style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft, {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{i18n.t('deliveredPlace')} :
                                                    الرياض شارع التخصصي</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('drawerNavigator')}
                                                  style={[styles.cartBtn, styles.SelfCenter, {marginBottom: 20}]}>
                                    <Text
                                        style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('finishOrder')}</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View/>
                        }

                    </ImageBackground>
                </Content>
                <Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal()}>
                    <View style={[styles.commentModal, {padding: 15, height: 250}]}>
                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>
                            {i18n.t('cancelOrder')}
                        </Text>
                        <View style={[styles.directionRow]}>
                            <View style={[styles.Width_100, {marginTop: 20}]}>
                                <View style={[styles.lightOverlay, styles.Border]}/>
                                <Textarea placeholder={i18n.t('cancelOrderReason')}
                                          placeholderTextColor={COLORS.bold_gray} autoCapitalize='none'
                                          value={this.state.desc} onChangeText={(desc) => this.setState({desc})}
                                          style={[styles.textarea, styles.textRegular, styles.Width_100, styles.overHidden, styles.bg_White, styles.Border, styles.paddingHorizontal_7, styles.paddingVertical_7]}/>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.toggleModal()}
                                          style={[styles.cartBtn, styles.SelfCenter, {marginTop: 20}]}>
                            <Text
                                style={[styles.textRegular, styles.text_White, styles.textSize_14, styles.textLeft]}>{i18n.t('cancelOrder')}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Container>

        );
    }
}


const mapStateToProps = ({lang}) => {
    return {
        lang: lang.lang,
    };
};
export default connect(mapStateToProps, {})(OrderDetails);