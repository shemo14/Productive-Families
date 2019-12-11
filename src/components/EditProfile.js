import React, { Component } from "react";
import {View, Text, Image, ImageBackground , ScrollView , TouchableOpacity , KeyboardAvoidingView , I18nManager} from "react-native";
import {
    Container,
    Content,
    Icon,
    Header,
    Left,
    Button,
    Body,
    Title,
    Form,
    Item,
    Input,
    Right,
    Textarea, Picker
} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import COLORS from '../../src/consts/colors'


class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
            username		    : '',
            phone	            : '',
            usernameStatus      : 0,
            phoneStatus         : 0,
            country             : null,
        }
    }

    onValueCountry      (value) {this.setState({country: value});}

    activeInput(type){
        if (type === 'username' || this.state.username !== ''){
            this.setState({ usernameStatus: 1 })
        }

        if (type === 'phone' || this.state.phone !== ''){
            this.setState({ phoneStatus: 1 })
        }

        if (type === 'password' || this.state.password !== ''){
            this.setState({ passwordStatus: 1 })
        }

        if (type === 'rePasswordStatus' || this.state.confirmpassword !== ''){
            this.setState({rePasswordStatus: 1})
        }
    }

    unActiveInput(type){
        if (type === 'username' && this.state.username === ''){
            this.setState({ usernameStatus: 0 })
        }

        if (type === 'phone' && this.state.phone === ''){
            this.setState({ phoneStatus: 0 })
        }

        if (type === 'password' && this.state.password === ''){
            this.setState({ passwordStatus: 0 })
        }

        if (type === 'rePasswordStatus' && this.state.confirmpassword === ''){
            this.setState({ rePasswordStatus: 0 })
        }

    }

    render() {

        return (
            <Container>
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.navigate('profile')}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>{i18n.t('editAcc')}</Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button  style={[styles.bg_light_oran, styles.Radius_0, styles.iconHeader, styles.flexCenter]} transparent onPress={() => this.props.navigation.navigate('profile')}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='close' />
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <View style={[styles.position_R, styles.Width_90, styles.marginVertical_15, styles.marginHorizontal_10, styles.SelfCenter,{right:20}]}>
                            <View style={[styles.blackOverlay, styles.Border , {top:10 , left:10}]}/>
                            <View style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White,styles.bgFullWidth]}>
                                <Image style={[styles.Width_100, styles.swiper]} source={require('../../assets/images/bg_coffee.png')} resizeMode={'cover'}/>
                                <View style={[styles.blackOverlay, {top:0 , left:0}]}/>
                                <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                    <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                        <TouchableOpacity>
                                            <Icon style={[styles.text_White , styles.textSize_20]} type="AntDesign" name='plus' />
                                        </TouchableOpacity>
                                    </View>
                                </Animatable.View>
                            </View>
                        </View>
                        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                            <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('userName')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.usernameStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(username) => this.setState({username})}
                                            onBlur                  = {() => this.unActiveInput('username')}
                                            onFocus                 = {() => this.activeInput('username')}
                                            value                   = {this.state.username}
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_light_oran, styles.flexCenter, styles.iconInput,  (this.state.usernameStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_orange, styles.textSize_22]} type="AntDesign" name='user' />
                                    </View>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('phone')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.phoneStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(phone) => this.setState({phone})}
                                            onBlur                  = {() => this.unActiveInput('phone')}
                                            onFocus                 = {() => this.activeInput('phone')}
                                            value                   = {this.state.phone}
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_light_oran, styles.flexCenter, styles.iconInput,  (this.state.phoneStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_orange, styles.textSize_22]} type="MaterialCommunityIcons" name='cellphone' />
                                    </View>
                                </View>

                                <View style={[styles.viewPiker, styles.flexCenter,styles.marginVertical_15,styles.Width_100, styles.borderBlack]}>
                                    <Item style={styles.itemPiker} regular>
                                        <Picker
                                            mode                    = "dropdown"
                                            style                   = {styles.Picker}
                                            placeholderStyle        = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl', width : '100%', fontSize : 14 }]}
                                            selectedValue           = {this.state.country}
                                            onValueChange           = {this.onValueCountry.bind(this)}
                                            textStyle               = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl', width : '100%', }]}
                                            placeholder             = {i18n.translate('city')}
                                            itemTextStyle           = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl', width : '100%', }]}
                                        >
                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('city')} value={null} />

                                        </Picker>
                                    </Item>
                                    <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                                </View>

                                <TouchableOpacity
                                    style           = {[styles.borderBold, styles.marginVertical_15, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_10]}
                                    onPress         = {() => this.props.navigation.navigate('MapLocation', {pageName : this.props.navigation.state.routeName})}
                                >
                                    <Text style={[styles.textRegular , styles.text_black,]}>
                                        {i18n.translate('map')}
                                    </Text>
                                    <View style={[styles.overHidden]}>
                                        <Icon style={[styles.text_black, styles.textSize_16]} type="Feather" name='map-pin' />
                                    </View>
                                </TouchableOpacity>
                            </Form>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')} style={[styles.cartBtn , styles.SelfCenter , {marginBottom:20}]}>
                                <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft ]} >{i18n.t('confirm')}</Text>
                            </TouchableOpacity>

                        </KeyboardAvoidingView>
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
export default connect(mapStateToProps, {})(EditProfile);