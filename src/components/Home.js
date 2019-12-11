import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Linking, FlatList, ScrollView , Platform} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title, Right, Item, Input,} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import { sliderHome, categoryHome, searchHome } from '../actions';
import i18n from "../../locale/i18n";

const isIOS = Platform.OS === 'ios';

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            categorySearch      : '',
        }
    }

    componentWillMount() {
        this.props.sliderHome( this.props.lang );
        this.props.categoryHome( this.props.lang );
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_black, styles.textSize_18]}>{ i18n.t('home') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/home.png')} resizeMode={'cover'}/>)
    });

    _keyExtractor = (item, index) => item.id;

    renderItems = (item, key) => {
        return(
            <TouchableOpacity
                onPress     = {() => this.props.navigation.navigate('FilterCategory', { id : item.id , name : item.name  })}
                key         = { key }
                style       = {[styles.position_R, styles.Width_45, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter]}>
                <View style={[styles.position_R, styles.Width_100, styles.height_250 , styles.Border,styles.bgFullWidth,]}>
                    <View style={[styles.overHidden, styles.position_R]}>
                        <Image style={[styles.Width_100 , styles.height_250]} source={{ uri: item.image }}/>
                        <View style={[
                            styles.textRegular ,
                            styles.text_White ,
                            styles.textSize_14 ,
                            styles.textCenter ,
                            styles.position_A ,
                            styles.left_0 ,
                            styles.top_20 ,
                            styles.overlay_black ,
                            styles.paddingHorizontal_5 ,
                            styles.paddingVertical_5 ,
                            styles.width_120,
                            styles.rowGroup,
                            styles.paddingHorizontal_15
                        ]}>
                            <Image style={styles.ionImage} source={{ uri: item.icon }}/>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_14 , styles.textCenter ,]}>
                                { item.name }
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    onSearch () {
        this.props.navigation.navigate('SearchHome', {
            categorySearch                  : this.state.categorySearch,
        });
    }


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
                    <Left style={[styles.leftIcon]}>
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
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <View style={[styles.position_R , styles.Width_60, styles.SelfRight]}>
                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('searchCat')}
                                    style                   = {[styles.input, styles.height_40, styles.bg_light_gray]}
                                    autoCapitalize          = 'none'
                                    onChangeText            = {(categorySearch) => this.setState({categorySearch})}
                                />
                            </Item>
                            <TouchableOpacity
                                style       = {[styles.position_A, styles.iconSearch, styles.width_50, styles.height_40, styles.flexCenter,]}
                                onPress     = {() => this.onSearch()}
                            >
                                <Icon style={[styles.text_gray, styles.textSize_20]} type="AntDesign" name='search1' />
                            </TouchableOpacity>
                        </View>

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

                            <View style={[styles.marginVertical_5]}>

                                <FlatList
                                    data                    = {this.props.categories}
                                    renderItem              = {({item}) => this.renderItems(item)}
                                    numColumns              = {2}
                                    keyExtractor            = {this._keyExtractor}
                                    extraData               = {this.props.categories}
                                    onEndReachedThreshold   = {isIOS ? .01 : 1}
                                />

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

const mapStateToProps = ({ lang, home, searchHome, categoryHome }) => {
    return {
        lang            : lang.lang,
        slider          : home.slider,
        categories      : categoryHome.categories,
        loader          : home.loader
    };
};
export default connect(mapStateToProps, { sliderHome, categoryHome, searchHome })(Home);