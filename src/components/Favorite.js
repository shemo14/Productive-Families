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

class Favorite extends Component {
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
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_black, styles.textSize_18]}>{ i18n.t('fav') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/fav.png')}/>)
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
                            { i18n.t('fav') }
                        </Title>
                    </Body>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <View style={[ styles.rowGroup , styles.marginVertical_15 , styles.paddingHorizontal_20]}>
                            <TouchableOpacity style={[styles.position_R , styles.flex_45, styles.marginVertical_15, styles.height_200]}>
                                <View style={[styles.lightOverlay, styles.Border]}></View>
                                <View style={[styles.bg_White, styles.Border]}>
                                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                                        <View style={[styles.flex_100, styles.position_R]}>
                                            <Image style={[styles.Width_100 , styles.height_100, styles.flexCenter]} source={require('../../assets/images/coffee_img.png')} resizeMode={'cover'}/>
                                        </View>
                                    </View>
                                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5]}>
                                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            جزر المالديف
                                        </Text>
                                        <Text style={[styles.text_light_gray, styles.textSize_14, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            حليب - بندق
                                        </Text>
                                        <View style={[styles.rowGroup]}>
                                            <Text style={[styles.text_red, styles.textSize_14, styles.textRegular,styles.textLeft, styles.borderText]}>
                                                50 ر.س
                                            </Text>
                                            <TouchableOpacity>
                                                <Text><Icon style={[styles.text_red, styles.textSize_22]} type="AntDesign" name='heart' /></Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.position_R , styles.flex_45, styles.marginVertical_15, styles.height_200]}>
                                <View style={[styles.lightOverlay, styles.Border]}></View>
                                <View style={[styles.bg_White, styles.Border]}>
                                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                                        <View style={[styles.flex_100, styles.position_R]}>
                                            <Image style={[styles.Width_100 , styles.height_100, styles.flexCenter]} source={require('../../assets/images/coffee_img.png')} resizeMode={'cover'}/>
                                        </View>
                                    </View>
                                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5]}>
                                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            جزر المالديف
                                        </Text>
                                        <Text style={[styles.text_light_gray, styles.textSize_14, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            حليب - بندق
                                        </Text>
                                        <View style={[styles.rowGroup]}>
                                            <Text style={[styles.text_red, styles.textSize_14, styles.textRegular,styles.textLeft, styles.borderText]}>
                                                50 ر.س
                                            </Text>
                                            <TouchableOpacity>
                                                <Text><Icon style={[styles.text_red, styles.textSize_22]} type="AntDesign" name='heart' /></Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.position_R , styles.flex_45, styles.marginVertical_15, styles.height_200]}>
                                <View style={[styles.lightOverlay, styles.Border]}></View>
                                <View style={[styles.bg_White, styles.Border]}>
                                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                                        <View style={[styles.flex_100, styles.position_R]}>
                                            <Image style={[styles.Width_100 , styles.height_100, styles.flexCenter]} source={require('../../assets/images/coffee_img.png')} resizeMode={'cover'}/>
                                        </View>
                                    </View>
                                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5]}>
                                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            جزر المالديف
                                        </Text>
                                        <Text style={[styles.text_light_gray, styles.textSize_14, styles.textRegular, styles.Width_100, styles.textLeft]}>
                                            حليب - بندق
                                        </Text>
                                        <View style={[styles.rowGroup]}>
                                            <Text style={[styles.text_red, styles.textSize_14, styles.textRegular,styles.textLeft, styles.borderText]}>
                                                50 ر.س
                                            </Text>
                                            <TouchableOpacity>
                                                <Text><Icon style={[styles.text_red, styles.textSize_22]} type="AntDesign" name='heart' /></Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

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
export default connect(mapStateToProps, { })(Favorite);