import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground,} from "react-native";
import {Container, Content, Form, Item, Input, Toast, CheckBox, Picker, Icon} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {NavigationEvents} from "react-navigation";


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
            latitude            : '',
            longitude           : '',
            city_name           : '',
            type		        : 0,
            usernameStatus      : 0,
            phoneStatus         : 0,
            passwordStatus      : 0,
            rePasswordStatus    : 0,
            userId		        : null,
            country	            : null,
            chooseUser	        : null,
            checked             : false,
        }
    }

    componentWillMount() {

        if(this.props.navigation.getParam('latitude') || this.props.navigation.getParam('longitude')){
            this.state.city_name            =  this.props.navigation.getParam('city_name');
            this.setState({latitude   : this.props.navigation.getParam('latitude')});
            this.setState({longitude  : this.props.navigation.getParam('longitude')});
        }else{
            this.setState({city_name  : i18n.t('mapname')});
        }

    }

    onFocus(){
        this.componentDidMount();
    }

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

    onValueUser         (value) {this.setState({chooseUser: value});}

    onValueCountry      (value) {this.setState({country: value});}


    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.username.length <= 0 || this.state.username.length < 4) {
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

                { this.renderLoader() }
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

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('userName')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.usernameStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(username) => this.setState({username})}
                                            onBlur                  = {() => this.unActiveInput('username')}
                                            onFocus                 = {() => this.activeInput('username')}
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput,  (this.state.usernameStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
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
                                            keyboardType            = {'number-pad'}
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput,  (this.state.phoneStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_orange, styles.textSize_22]} type="MaterialCommunityIcons" name='cellphone' />
                                    </View>
                                </View>

                                <View style={[styles.viewPiker, styles.flexCenter,styles.marginVertical_15,styles.Width_100, styles.borderBlack]}>
                                    <Item style={styles.itemPiker} regular>
                                        <Picker
                                            mode                    = "dropdown"
                                            style                   = {styles.Picker}
                                            placeholderStyle        = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl', width : '100%', fontSize : 14 }]}
                                            selectedValue           = {this.state.chooseUser}
                                            onValueChange           = {this.onValueUser.bind(this)}
                                            textStyle               = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl' }]}
                                            placeholder             = {i18n.t('viewgest')}
                                            itemTextStyle           = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl' }]}
                                        >

                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('viewgest')} value={null} />

                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('user')} value="user" />
                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('provider')} value="provider" />
                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('gest')} value="gest" />

                                        </Picker>
                                    </Item>
                                    <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                                </View>

                                <View style={[styles.viewPiker, styles.flexCenter,styles.marginVertical_15,styles.Width_100, styles.borderBlack]}>
                                    <Item style={styles.itemPiker} regular>
                                        <Picker
                                            mode                    = "dropdown"
                                            style                   = {styles.Picker}
                                            placeholderStyle        = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl', width : '100%', fontSize : 14 }]}
                                            selectedValue           = {this.state.country}
                                            onValueChange           = {this.onValueCountry.bind(this)}
                                            textStyle               = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl', width : '100%', }]}
                                            placeholder             = {i18n.translate('city')}
                                            itemTextStyle           = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl', width : '100%', }]}
                                        >
                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('city')} value={null} />

                                        </Picker>
                                    </Item>
                                    <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                                </View>

                                <TouchableOpacity
                                    style           = {[styles.borderBold, styles.marginVertical_15, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_10]}
                                    onPress={() => this.props.navigation.navigate('MapLocation', {pageName : this.props.navigation.state.routeName})}
                                >
                                    <Text style={[styles.textRegular , styles.text_black, styles.width_150]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                        { this.state.city_name }
                                    </Text>
                                    <View style={[styles.overHidden]}>
                                        <Icon style={[styles.text_black, styles.textSize_16]} type="Feather" name='map-pin' />
                                    </View>
                                </TouchableOpacity>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('password')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.passwordStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(password) => this.setState({password})}
                                            onBlur                  = {() => this.unActiveInput('password')}
                                            onFocus                 = {() => this.activeInput('password')}
                                            secureTextEntry
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput,  (this.state.passwordStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_orange, styles.textSize_22]} type="AntDesign" name='lock1' />
                                    </View>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('password')}
                                            style                   = {[ styles.input , styles.height_50 , (this.state.rePasswordStatus === 1 ? styles.Active : styles.noActive )]}
                                            onChangeText            = {(confirmpassword) => this.setState({confirmpassword})}
                                            onBlur                  = {() => this.unActiveInput('rePasswordStatus')}
                                            onFocus                 = {() => this.activeInput('rePasswordStatus')}
                                            secureTextEntry
                                        />
                                    </Item>
                                    <View style = {[ styles.position_A , styles.bg_White, styles.flexCenter, styles.iconInput,  (this.state.rePasswordStatus === 1 ? styles.left_0 : styles.leftHidLeft )]}>
                                        <Icon style = {[styles.text_orange, styles.textSize_22]} type="AntDesign" name='lock1' />
                                    </View>
                                </View>

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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}
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