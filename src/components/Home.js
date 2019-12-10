import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Linking, FlatList, ScrollView} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title, Right, } from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import { sliderHome } from '../actions';
import i18n from "../../locale/i18n";
import home from "../reducers/HomeReducer";
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";

const products=[
    {id:1 , name:'قهوة فرنسية' , content:'حليب - بن - بندق', price:'25', image:require('../../assets/images/coffee_img.png')},
    {id:2 , name:'قهوة فرنسية' , content:'حليب - بن - بندق', price:'25', image:require('../../assets/images/img_product.png')},
    {id:3 , name:'قهوة فرنسية' , content:'حليب - بن - بندق', price:'25', image:require('../../assets/images/coffee_img.png')},
    {id:4 , name:'قهوة فرنسية' , content:'حليب - بن - بندق', price:'25', image:require('../../assets/images/img_product.png')},
];

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            products,
        }
    }

    componentWillMount() {
        this.props.sliderHome( this.props.lang );
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_black, styles.textSize_18]}>{ i18n.t('home') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/home.png')} resizeMode={'cover'}/>)
    });

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('product')} style={[styles.position_R, styles.Width_45, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter]}>
                <View style={[styles.lightOverlay, styles.Border]}></View>
                <View style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White, styles.Border,styles.bgFullWidth,styles.paddingHorizontal_7 , styles.paddingVertical_7]}>
                    <View style={[styles.overHidden]}>
                        <Image source={item.image} resizeMode={'cover'} style={styles.prodImg}/>
                        <Text style={[styles.textRegular, styles.text_black, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">{item.name}</Text>
                        <Text style={[styles.textRegular, styles.text_bold_gray, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">{item.content}</Text>
                        <View style={[styles.rowGroup]}>
                            <Text style={[styles.textRegular, styles.text_orange,styles.textSize_12, styles.textLeft ,{borderRightWidth:2 , borderRightColor:COLORS.orange , paddingRight:5}]} numberOfLines = { 1 } prop with ellipsizeMode = "head">{item.price} {i18n.t('RS')}</Text>
                            <TouchableOpacity onPress={() => this.setState({isFav:!this.state.isFav ,refreshed:!this.state.refreshed })}>
                                {
                                    this.state.isFav?
                                        <Icon style={[styles.text_orange , styles.textSize_18]} type="AntDesign" name='heart' />
                                        :
                                        <Icon style={[styles.text_bold_gray , styles.textSize_18]} type="AntDesign" name='hearto' />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    renderLoader(){
        if (this.props.loader){
            return(
                <View style={[styles.loading, styles.flexCenter]}>
                    <DoubleBounce size={20} />
                </View>
            );
        }
    }

    onFocus(){
        this.componentDidMount();
    }

    render() {

        return (
            <Container>

                { this.renderLoader() }

				<NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={[styles.leftIcon, styles.marginHorizontal_15]}>
                        <Button style={styles.Button} transparent onPress={() => { this.props.navigation.openDrawer()} }>
                            <Image style={[styles.ionImage]} source={require('../../assets/images/menu.png')}/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            { i18n.t('home') }
                        </Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        {/*<Button onPress={() => this.props.navigation.navigate('notifications')} style={[styles.text_gray]} transparent>*/}
                            {/*<Icon style={[styles.text_black, styles.textSize_22]} type="Ionicons" name='md-notifications-outline' />*/}
                        <Button style={[styles.text_gray]} transparent>
                            <Image style={[styles.ionImage]} source={require('../../assets/images/alarm.png')}/>
                        </Button>
                        <Button style={[styles.bg_light_oran, styles.Radius_0, styles.iconHeader, styles.flexCenter]} transparent onPress={this.toggleModal}>
                            <Image style={[styles.ionImage]} source={require('../../assets/images/basket.png')}/>
                        </Button>
                    </Right>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    <ImageBackground source={require('../../assets/images/background.png')} style={[styles.bgFullWidth]}>

                        <View style={[styles.homeUser]}>

                            <View style={styles.viewBlock}>

                                <Swiper
                                    containerStyle      = {[styles.Width_95, styles.marginVertical_15, styles.swiper, styles.viewBlock]}
                                    autoplay            = {true}
                                    paginationStyle     = {[styles.paginationStyle]}
                                    dotStyle            = {[styles.bg_lightWhite]}
                                    activeDotStyle      = {{ backgroundColor: '#F00', width: 20,}}
                                    animated            = {true}
                                    loop                = {true}
                                    autoplayTimeout     = { 2 }
                                >

                                    {
                                        this.props.slider.map((slid, i) => (
                                            <View style={[styles.viewBlock]}>
                                                <Image style={[styles.Width_95, styles.swiper]} source={{ uri : slid.image}}/>
                                                <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent, styles.Width_50]}>
                                                    <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                                        <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                                            {slid.name}
                                                        </Text>
                                                        <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                                            {slid.description}
                                                        </Text>
                                                        <TouchableOpacity key={i} onPress={() => Linking.openURL(slid.link)}>
                                                            <Text style={[styles.textRegular, styles.text_red, styles.Width_100 ,styles.textSize_12, styles.textLeft, styles.textDecoration]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                                                { i18n.t('here') }
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </Animatable.View>
                                            </View>
                                        ))
                                    }

                                </Swiper>

                            </View>

                        </View>

                        {/*<View style={[styles.homeProvider]}>*/}

                        {/*    <View style={[styles.viewBlock]}>*/}
                        {/*        <Image style={[styles.Width_90, styles.swiper]} source={require('../../assets/images/img_product.png')} resizeMode={'cover'}/>*/}
                        {/*        <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>*/}
                        {/*            <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>*/}
                        {/*                <Text style={[styles.textBold, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">بيتزا هت </Text>*/}
                        {/*                <View style={{width:70}}>*/}
                        {/*                    <StarRating*/}
                        {/*                        disabled={true}*/}
                        {/*                        maxStars={5}*/}
                        {/*                        rating={this.state.starCount}*/}
                        {/*                        fullStarColor={COLORS.orange}*/}
                        {/*                        starSize={13}*/}
                        {/*                        starStyle={styles.starStyle}*/}
                        {/*                    />*/}
                        {/*                </View>*/}
                        {/*                <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head"> الندم ف العمر عذاب ي بيبي </Text>*/}
                        {/*                <View style={[styles.locationView]}>*/}
                        {/*                    <Icon style={[styles.text_White , styles.textSize_12 ,{marginRight:5}]} type="Feather" name='map-pin' />*/}
                        {/*                    <Text style={[styles.textRegular, styles.text_White,styles.textSize_12]} >الرياض شارع التخصصي</Text>*/}
                        {/*                </View>*/}
                        {/*            </View>*/}
                        {/*        </Animatable.View>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.mainScroll}>*/}
                        {/*        <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>*/}
                        {/*            <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>*/}
                        {/*                <TouchableOpacity onPress={ () => this.setState({activeType:0})} style={[styles.scrollView,*/}
                        {/*                    {backgroundColor:this.state.activeType === 0 ?'#fff' : COLORS.light_gray , borderTopColor:this.state.activeType === 0 ? COLORS.orange : 'transparent'}]}>*/}
                        {/*                    <Image source={require('../../assets/images/black_coffee.png')} style={[styles.scrollImg]} resizeMode={'contain'} />*/}
                        {/*                </TouchableOpacity>*/}
                        {/*                <Text style={[styles.textRegular, styles.textSize_12 , {color:this.state.activeType === 0 ? COLORS.black :'transparent' }]} >قهوة</Text>*/}
                        {/*            </View>*/}
                        {/*            <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>*/}
                        {/*                <TouchableOpacity onPress={ () => this.setState({activeType:1})} style={[styles.scrollView,*/}
                        {/*                    {backgroundColor:this.state.activeType === 1 ?'#fff' : COLORS.light_gray , borderTopColor:this.state.activeType === 1 ? COLORS.orange : 'transparent'}]}>*/}
                        {/*                    <Image source={require('../../assets/images/black_juice.png')} style={[styles.scrollImg]} resizeMode={'contain'} />*/}
                        {/*                </TouchableOpacity>*/}
                        {/*                <Text style={[styles.textRegular, styles.textSize_12 , {color:this.state.activeType === 1 ? COLORS.black :'transparent' }]} >مشروبات</Text>*/}
                        {/*            </View>*/}
                        {/*            <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>*/}
                        {/*                <TouchableOpacity onPress={ () => this.setState({activeType:2})} style={[styles.scrollView,*/}
                        {/*                    {backgroundColor:this.state.activeType === 2 ?'#fff' : COLORS.light_gray , borderTopColor:this.state.activeType === 2 ? COLORS.orange : 'transparent'}]}>*/}
                        {/*                    <Image source={require('../../assets/images/black_cookies.png')} style={[styles.scrollImg]} resizeMode={'contain'} />*/}
                        {/*                </TouchableOpacity>*/}
                        {/*                <Text style={[styles.textRegular, styles.textSize_12 , {color:this.state.activeType === 2 ? COLORS.black :'transparent' }]} >قهوة</Text>*/}
                        {/*            </View>*/}
                        {/*            <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>*/}
                        {/*                <TouchableOpacity onPress={ () => this.setState({activeType:3})} style={[styles.scrollView,*/}
                        {/*                    {backgroundColor:this.state.activeType === 3 ?'#fff' : COLORS.light_gray , borderTopColor:this.state.activeType === 3 ? COLORS.orange : 'transparent'}]}>*/}
                        {/*                    <Image source={require('../../assets/images/black_milkshake.png')} style={[styles.scrollImg]} resizeMode={'contain'} />*/}
                        {/*                </TouchableOpacity>*/}
                        {/*                <Text style={[styles.textRegular, styles.textSize_12 , {color:this.state.activeType === 3 ? COLORS.black :'transparent' }]} >مشروبات</Text>*/}
                        {/*            </View>*/}
                        {/*            <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>*/}
                        {/*                <TouchableOpacity onPress={ () => this.setState({activeType:4})} style={[styles.scrollView,*/}
                        {/*                    {backgroundColor:this.state.activeType === 4 ?'#fff' : COLORS.light_gray , borderTopColor:this.state.activeType === 4 ? COLORS.orange : 'transparent'}]}>*/}
                        {/*                    <Image source={require('../../assets/images/black_fruit.png')} style={[styles.scrollImg]} resizeMode={'contain'} />*/}
                        {/*                </TouchableOpacity>*/}
                        {/*                <Text style={[styles.textRegular, styles.textSize_12 , {color:this.state.activeType === 4 ? COLORS.black :'transparent' }]} >قهوة</Text>*/}
                        {/*            </View>*/}
                        {/*            <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>*/}
                        {/*                <TouchableOpacity onPress={ () => this.setState({activeType:5})} style={[styles.scrollView ,*/}
                        {/*                    {backgroundColor:this.state.activeType === 5 ?'#fff' : COLORS.light_gray , borderTopColor:this.state.activeType === 5 ? COLORS.orange : 'transparent'}]}>*/}
                        {/*                    <Image source={require('../../assets/images/black_cookies.png')} style={[styles.scrollImg]} resizeMode={'contain'} />*/}
                        {/*                </TouchableOpacity>*/}
                        {/*                <Text style={[styles.textRegular, styles.textSize_12 , {color:this.state.activeType === 5 ? COLORS.black :'transparent' }]} >مشروبات</Text>*/}
                        {/*            </View>*/}
                        {/*            <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>*/}
                        {/*                <TouchableOpacity onPress={ () => this.setState({activeType:6})} style={[styles.scrollView,*/}
                        {/*                    {backgroundColor:this.state.activeType === 6 ?'#fff' : COLORS.light_gray , borderTopColor:this.state.activeType === 6 ? COLORS.orange : 'transparent'}]}>*/}
                        {/*                    <Image source={require('../../assets/images/black_juice.png')} style={[styles.scrollImg]} resizeMode={'contain'} />*/}
                        {/*                </TouchableOpacity>*/}
                        {/*                <Text style={[styles.textRegular, styles.textSize_12 , {color:this.state.activeType === 6 ? COLORS.black :'transparent' }]} >قهوة</Text>*/}
                        {/*            </View>*/}
                        {/*        </ScrollView>*/}
                        {/*    </View>*/}

                        {/*    <FlatList*/}
                        {/*        data={this.state.products}*/}
                        {/*        renderItem={({item}) => this.renderItems(item)}*/}
                        {/*        numColumns={2}*/}
                        {/*        keyExtractor={this._keyExtractor}*/}
                        {/*        extraData={this.state.refreshed}*/}
                        {/*    />*/}

                        {/*</View>*/}

                        {/*<View style={[styles.homeDelegat]}>*/}

                        {/*    <TouchableOpacity onPress={() => this.props.navigation.navigate('orderDetails')} style={[styles.position_R, styles.flexCenter, styles.Width_90, styles.marginVertical_25]}>*/}
                        {/*        <View style={[styles.lightOverlay, styles.Border]}></View>*/}
                        {/*        <View style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>*/}
                        {/*            <View style={[styles.icImg, styles.flex_30]}>*/}
                        {/*                <Image style={[styles.icImg]} source={require('../../assets/images/bg_shope.png')}/>*/}
                        {/*            </View>*/}
                        {/*            <View style={[styles.flex_70]}>*/}
                        {/*                <View style={[styles.rowGroup]}>*/}
                        {/*                    <Text style={[styles.textRegular , styles.text_black]}>مطاعم</Text>*/}
                        {/*                </View>*/}
                        {/*                <View style={[styles.overHidden]}>*/}
                        {/*                    <Text style={[styles.textRegular , styles.text_gray, styles.Width_100, styles.textLeft]}>تصنيف القسم</Text>*/}
                        {/*                </View>*/}
                        {/*                <View style={[styles.overHidden, styles.rowGroup]}>*/}
                        {/*                    <Text style={[styles.textRegular , styles.text_red,]}>30 ر.س</Text>*/}
                        {/*                    <Text style={[styles.textRegular , styles.text_gray,]}>12/12/2019</Text>*/}
                        {/*                </View>*/}
                        {/*            </View>*/}
                        {/*            <TouchableOpacity style = {[styles.width_40 , styles.height_40 , styles.flexCenter, styles.bg_light_oran, styles.borderLightOran, styles.marginVertical_5, styles.position_A, styles.top_5, styles.right_0]}>*/}
                        {/*                <Text style={[styles.textRegular , styles.text_red]}>12</Text>*/}
                        {/*            </TouchableOpacity>*/}
                        {/*        </View>*/}
                        {/*    </TouchableOpacity>*/}

                        {/*</View>*/}

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang, home }) => {
    return {
        lang        : lang.lang,
        slider      : home.slider,
        loader      : home.loader
    };
};
export default connect(mapStateToProps, { sliderHome })(Home);