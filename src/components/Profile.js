import React, { Component } from "react";
import {View, Text, Image, ImageBackground , ScrollView , TouchableOpacity , FlatList , I18nManager} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title, Form, Item, Input} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import COLORS from '../../src/consts/colors'


class Profile extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
            username		    : 'اماني قاسم',
            phone	            : '012365478',
        }
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_black, styles.textSize_18]}>{ i18n.t('myAcc') }</Text> ) ,
        drawerIcon  : ( <Icon style={[styles.text_black , styles.textSize_20]} type="AntDesign" name="user" /> )
    });

    render() {

        return (
            <Container>
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                    <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>{i18n.t('myAcc')}</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                        <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('userName')}
                                    style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                    onChangeText            = {(username) => this.setState({username})}
                                    value                   = {this.state.username}
                                />
                            </Item>

                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('phone')}
                                    keyboardType            = {'number-pad'}
                                    style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                    onChangeText            = {(phone) => this.setState({phone})}
                                    value                   = {this.state.usernphoneame}
                                />
                            </Item>
                        </Form>
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
export default connect(mapStateToProps, {})(Profile);