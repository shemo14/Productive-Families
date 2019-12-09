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

var isHidden = true;
const comments=[
    {id:1 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:2 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:3 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:4 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:1 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:2 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:3 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:4 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:1 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:2 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:3 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:4 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:1 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:2 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
    {id:3 , name:'اماني قاسم', location:'نص التعليق نص التعليق', image:require('../../assets/images/img_product.png')},
]
class Product extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
            isFav               : false,
            desc                : '',
            starCount           : 3,
            comments,
            value               :1,
            value2               :1,
            isModalVisible: false,
            bounceValue         : new Animated.Value(400),  //This is the initial position of the subview

        }
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <View style={[styles.notiBlock]}>
                <Image source={item.image} resizeMode={'cover'} style={styles.restImg}/>
                <View style={[styles.directionColumn , {flex:1}]}>
                    <View style={[styles.directionRowSpace ]}>
                        <Text style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{item.name}</Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={this.state.starCount}
                            fullStarColor={COLORS.orange}
                            starSize={15}
                            starStyle={styles.starStyle}
                        />
                    </View>
                    <View style={[styles.directionRowSpace]}>
                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_12, styles.textLeft , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{item.location}</Text>
                        <Text style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>3:00</Text>
                    </View>
                </View>
            </View>
        );
    }


    _toggleSubview() {
        var toValue = 400;

        if(isHidden) {
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

        isHidden = !isHidden;
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

    render() {

        return (
            <Container>
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.navigate('provider')}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>صفحة المنتج الواحد</Title>
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
                                containerStyle      = {[styles.Width_90, styles.marginVertical_15, styles.swiper, styles.viewBlock]}
                                autoplay            = {true}
                                paginationStyle     = {{ alignSelf : "flex-end", paddingHorizontal : 30 , position:  'absolute',transform : [{ rotate: '90deg' }] , right : -330, zIndex: 999}}
                                dotStyle            = {{ backgroundColor: '#fff' }}
                                activeDotStyle      = {{ backgroundColor: '#F00', width: 20,}}
                                animated            = {true}
                                loop                = {true}
                                autoplayTimeout     = { 2 }
                            >
                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_90, styles.swiper]} source={require('../../assets/images/img_product.png')} resizeMode={'cover'}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <TouchableOpacity onPress={() => this.setState({isFav:!this.state.isFav })}>
                                                {
                                                    this.state.isFav?
                                                        <Icon style={[styles.text_orange , styles.textSize_20]} type="AntDesign" name='heart' />
                                                        :
                                                        <Icon style={[styles.text_White , styles.textSize_20]} type="AntDesign" name='hearto' />
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </Animatable.View>
                                </View>
                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_90, styles.swiper]} source={require('../../assets/images/img_two.png')} resizeMode={'cover'}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <TouchableOpacity onPress={() => this.setState({isFav:!this.state.isFav })}>
                                                {
                                                    this.state.isFav?
                                                        <Icon style={[styles.text_orange , styles.textSize_20]} type="AntDesign" name='heart' />
                                                        :
                                                        <Icon style={[styles.text_White , styles.textSize_20]} type="AntDesign" name='hearto' />
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </Animatable.View>
                                </View>
                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_90, styles.swiper]} source={require('../../assets/images/img_three.png')} resizeMode={'cover'}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <TouchableOpacity onPress={() => this.setState({isFav:!this.state.isFav })}>
                                                {
                                                    this.state.isFav?
                                                        <Icon style={[styles.text_orange , styles.textSize_20]} type="AntDesign" name='heart' />
                                                        :
                                                        <Icon style={[styles.text_White , styles.textSize_20]} type="AntDesign" name='hearto' />
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </Animatable.View>
                                </View>
                            </Swiper>
                        </View>

                        <View style={[ styles.Width_95, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter , {marginBottom:120}]}>
                            <View style={[styles.lightOverlay, styles.Border]}></View>
                            <View style={[styles.Width_100, styles.overHidden, styles.bg_White, styles.Border,styles.bgFullWidth,styles.paddingHorizontal_7 , styles.paddingVertical_7]}>
                                <View style={[styles.overHidden]}>
                                    <View style={[styles.rowGroup]}>
                                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">قهوة فرنسية</Text>
                                        <View style={{width:70}}>
                                            <StarRating
                                                disabled={true}
                                                maxStars={5}
                                                rating={this.state.starCount}
                                                fullStarColor={COLORS.orange}
                                                starSize={15}
                                                starStyle={styles.starStyle}
                                            />
                                        </View>
                                    </View>
                                    <Text style={[styles.textRegular, styles.text_bold_gray, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">حليب - بن - بندق</Text>
                                    <View style={[styles.directionRow]}>
                                        <View style={[styles.Width_93]}>
                                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_14]} numberOfLines = { 1 } prop with ellipsizeMode = "head">{i18n.t('productSpec')}</Text>
                                            <Text style={[styles.textRegular, styles.text_bold_gray, styles.textSize_12]} >قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية قهوة فرنسية </Text>
                                        </View>
                                        <View style={styles.counterParent}>
                                            <TouchableOpacity onPress={() => this.increment()} style={styles.touchPlus}>
                                                <Icon type={'Entypo'} name={'plus'} style={styles.plus} />
                                            </TouchableOpacity>
                                            <View style={[styles.directionColumn , styles.countText ]}>
                                                <Text style={[styles.text_orange ,styles.textRegular, styles.textSize_14]}>{this.state.value}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.decrement()} style={styles.touchMinus}>
                                                <Icon type={'Entypo'} name={'minus'} style={styles.minus} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[styles.rowGroup , styles.marginVertical_15]}>
                                        <View style={[styles.rowGroup]}>
                                            <Text style={[styles.textRegular, styles.text_bold_gray,styles.textSize_14, styles.textLeft ]} >{i18n.t('productPrice')}</Text>
                                            <Text style={[styles.textRegular, styles.text_black,styles.textSize_14, styles.textLeft ,{borderRightWidth:2 , borderRightColor:COLORS.orange , paddingRight:5 , marginLeft:5}]}>20 {i18n.t('RS')}</Text>
                                        </View>
                                        <TouchableOpacity style={[styles.cartBtn]}>
                                            <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft ]} >{i18n.t('addToCart')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>


                    </ImageBackground>
                </Content>

                <Animated.View
                    style={[styles.subView,styles.paddingHorizontal_7 , styles.paddingVertical_7,
                        {transform: [{translateY: this.state.bounceValue}]}]}
                >
                    <View style={[styles.lightOverlay, styles.Border, {zIndex:-1}]}/>
                    <View style={[styles.bg_White , {height:'100%'}]}>
                        <View style={[styles.rowGroup, {marginBottom:0} ]}>
                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>
                                {i18n.t('comments')} <Text style={[styles.textRegular, styles.text_bold_gray,styles.textSize_14]}>(55)</Text>
                            </Text>
                            <TouchableOpacity onPress={() => this.toggleModal()} style={[styles.rowGroup]}>
                                <Text style={[styles.textRegular, styles.text_orange,styles.textSize_14 , {marginRight:5}]}>{i18n.t('addComment')}</Text>
                                <View style={[styles.touchPlus, { height:30,
                                    width:30,}]}>
                                    <Icon type={'Entypo'} name={'plus'} style={[styles.plus , styles.textSize_16]} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity onPress={()=> {this._toggleSubview()}}>
                                <FlatList
                                    data={this.state.comments}
                                    renderItem={({item}) => this.renderItems(item)}
                                    numColumns={1}
                                    keyExtractor={this._keyExtractor}
                                />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                </Animated.View>
                <Modal style={{}} isVisible={this.state.isModalVisible} onBackdropPress={() => this.toggleModal()}>
                    <View style={[styles.commentModal,{padding:15 , height:250}]}>
                        <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft]}>
                            {i18n.t('comment')}
                        </Text>
                        <View style={[styles.directionRow]}>
                            <View style={[styles.Width_93 , {marginTop:20}]}>
                                <View style={[styles.lightOverlay, styles.Border]}/>
                                <Textarea placeholder={ i18n.t('comment') } placeholderTextColor={COLORS.bold_gray} autoCapitalize='none' value={this.state.desc} onChangeText={(desc) => this.setState({desc})}
                                          style={[styles.textarea, styles.textRegular,styles.Width_100 , styles.overHidden, styles.bg_White, styles.Border,styles.paddingHorizontal_7 , styles.paddingVertical_7]}  />
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
                        <TouchableOpacity onPress={() => this.toggleModal()} style={[styles.cartBtn , styles.SelfCenter , {marginTop:20}]}>
                            <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft ]} >{i18n.t('addComment')}</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang }) => {
    return {
        lang        : lang.lang,
    };
};
export default connect(mapStateToProps, {})(Product);