import React, { Component } from "react";
import {View, Text, Image, ImageBackground , Share , TouchableOpacity , FlatList , I18nManager , ScrollView , Animated} from "react-native";
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
import { productDetails, favorite, addCart , addComment } from '../actions';

class Product extends Component {
    constructor(props){
        super(props);

        this.state={
            desc                    : '',
            starCount               : '',
            value                   : 1,
            value2                  : 1,
            status                  : null,
            isFav                   : 0,
            isHidden                : true,
            fading                  : false,
            isModalVisible          : false,
            bounceValue             : new Animated.Value(400),  //This is the initial position of the subview
        }
    }

    componentWillMount() {
        this.props.productDetails( this.props.lang , this.props.navigation.state.params.id);
        console.log('user =====', this.props.user);
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    _toggleSubview() {
        var toValue = 400;

        if(this.state.isHidden) {
            toValue = 0;
        }

        Animated.spring(
            this.state.bounceValue,
            {
                toValue: toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
            }
        ).start();

        // isHidden = !isHidden;

        this.setState({isHidden: !this.state.isHidden });

    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Chifz App',
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    increment(){
        this.setState({value: this.state.value + 1 })
    }

    decrement(){
        if (this.state.value > 1)
            this.setState({value: this.state.value - 1})
    }

    increment2(){
        if (this.state.value2 < 5)
            this.setState({value2: this.state.value2 + 1 })
    }

    decrement2(){
        if (this.state.value2 > 1)
            this.setState({value2: this.state.value2 - 1})
    }

    toggleFavorite (id){

        this.setState({ isFav: ! this.state.isFav });
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.favorite( this.props.lang, id  , token );

    }

    addToCart(id){

        const token =  this.props.user ?  this.props.user.token : null;
        this.props.addCart( this.props.lang, id  , token, this.state.value );

    }

    addComment(id){

        if (this.state.desc === ''){

            this.setState({fading : true});

        } else {

            const token =  this.props.user ?  this.props.user.token : null;
            this.props.addComment( this.props.lang, id  , token, this.state.desc, this.state.value2 );
            this.setState({
                isModalVisible          : !this.state.isModalVisible,
                desc                    : '',
                value2                  : 1,
            });

            this.props.productDetails( this.props.lang , this.props.navigation.state.params.id);

        }

    }


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <View style={[styles.notiBlock , styles.paddingHorizontal_10]}>
                <Image source={{ uri : item.avatar}} style={styles.restImg}/>
                <View style={[styles.directionColumn , {flex:1}]}>
                    <View style={[styles.directionRowSpace ]}>
                        <Text style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>
                            {item.user}
                        </Text>
                        <StarRating
                            disabled            = {true}
                            maxStars            = {5}
                            rating              = {item.rate}
                            fullStarColor       = {COLORS.orange}
                            starSize            = {15}
                            starStyle           = {styles.starStyle}
                        />
                    </View>
                    <View style={[styles.directionRowSpace]}>
                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_12, styles.textLeft , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>
                            {item.comment}
                        </Text>
                        <Text style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    onFocus(){
        this.componentDidMount();
    }

    render() {

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.navigate('provider')}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                        صفحة المنتج الواحد
                    </Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button  style={[styles.bg_light_oran, styles.Radius_0, styles.iconHeader, styles.flexCenter]} transparent onPress={() => this.onShare()}>
                            <Image style={[styles.ionImage]} source={require('../../assets/images/share.png')}/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <View style={styles.viewBlock}>
                            <Swiper
                                containerStyle      = {[styles.Width_95, styles.marginVertical_15, styles.swiper, styles.viewBlock]}
                                autoplay            = {true}
                                paginationStyle     = {{ alignSelf : "flex-end", paddingHorizontal : 30 , position:  'absolute',transform : [{ rotate: '90deg' }] , right : -330, zIndex: 999}}
                                dotStyle            = {{ backgroundColor: '#fff' }}
                                activeDotStyle      = {{ backgroundColor: '#F00', width: 20,}}
                                animated            = {true}
                                loop                = {true}
                                autoplayTimeout     = { 2 }
                            >

                                {
                                    this.props.images.map((img) => (

                                        <View style={[styles.viewBlock]}>
                                            <Image style={[styles.Width_95, styles.swiper]} source={{ uri : img.image}} resizeMode={'cover'}/>
                                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                                <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                                    <TouchableOpacity onPress = {() => this.toggleFavorite(this.props.products.id)}>
                                                        {
                                                            this.props.products.is_fav === 1 ?
                                                                <Icon style={[styles.text_orange , styles.textSize_20]} type="AntDesign" name='heart' />
                                                                :
                                                                <Icon style={[styles.text_orange , styles.textSize_20]} type="AntDesign" name='hearto' />
                                                        }
                                                    </TouchableOpacity>
                                                </View>
                                            </Animatable.View>
                                        </View>

                                    ))
                                }

                            </Swiper>
                        </View>

                        <View style={[ styles.Width_90, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter]}>
                            <View style={[styles.lightOverlay, styles.Border]}/>
                            <View style={[styles.Width_100, styles.overHidden, styles.bg_White, styles.Border,styles.bgFullWidth,styles.paddingHorizontal_7 , styles.paddingVertical_7]}>
                                <View style={[styles.overHidden]}>
                                    <View style={[styles.rowGroup]}>
                                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, ]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                            {this.props.products.name}
                                        </Text>
                                        <View style={{width:70}}>
                                            <StarRating
                                                disabled        = {true}
                                                maxStars        = {5}
                                                rating          = {this.props.products.rates}
                                                fullStarColor   = {COLORS.orange}
                                                starSize        = {15}
                                                starStyle       = {styles.starStyle}
                                            />
                                        </View>
                                    </View>
                                    <Text style={[styles.textRegular, styles.text_bold_gray, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                        {this.props.products.category} - {this.props.products.sub_category}
                                    </Text>
                                    <View style={[styles.directionRow]}>
                                        <View style={[styles.Width_93]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_14]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                                {i18n.t('productSpec')}
                                            </Text>
                                            <Text style={[styles.textRegular, styles.text_bold_gray, styles.textSize_12]} >
                                                {this.props.products.description}
                                            </Text>
                                        </View>
                                        <View style={styles.counterParent}>
                                            <TouchableOpacity onPress={() => this.increment()} style={styles.touchPlus}>
                                                <Icon type={'Entypo'} name={'plus'} style={styles.plus} />
                                            </TouchableOpacity>
                                            <View style={[styles.directionColumn , styles.countText ]}>
                                                <Text style={[styles.text_orange ,styles.textRegular, styles.textSize_14]}>
                                                    {this.state.value}
                                                </Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.decrement()} style={styles.touchMinus}>
                                                <Icon type={'Entypo'} name={'minus'} style={styles.minus} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[styles.rowGroup , styles.marginVertical_15]}>
                                        <View style={[styles.rowGroup]}>
                                            <Text style={[styles.textRegular, styles.text_bold_gray,styles.textSize_14, styles.textLeft ]} >
                                                {i18n.t('productPrice')}
                                            </Text>
                                            <Text style={[styles.textRegular, styles.text_black,styles.textSize_14, styles.textLeft ,{borderRightWidth:2 , borderRightColor:COLORS.orange , paddingRight:5 , marginLeft:5}]}>
                                                {this.props.products.price} {i18n.t('RS')}</Text>
                                        </View>
                                        <TouchableOpacity style={[styles.cartBtn]} onPress = {() => this.addToCart(this.props.products.id)}>
                                            <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft ]}>{i18n.t('addToCart')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/*<View style = {[styles.marginHorizontal_10,styles.Width_90, styles.SelfCenter, styles.marginVertical_15,]}>*/}
                        {/*    <View style={[styles.lightOverlay, styles.Border]}/>*/}
                        {/*    <View style={[styles.bg_White, styles.Border]}>*/}
                                {/*<View style={[styles.rowGroup,]}>*/}
                                {/*    <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , styles.marginVertical_10, styles.paddingHorizontal_10]}>*/}
                                {/*        {i18n.t('comments')}*/}
                                {/*        <Text style={[styles.textRegular, styles.text_bold_gray,styles.textSize_14]}>*/}
                                {/*            ( { this.props.products.comments_count } )*/}
                                {/*        </Text>*/}
                                {/*    </Text>*/}

                                {/*    {*/}
                                {/*        this.props.user ?*/}
                                {/*            <TouchableOpacity onPress={() => this.toggleModal()} style={[styles.rowGroup]}>*/}
                                {/*                <Text style={[styles.textRegular, styles.text_orange,styles.textSize_14 , {marginRight:5}]}>*/}
                                {/*                    {i18n.t('addComment')}*/}
                                {/*                </Text>*/}
                                {/*                <View style={[styles.touchPlus]}>*/}
                                {/*                    <Icon type={'Entypo'} name={'plus'} style={[styles.plus , styles.textSize_16]} />*/}
                                {/*                </View>*/}
                                {/*            </TouchableOpacity>*/}
                                {/*            :*/}
                                {/*            <View/>*/}
                                {/*    }*/}

                                {/*</View>*/}

                                {/*<Animated.View*/}
                                {/*    style={[styles.subView,styles.paddingHorizontal_7 , styles.paddingVertical_7, {transform: [{translateY: this.state.bounceValue}]}]}>*/}

                                {/*</Animated.View>*/}

                                {/*<View>*/}
                                {/*    <ScrollView showsHorizontalScrollIndicator={false}>*/}
                                {/*    <TouchableOpacity onPress={()=> {this._toggleSubview()}}>*/}
                                {/*        <FlatList*/}
                                {/*            data            = {this.props.comments}*/}
                                {/*            renderItem      = {({item}) => this.renderItems(item)}*/}
                                {/*            numColumns      = {1}*/}
                                {/*            keyExtractor    = {this._keyExtractor}*/}
                                {/*        />*/}
                                {/*    </TouchableOpacity>*/}
                                {/*    </ScrollView>*/}
                                {/*</View>*/}

                            {/*</View>*/}
                        {/*</View>*/}

                    </ImageBackground>
                </Content>

                <Animated.View style={[styles.subView, styles.SelfCenter, styles.Width_90, {transform: [{translateY: this.state.bounceValue}]}]}>
                    <View style={[styles.lightOverlay, styles.Border]}/>
                    <TouchableOpacity  onPress={()=> {this._toggleSubview()}} style={[styles.bg_White , styles.Border, styles.Width_100]}>
                        <View style={[styles.rowGroup,]}>
                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft, styles.marginVertical_10, styles.paddingHorizontal_10]}>
                                {i18n.t('comments')}
                                <Text style={[styles.textRegular, styles.text_bold_gray,styles.textSize_14]}>
                                    ( { this.props.products.comments_count } )
                                </Text>
                            </Text>
                            <TouchableOpacity onPress={()=> {this._toggleSubview()}} style={[styles.flexCenter, styles.width_40, styles.height_40, styles.Radius_30, styles.bg_orange, {top:-10, zIndex : 99}]}>
                                <Icon type={'AntDesign'} name={this.state.isHidden ? 'up' : 'down'} style={[ styles.text_White , styles.textSize_16, ]} />
                            </TouchableOpacity>

                            {
                                this.props.user ?
                                    <TouchableOpacity onPress={() => this.toggleModal()} style={[styles.rowGroup]}>
                                        <Text style={[styles.textRegular, styles.text_orange,styles.textSize_14 , {marginRight:5}]}>
                                            {i18n.t('addComment')}
                                        </Text>
                                        <View style={[styles.touchPlus]}>
                                            <Icon type={'Entypo'} name={'plus'} style={[styles.plus , styles.textSize_16]} />
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View/>
                            }

                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity onPress={()=> {this._toggleSubview()}}>
                                <FlatList
                                    data            = {this.props.comments}
                                    renderItem      = {({item}) => this.renderItems(item)}
                                    numColumns      = {1}
                                    keyExtractor    = {this._keyExtractor}
                                />
                            </TouchableOpacity>
                        </ScrollView>
                    </TouchableOpacity>

                </Animated.View>

                <Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal()}>
                    <View style={[styles.commentModal,{padding:15}]}>
                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>
                            {i18n.t('comment')}
                        </Text>
                        <View style={[styles.directionRow]}>
                            <View style={[styles.Width_93 , {marginTop:20}]}>

                                <View style={[styles.Width_100]}>
                                    <View style={[styles.lightOverlay, styles.Border]}/>
                                    <Textarea
                                        placeholder             = { i18n.t('comment') }
                                        placeholderTextColor    = {COLORS.bold_gray}
                                        autoCapitalize          = 'none'
                                        value                   = {this.state.desc}
                                        onChangeText            = {(desc) => this.setState({desc})}
                                        style                   = {[styles.textarea, styles.textRegular,styles.Width_100 , styles.overHidden, styles.bg_White, styles.Border,styles.paddingHorizontal_7 , styles.paddingVertical_7]}
                                    />
                                </View>
                                {
                                    this.state.fading === true ?
                                        <Text style={[styles.textRegular, styles.textCenter, styles.Width_100, styles.text_red, styles.marginVertical_10]}>
                                            { i18n.t('addcomm') }
                                        </Text>
                                        :
                                        <View/>
                                }

                            </View>

                            <View style={styles.counterParent}>
                                <TouchableOpacity onPress={() => this.increment2()} style={styles.touchPlus}>
                                    <Icon type={'Entypo'} name={'plus'} style={styles.plus} />
                                </TouchableOpacity>
                                <View style={[styles.directionColumn , styles.countText , {height:45} ]}>
                                    <Text style={[styles.text_orange ,styles.textRegular, styles.textSize_14]}>{this.state.value2}</Text>
                                    <Icon style={[styles.text_orange , styles.textSize_14]} type="AntDesign" name='star' />
                                </View>
                                <TouchableOpacity onPress={() => this.decrement2()} style={styles.touchMinus}>
                                    <Icon type={'Entypo'} name={'minus'} style={styles.minus} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.addComment(this.props.products.id)} style={[styles.cartBtn , styles.SelfCenter , {marginTop:20}]}>
                            <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft ]} >{i18n.t('addComment')}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , productsDetail, addComment, profile }) => {
    return {
        lang                : lang.lang,
        products            : productsDetail.products,
        images              : productsDetail.images,
        comments            : productsDetail.comments,
        addComments         : addComment.comment,
        user                : profile.user
    };
};
export default connect(mapStateToProps, { productDetails , favorite, addCart, addComment})(Product);