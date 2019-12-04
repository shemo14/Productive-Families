import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, Animated, ScrollView, I18nManager, Platform} from "react-native";
import {Container, Content, Header, Button, Item, Input, Left, Icon, Body, Title, Right} from 'native-base'
import styles from '../../assets/style'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import i18n from "../../locale/i18n";
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';


class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            slider        : [],
            Categories    : [],
        }
    }

    componentWillMount() {

    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={styles.textLabel}>الرئيسيه</Text> ) ,
        drawerIcon  : ( <Icon style={styles.icon} type="SimpleLineIcons" name="home" /> )
    });

    renderLoader(){
        if (this.props.loader){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <DoubleBounce size={20} color={COLORS.labelBackground} />
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

				<NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="SimpleLineIcons" name='menu' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_darkGreen, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>الرئيسيه</Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button style={[styles.text_gray]} transparent>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="Ionicons" name='md-notifications-outline' />
                        </Button>
                        <Button style={[styles.text_gray]} transparent>
                            <Icon style={[styles.text_darkGreen, styles.textSize_22]} type="SimpleLineIcons" name='basket' />
                        </Button>
                    </Right>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/background.png')} style={[styles.bgFullWidth]}>

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
                                            <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head"> آهلا بك </Text>
                                            <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head"> الندم ف العمر عذاب ي بيبي </Text>
                                            <Text style={[styles.textRegular, styles.text_red, styles.Width_100 ,styles.textSize_12, styles.textLeft, styles.textDecoration]} numberOfLines = { 1 } prop with ellipsizeMode = "head"> مشاهده المزيد </Text>
                                        </View>
                                    </Animatable.View>
                                </View>
                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_90, styles.swiper]} source={require('../../assets/images/img_two.png')} resizeMode={'cover'}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head"> آهلا بك </Text>
                                            <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head"> الندم ف العمر عذاب ي بيبي </Text>
                                            <Text style={[styles.textRegular, styles.text_red, styles.Width_100 ,styles.textSize_12, styles.textLeft, styles.textDecoration]} numberOfLines = { 1 } prop with ellipsizeMode = "head"> مشاهده المزيد </Text>
                                        </View>
                                    </Animatable.View>
                                </View>
                                <View style={[styles.viewBlock]}>
                                    <Image style={[styles.Width_90, styles.swiper]} source={require('../../assets/images/img_three.png')} resizeMode={'cover'}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head"> آهلا بك </Text>
                                            <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head"> الندم ف العمر عذاب ي بيبي </Text>
                                            <Text style={[styles.textRegular, styles.text_red, styles.Width_100 ,styles.textSize_12, styles.textLeft, styles.textDecoration]} numberOfLines = { 1 } prop with ellipsizeMode = "head"> مشاهده المزيد </Text>
                                        </View>
                                    </Animatable.View>
                                </View>
                            </Swiper>
                        </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , sweet}) => {
    return {
        lang        : lang.lang,
    };
};
export default connect(mapStateToProps, {})(Home);