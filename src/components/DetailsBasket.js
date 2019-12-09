import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground  , FlatList, Platform} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import i18n from "../../locale/i18n";
const isIOS = Platform.OS === 'ios';

class DetailsBasket extends Component {
    constructor(props){
        super(props);

        this.state={
            count       : 0
        }
    }

    incrementCount(){
        this.setState({count: this.state.count + 1});
    }

    DecrementCount(){
        this.setState({count: this.state.count - 1});
    }

    componentWillMount() {
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={styles.textLabel}>{ i18n.t('home') }</Text> ) ,
        drawerIcon  : ( <Icon style={styles.icon} type="SimpleLineIcons" name="home" /> )
    });

    renderLoader(){
        if (this.props.loader){
            return(
                <View style={[styles.loading, styles.flexCenter]}>
                    <DoubleBounce size={20} />
                </View>
            );
        }
    }


    render() {

        return (
            <Container>

                { this.renderLoader() }

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            { i18n.t('basket') }
                        </Title>
                    </Body>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <View style={[ styles.rowGroup , styles.marginVertical_15 , styles.paddingHorizontal_20]}>
                            <View style={[styles.position_R , styles.flex_45, styles.marginVertical_15, styles.height_200]}>
                                <View style={[styles.lightOverlay, styles.Border]}></View>
                                <View style={[styles.bg_White, styles.Border]}>
                                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                                        <View style={[styles.flex_80]}>
                                            <Image style={[styles.Width_90 , styles.height_100, styles.flexCenter]} source={require('../../assets/images/coffee_img.png')} resizeMode={'cover'}/>
                                        </View>
                                        <View style={[styles.flex_20, styles.flexCenter]}>
                                            <TouchableOpacity
                                                style           = {[styles.width_30 , styles.height_30 , styles.flexCenter, styles.bg_light_oran, styles.borderLightOran, styles.marginVertical_5]}
                                                onPress         = {() => this.incrementCount()}
                                            >
                                                <Icon style={[styles.text_red, styles.textSize_18]} type="AntDesign" name='plus' />
                                            </TouchableOpacity>
                                            <Text style={[styles.textRegular , styles.text_red,styles.width_30 , styles.height_30, styles.borderLightOran, styles.textCenter]}>
                                                {this.state.count}
                                            </Text>
                                            <TouchableOpacity
                                                style           = {[styles.width_30 , styles.height_30 , styles.flexCenter, styles.bg_light_oran, styles.borderLightOran, styles.marginVertical_5]}
                                                onPress         = {() => this.DecrementCount()}
                                            >
                                                <Icon style={[styles.text_red, styles.textSize_18]} type="AntDesign" name='minus' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5]}>
                                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            جزر المالديف
                                        </Text>
                                        <Text style={[styles.text_light_gray, styles.textSize_14, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            حليب - بندق
                                        </Text>
                                        <Text style={[styles.text_red, styles.textSize_14, styles.textRegular, styles.SelfLeft, styles.textLeft, styles.borderText, styles.paddingHorizontal_5]}>
                                            50 ر.س
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style           = {[styles.width_40 , styles.height_40 , styles.flexCenter, styles.bg_red, styles.borderLightOran, styles.marginVertical_5, styles.position_A, styles.iconRemove]}
                                        onPress         = {() => this.delate()}
                                    >
                                        <Icon style     = {[styles.text_White, styles.textSize_20]} type="AntDesign" name='close' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.position_R , styles.flex_45, styles.marginVertical_15, styles.height_200]}>
                                <View style={[styles.lightOverlay, styles.Border]}></View>
                                <View style={[styles.bg_White, styles.Border]}>
                                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                                        <View style={[styles.flex_80]}>
                                            <Image style={[styles.Width_90 , styles.height_100, styles.flexCenter]} source={require('../../assets/images/coffee_img.png')} resizeMode={'cover'}/>
                                        </View>
                                        <View style={[styles.flex_20, styles.flexCenter]}>
                                            <TouchableOpacity
                                                style           = {[styles.width_30 , styles.height_30 , styles.flexCenter, styles.bg_light_oran, styles.borderLightOran, styles.marginVertical_5]}
                                                onPress         = {() => this.incrementCount()}
                                            >
                                                <Icon style={[styles.text_red, styles.textSize_18]} type="AntDesign" name='plus' />
                                            </TouchableOpacity>
                                            <Text style={[styles.textRegular , styles.text_red,styles.width_30 , styles.height_30, styles.borderLightOran, styles.textCenter]}>
                                                {this.state.count}
                                            </Text>
                                            <TouchableOpacity
                                                style           = {[styles.width_30 , styles.height_30 , styles.flexCenter, styles.bg_light_oran, styles.borderLightOran, styles.marginVertical_5]}
                                                onPress         = {() => this.DecrementCount()}
                                            >
                                                <Icon style={[styles.text_red, styles.textSize_18]} type="AntDesign" name='minus' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5]}>
                                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            جزر المالديف
                                        </Text>
                                        <Text style={[styles.text_light_gray, styles.textSize_14, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            حليب - بندق
                                        </Text>
                                        <Text style={[styles.text_red, styles.textSize_14, styles.textRegular, styles.SelfLeft, styles.textLeft, styles.borderText, styles.paddingHorizontal_5]}>
                                            50 ر.س
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style           = {[styles.width_40 , styles.height_40 , styles.flexCenter, styles.bg_red, styles.borderLightOran, styles.marginVertical_5, styles.position_A, styles.iconRemove]}
                                        onPress         = {() => this.delate()}
                                    >
                                        <Icon style     = {[styles.text_White, styles.textSize_20]} type="AntDesign" name='close' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.position_R , styles.flex_45, styles.marginVertical_15, styles.height_200]}>
                                <View style={[styles.lightOverlay, styles.Border]}></View>
                                <View style={[styles.bg_White, styles.Border]}>
                                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                                        <View style={[styles.flex_80]}>
                                            <Image style={[styles.Width_90 , styles.height_100, styles.flexCenter]} source={require('../../assets/images/coffee_img.png')} resizeMode={'cover'}/>
                                        </View>
                                        <View style={[styles.flex_20, styles.flexCenter]}>
                                            <TouchableOpacity
                                                style           = {[styles.width_30 , styles.height_30 , styles.flexCenter, styles.bg_light_oran, styles.borderLightOran, styles.marginVertical_5]}
                                                onPress         = {() => this.incrementCount()}
                                            >
                                                <Icon style={[styles.text_red, styles.textSize_18]} type="AntDesign" name='plus' />
                                            </TouchableOpacity>
                                            <Text style={[styles.textRegular , styles.text_red,styles.width_30 , styles.height_30, styles.borderLightOran, styles.textCenter]}>
                                                {this.state.count}
                                            </Text>
                                            <TouchableOpacity
                                                style           = {[styles.width_30 , styles.height_30 , styles.flexCenter, styles.bg_light_oran, styles.borderLightOran, styles.marginVertical_5]}
                                                onPress         = {() => this.DecrementCount()}
                                            >
                                                <Icon style={[styles.text_red, styles.textSize_18]} type="AntDesign" name='minus' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5]}>
                                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            جزر المالديف
                                        </Text>
                                        <Text style={[styles.text_light_gray, styles.textSize_14, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            حليب - بندق
                                        </Text>
                                        <Text style={[styles.text_red, styles.textSize_14, styles.textRegular, styles.SelfLeft, styles.textLeft, styles.borderText, styles.paddingHorizontal_5]}>
                                            50 ر.س
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style           = {[styles.width_40 , styles.height_40 , styles.flexCenter, styles.bg_red, styles.borderLightOran, styles.marginVertical_5, styles.position_A, styles.iconRemove]}
                                        onPress         = {() => this.delate()}
                                    >
                                        <Icon style     = {[styles.text_White, styles.textSize_20]} type="AntDesign" name='close' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_10, styles.marginHorizontal_15]}>
                            <Text style={[styles.textBold, styles.text_black, styles.textSize_14]}>
                                { i18n.t('priceprod') }
                            </Text>
                            <Text style={[styles.textBold, styles.text_black, styles.textSize_14]}>300 ر.س</Text>
                        </View>

                        <View style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_10, styles.marginHorizontal_15]}>
                            <Text style={[styles.textBold, styles.text_black, styles.textSize_14]}>
                                { i18n.t('deliveryprice') }
                            </Text>
                            <Text style={[styles.textBold, styles.text_black, styles.textSize_14]}>300 ر.س</Text>
                        </View>

                        <View style={[styles.rowGroup, styles.bg_black, styles.Border, styles.paddingHorizontal_10, styles.paddingVertical_10, styles.marginVertical_10, styles.marginHorizontal_15]}>
                            <Text style={[styles.textBold, styles.text_White, styles.textSize_14]}>
                                { i18n.t('totalprice') }
                            </Text>
                            <Text style={[styles.textBold, styles.text_White, styles.textSize_14]}>300 ر.س</Text>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.bg_red,
                                styles.width_150,
                                styles.flexCenter,
                                styles.marginVertical_15,
                                styles.height_40
                            ]}
                            onPress={() => this.onLoginPressed()}>
                            <Text style={[styles.textBold , styles.textSize_16, styles.text_White]}>
                                {i18n.translate('confirm')}
                            </Text>
                        </TouchableOpacity>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang }) => {
    return {
        lang        : lang.lang,
    };
};
export default connect(mapStateToProps, { })(DetailsBasket);