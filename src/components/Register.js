import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, AsyncStorage,} from "react-native";
import {Container, Content, Form, Item, Input, Button, Toast, CheckBox, Picker, Icon} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username		    : '',
            phone	            : '',
            mapsite	            : '',
            password	        : '',
            confirmpassword	    : '',
            deviceId	        : '',
            userId		        : null,
            country	            : null,
            chooseUser	        : null,
            checked             : false,
            type		        : 0,
        }
    }


    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.phone.username <= 0 || this.state.username.length < 4) {
            isError     = true;
            msg         = i18n.translate('Full');
        }else if (this.state.phone.length <= 0){
            isError     = true;
            msg         = i18n.translate('namereq');
        }else if(this.state.phone.length < 10){
            isError     = true;
            msg         = i18n.translate('aggnumber');
        }else if (this.state.chooseUser === null){
            isError     = true;
            msg         = i18n.translate('chooseuser');
        }else if (this.state.country === null){
            isError     = true;
            msg         = i18n.translate('choosecity');
        }else if (this.state.password.length <= 0 || this.state.password.length < 6){
            isError     = true;
            msg         = i18n.translate('passreq');
        }else if (this.state.password !== this.state.confirmpassword){
            isError     = true;
            msg         = i18n.translate('notmatch');
        }else if (this.state.checked === false){
            isError     = true;
            msg         = i18n.translate('aggreTerms');
        }

        if (msg !== ''){
            Toast.show({
                text          : msg,
                duration      : 2000,
                type          : "danger",
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        }
        return isError;
    };

    onRegisterPressed() {

        this.setState({ spinner: true });

        const err = this.validate();

        if (!err){

            this.setState({ spinner: false });

            const { fullName, email, phone, password, NationalNnm } = this.state;
            const data = {fullName, email, phone, password, NationalNnm, lang: this.props.lang,};

            this.props.register(data, this.props);
        }else {

            this.setState({ spinner: false });

        }
    }

    render() {
        return (

            <Container>
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <Content contentContainerStyle={styles.bgFullWidth}>
                    <ImageBackground source={require('../../assets/images/background.png')} style={[styles.bgFullWidth]}>
                        <View style={[styles.position_R, styles.bgFullWidth, styles.marginVertical_15, styles.SelfCenter, styles.Width_100]}>
                            <Animatable.View animation="fadeInDown" easing="ease-out" delay={500} style={[styles.flexCenter]}>
                                <View style={[styles.overHidden, styles.marginVertical_15]}>
                                    <Image style={[styles.icoImage]} source={require('../../assets/images/logo.png')}/>
                                </View>
                            </Animatable.View>
                            <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('userName')}
                                        style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                        onChangeText            = {(phone) => this.setState({phone})}
                                    />
                                </Item>

                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('phone')}
                                        keyboardType            = {'number-pad'}
                                        style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                        onChangeText            = {(phone) => this.setState({phone})}
                                    />
                                </Item>

                                <View style={[styles.viewPiker, styles.flexCenter,styles.marginVertical_15,styles.Width_100, styles.borderBold]}>
                                    <Item style={styles.itemPiker} regular>
                                        <Picker
                                            mode                    = "dropdown"
                                            style                   = {styles.Picker}
                                            placeholderStyle        = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl', width : '100%', fontSize : 14 }]}
                                            selectedValue           = {this.state.chooseUser}
                                            onValueChange           = {this.onChooseUser.bind(this)}
                                            textStyle               = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl' }]}
                                            placeholder             = {i18n.t('viewgest')}
                                            itemTextStyle           = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl' }]}
                                        >

                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('viewgest')} value={null} />

                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('user')} value="user" />
                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('provider')} value="provider" />
                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('gest')} value="gest" />

                                        </Picker>
                                    </Item>
                                    <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                                </View>

                                <View style={[styles.viewPiker, styles.flexCenter,styles.marginVertical_15,styles.Width_100, styles.borderBold]}>
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

                                <TouchableOpacity style={[styles.borderBold, styles.marginVertical_15, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_10]}>
                                    <Text style={[styles.textRegular , styles.text_black,]}>
                                        {i18n.translate('map')}
                                    </Text>
                                    <View style={[styles.overHidden]}>
                                        <Icon style={[styles.text_black, styles.textSize_16]} type="Feather" name='map-pin' />
                                    </View>
                                </TouchableOpacity>

                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('password')}
                                        style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                        autoCapitalize          = 'none'
                                        onChangeText            = {(password) => this.setState({password})}
                                        secureTextEntry
                                    />
                                </Item>

                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.translate('confirmPassword')}
                                        style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                        autoCapitalize          = 'none'
                                        onChangeText            = {(confirmpassword) => this.setState({confirmpassword})}
                                        secureTextEntry
                                    />
                                </Item>

                                <View style={[styles.rowRight, styles.marginVertical_20]}>
                                    <TouchableOpacity style = {[styles.rowRight, styles.marginVertical_10]}>
                                        <CheckBox
                                            style                   = {[styles.checkBox, styles.Border, styles.bg_red]}
                                            color                   = {styles.text_gray}
                                            selectedColor           = {styles.text_White}
                                            onPress                 = {() => this.setState({ checked: !this.state.checked })}
                                            checked                 = {this.state.checked}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms')}>
                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_16, styles.paddingHorizontal_15, styles.textDecoration]}>
                                            {i18n.translate('agreTe')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.bg_red,
                                        styles.width_150,
                                        styles.flexCenter,
                                        styles.marginVertical_15,
                                        styles.height_40
                                    ]}
                                    onPress={() => this.onRegisterPressed()}>
                                    <Text style={[styles.textRegular , styles.textSize_14, styles.text_White]}>
                                        {i18n.translate('doHaveAcc')}
                                    </Text>
                                </TouchableOpacity>

                            </Form>

                            <View style={[styles.bg_lightWhite, styles.SelfLeft, styles.paddingHorizontal_10, styles.height_100, styles.centerContext, styles.marginVertical_25]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}
                                                  style={[styles.bg_light_oran, styles.paddingHorizontal_10, styles.height_40, styles.centerContext]}>
                                    <Text style={[styles.textRegular, styles.textSize_14, styles.text_red]}>
                                        {i18n.translate('login')}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ImageBackground>
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = ({ lang }) => {
    return {
        lang		: lang.lang
    };
};
export default connect(mapStateToProps, {  })(Register);