import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, AsyncStorage,} from "react-native";
import {Container, Content, Form, Item, Input, Button, Toast} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';


class NewPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            code                : '',
            password            : '',
            confirmpassword     : ''
        }
    }


    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.code.length <= 0) {
            isError = true;
            msg = i18n.t('phoneValidation');
        }else if (this.state.password.length <= 0 || this.state.password.length < 6){
            isError     = true;
            msg         = i18n.translate('passreq');
        }else if (this.state.password !== this.state.confirmpassword){
            isError     = true;
            msg         = i18n.translate('notmatch');
        }

        if (msg !== ''){
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        }
        return isError;
    };

    onLoginPressed() {
        const err = this.validate();
        if (!err){
            const {code , password , confirmpassword} = this.state;
            this.props.userLogin({ code , password , confirmpassword }, this.props.lang);
        }
    }


    onFocus(){
        this.componentWillMount()
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
                                        placeholder             = {i18n.t('code')}
                                        keyboardType            = {'number-pad'}
                                        style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                        onChangeText            = {(code) => this.setState({code})}
                                    />
                                </Item>

                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.t('newpass')}
                                        style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                        autoCapitalize          = 'none'
                                        onChangeText            = {(password) => this.setState({password})}
                                        secureTextEntry
                                    />
                                </Item>

                                <Item floatingLabel style={styles.item}>
                                    <Input
                                        placeholder             = {i18n.t('confirmpass')}
                                        style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                        autoCapitalize          = 'none'
                                        onChangeText            = {(confirmpassword) => this.setState({confirmpassword})}
                                        secureTextEntry
                                    />
                                </Item>

                                <TouchableOpacity
                                    style={[
                                        styles.bg_red,
                                        styles.width_150,
                                        styles.flexCenter,
                                        styles.marginVertical_15,
                                        styles.height_40
                                    ]}
                                    onPress={() => this.onLoginPressed()}>
                                    <Text style={[styles.textRegular , styles.textSize_14, styles.text_White]}>
                                        {i18n.translate('confirm')}
                                    </Text>
                                </TouchableOpacity>

                            </Form>
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
export default connect(mapStateToProps, {  })(NewPassword);