import React, { Component } from "react";
import {View, Text, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList, Platform, Animated,Dimensions} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import COLORS from '../../src/consts/colors';
import {NavigationEvents} from "react-navigation";
import StarRating from 'react-native-star-rating';
import { providerProduct , favorite , profile} from '../actions';

const isIOS = Platform.OS === 'ios';

class Provider extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
            activeType          : 0,
            isFav               : 0,
            refreshed           : false,
            active              : true,
            loader              : true
        }
    }

    componentWillMount() {
        this.props.providerProduct( this.props.lang , this.props.navigation.state.params.id , null);
    }

    onSubCategories ( id ){

        this.setState({spinner: true, active : id });
        this.props.providerProduct( this.props.lang , this.props.navigation.state.params.id ,id);

    }

    toggleFavorite (id){

        this.setState({ isFav: ! this.state.isFav, activeType : id });
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.favorite( this.props.lang, id  , token );

    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item , key) => {
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

    onFocus(){
        // this.componentDidMount();
        this.componentWillMount();
    }

    render() {

        const provider_info = this.props.provider;

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                        {this.props.navigation.state.params.name}
                    </Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                        <View style={[styles.viewBlock, styles.bg_White , styles.borderGray, styles.Width_90]}>
                            <Image style={[styles.Width_90, styles.swiper]} source={{ uri : provider_info.avatar }} resizeMode={'cover'}/>
                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                    <Text style={[styles.textBold, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                        {provider_info.details}
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
                                    <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                        {provider_info.name}
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
                                renderItem              = {({item}) => this.renderItems(item)}
                                numColumns              = {2}
                                keyExtractor            = {this._keyExtractor}
                                extraData               = {this.state.refreshed}
                                onEndReachedThreshold   = {isIOS ? .01 : 1}
                            />

                        </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang , providerProducts , favorite , profile}) => {
    return {
        lang                : lang.lang,
        products            : providerProducts.products,
        sub_categories      : providerProducts.subCategories,
        provider            : providerProducts.provider,
        isRefreshed         : providerProducts.isRefreshed,
        setfavorite         : favorite.favorite,
        user                : profile.user,
    };
};
export default connect(mapStateToProps, { providerProduct , favorite , profile })(Provider);