import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Linking, FlatList, Platform, Dimensions, Animated, ScrollView} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title, Right, Item, Input, Picker,} from 'native-base'
import styles from '../../assets/style'
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import {sliderHome, categoryHome, searchHome, homeProvider , homeDelegate} from '../actions';
import i18n from "../../locale/i18n";
import StarRating from "react-native-star-rating";
import COLORS from "../consts/colors";
import Spinner from "react-native-loading-spinner-overlay";

const isIOS = Platform.OS === 'ios';

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            categorySearch      : '',
            isFav               : 0,
            refreshed           : false,
            active              : true,
            loader              : true,
            status              : 1,
            spinner             : true,
        }
    }

    componentWillMount() {

        if (this.props.auth === null || this.props.auth.data.type === 'user') {
            this.props.sliderHome(this.props.lang);
            this.props.categoryHome(this.props.lang);
        } else if (this.props.auth.data.type === 'provider') {
            this.props.homeProvider(this.props.lang, null, this.props.auth.data.token);
        } else if (this.props.auth.data.type === 'delegate') {
            this.props.homeDelegate(this.props.lang, this.state.status, this.props.auth.data.token);
        }


        this.setState({ spinner: false });

    }


    onSubCategories ( id ){

        this.setState({spinner: true, active : id });
        this.props.homeProvider( this.props.lang , id ,this.props.user.token );

    }

    componentWillReceiveProps(nextProps) {
        this.setState({loader: false});
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
                <View style={[styles.position_R, styles.Width_100, styles.height_250 , styles.Border,styles.bgFullWidth, styles.overHidden]}>
                    <Animatable.View animation="zoomIn" easing="ease-out" delay={500}>
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
                    </Animatable.View>
                </View>
            </TouchableOpacity>
        );
    };

    provider_keyExtractor = (item, index) => item.id;

    providerItems = (item , key) => {
        return(
            <TouchableOpacity
                style       = {[styles.position_R , styles.flex_45, styles.marginVertical_15, styles.height_200, styles.marginHorizontal_10]}
                key         = { key }
                onPress     = {() => this.props.navigation.navigate('product', { id : item.id })}
            >
                <View style={[styles.lightOverlay, styles.Border]}></View>
                <View style={[styles.bg_White, styles.Border]}>
                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                        <View style={[styles.flex_100, styles.position_R]}>
                            <Image
                                style           = {[styles.Width_100 , styles.height_100, styles.flexCenter]}
                                source          = {{ uri: item.thumbnail }}
                                resizeMode      = {'cover'}
                            />

                            {
                                (item.discount !== 0)
                                    ?
                                    <View style = {[styles.overlay_black, styles.text_White, styles.textRegular, styles.position_A, styles.top_15, styles.left_0,styles.paddingHorizontal_5, styles.width_50, styles.flexCenter]}>
                                        <Text style = {[styles.text_White, styles.textRegular, styles.textCenter]}>
                                            {item.discount} %
                                        </Text>
                                    </View>
                                    :
                                    <View/>
                            }
                        </View>
                    </View>
                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5]}>
                        <Text
                            style           = {[styles.text_gray, styles.textSize_14, styles.textRegular, styles.Width_100, styles.textLeft]}
                            numberOfLines   = { 1 } prop with
                            ellipsizeMode   = "head">
                            {item.name}
                        </Text>
                        <Text style={[styles.text_light_gray, styles.textSize_13, styles.textRegular, styles.Width_100, styles.textLeft]}>
                            {item.category} - {item.sub_category}
                        </Text>
                        <View style={[styles.rowGroup]}>
                            <Text style={[styles.text_red, styles.textSize_13, styles.textRegular,styles.textLeft, styles.borderText, styles.paddingHorizontal_5]}>
                                {item.price} {i18n.t('RS')}
                            </Text>
                            <TouchableOpacity onPress = {() => this.toggleFavorite(item.id)}>
                                <Text>
                                    <Icon style={[styles.text_red, styles.textSize_18]} type="AntDesign" name={this.state.isFav === 1 ? 'heart' : 'hearto'} />
                                </Text>
                            </TouchableOpacity>
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

    onFocus(){
        this.componentWillMount();
    }

    render() {

        const provider_info = this.props.provider;

        return (
            <Container>

                <Spinner
                    visible           = { this.state.spinner }
                />
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
                        <Button onPress={() => this.props.navigation.navigate('notifications')} style={[styles.text_gray]} transparent>
                            <Image style={[styles.ionImage]} source={require('../../assets/images/alarm.png')}/>
                        </Button>
                        <Button  onPress={() => this.props.navigation.navigate('Basket')} style={[styles.bg_light_oran, styles.Radius_0, styles.iconHeader, styles.flexCenter]} transparent>
                            <Image style={[styles.ionImage]} source={require('../../assets/images/basket.png')}/>
                        </Button>
                    </Right>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <Animatable.View animation="fadeInLeft" easing="ease-out" delay={500}>
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
                        </Animatable.View>

                        {
                            this.props.user == null || this.props.user.type === 'user' ?
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
                                :
                                <View/>
                        }

                        {
                            this.props.user != null && this.props.user.type === 'provider' ?
                                <View style={[styles.homeProvider]}>

                                    <View style={[styles.viewBlock, styles.bg_White , styles.borderGray, styles.Width_90, styles.position_R]}>
                                        <TouchableOpacity
                                            style       = {[styles.width_40 , styles.height_40 , styles.flexCenter, styles.overlay_black, styles.position_A, styles.top_10, styles.right_0]}
                                            onPress     = {() => this.props.navigation.navigate('EditShop', {data : provider_info})}
                                        >
                                            <Icon style={[styles.text_White, styles.textSize_18]} type="AntDesign" name='edit' />
                                        </TouchableOpacity>
                                        <Image style={[styles.Width_100, styles.swiper]} source={{ uri : provider_info.avatar }} resizeMode={'cover'}/>
                                        <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                            <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                                <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                                    {provider_info.name}
                                                </Text>
                                                <View style={{width:70}}>
                                                    <StarRating
                                                        disabled        = {true}
                                                        maxStars        = {5}
                                                        rating          = {provider_info.rates}
                                                        fullStarColor   = {COLORS.orange}
                                                        starSize        = {13}
                                                        starStyle       = {styles.starStyle}
                                                    />
                                                </View>
                                                <Text style={[styles.textBold, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                                    {provider_info.details}
                                                </Text>
                                                <View style={[styles.locationView]}>
                                                    <Icon style={[styles.text_White , styles.textSize_12 ,{marginRight:5}]} type="Feather" name='map-pin' />
                                                    <Text style={[styles.textRegular, styles.text_White,styles.textSize_12]}>
                                                        {provider_info.address}
                                                    </Text>
                                                </View>
                                            </View>
                                        </Animatable.View>
                                    </View>

                                    <View style={styles.mainScroll}>
                                        <ScrollView style={[styles.Width_100, styles.paddingHorizontal_10]} horizontal={true} showsHorizontalScrollIndicator={false}>

                                            {
                                                this.props.sub_categories.map((pro) => (

                                                    <View style={{flexDirection:'column' , justifyContent:'center' , alignItems:'center', alignSelf : 'center'}}>
                                                        <TouchableOpacity
                                                            onPress        = {() => this.onSubCategories(pro.id)}
                                                            style          = { this.state.active === pro.id ? styles.activeTabs : styles.noActiveTabs }>
                                                            <Image source={{ uri : pro.image }} style={[styles.scrollImg]} resizeMode={'contain'} />
                                                        </TouchableOpacity>
                                                        <Text style={[styles.textRegular, styles.textSize_11 , { color : this.state.active === pro.id ? COLORS.black : 'transparent' }]} >
                                                            {pro.name}
                                                        </Text>
                                                    </View>

                                                ))
                                            }

                                        </ScrollView>
                                    </View>

                                    <View style={[styles.marginVertical_5 , styles.paddingHorizontal_5]}>

                                        <FlatList
                                            data                    = {this.props.products}
                                            renderItem              = {({item}) => this.providerItems(item)}
                                            numColumns              = {2}
                                            keyExtractor            = {this.provider_keyExtractor}
                                            extraData               = {this.state.refreshed}
                                            onEndReachedThreshold   = {isIOS ? .01 : 1}
                                        />

                                    </View>

                                </View>
                                :
                                <View/>
                        }

                        {
                            this.props.user != null && this.props.user.type === 'delegate' ?
                                <View style={[styles.homeDelegat]}>

                                    {
                                        this.props.orders.map((order, i) => (

                                            <TouchableOpacity
                                                onPress     = {() => this.props.navigation.navigate('product', { id : order.id })}
                                                key         = { i }
                                                style       = {[styles.position_R, styles.flexCenter, styles.Width_90, styles.marginVertical_10]}
                                            >
                                                <View style={[styles.lightOverlay, styles.Border]}></View>
                                                <View style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                                    <View style={[styles.icImg, styles.flex_30]}>
                                                        <Image style={[styles.icImg]} source={{ uri : order.avatar }}/>
                                                    </View>
                                                    <View style={[styles.flex_70]}>
                                                        <View style={[styles.rowGroup]}>
                                                            <Text style={[styles.textRegular , styles.text_black]}>{ order.name }</Text>
                                                        </View>
                                                        <View style={[styles.overHidden]}>
                                                            <Text style={[styles.textRegular , styles.text_gray, styles.Width_100, styles.textLeft]}>
                                                                { order.category }
                                                            </Text>
                                                        </View>
                                                        <View style={[styles.overHidden, styles.rowGroup]}>
                                                            <Text style={[styles.textRegular , styles.text_red,]}>{ order.price }  </Text>
                                                            <Text style={[styles.textRegular , styles.text_gray,]}>{ order.date }</Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity style = {[styles.width_40 , styles.height_40 , styles.flexCenter, styles.bg_light_oran, styles.borderLightOran, styles.marginVertical_5, styles.position_A, styles.top_5, styles.right_0]}>
                                                        <Text style={[styles.textRegular , styles.text_red]}>{ order.provider_id }</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableOpacity>

                                        ))
                                    }

                                </View>
                                :
                                <View/>
                        }

                    </ImageBackground>
                </Content>
                {
                    this.props.user != null && this.props.user.type === 'provider' ?
                        <TouchableOpacity
                            style       = {[styles.rotatTouch ,styles.width_50 , styles.height_50 , styles.flexCenter, styles.bg_red, styles.position_A, styles.bottom_30]}
                            onPress     = {() => this.props.navigation.navigate('AddProduct')}
                            >
                            <Icon style={[styles.text_White, styles.textSize_22, styles.rotatIcon]} type="AntDesign" name='plus' />
                        </TouchableOpacity>
                        :
                        <View/>
                }
            </Container>

        );
    }
}

const mapStateToProps = ({ lang, home, categoryHome, homeProvider, profile , homeDelegate, auth}) => {
    return {
        lang                : lang.lang,
        slider              : home.slider,
        categories          : categoryHome.categories,
        auth		        : auth.user,
        loader              : home.loader,
        products            : homeProvider.products,
        sub_categories      : homeProvider.subCategories,
        provider            : homeProvider.provider,
        user                : profile.user,
        orders              : homeDelegate.orders
    };
};
export default connect(mapStateToProps, { sliderHome, categoryHome, searchHome , homeProvider, homeDelegate })(Home);