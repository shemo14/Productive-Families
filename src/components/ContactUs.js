import React, { Component } from "react";
import {View, Text, Image, ImageBackground} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import { getContactUs } from '../actions'
import * as Animatable from 'react-native-animatable';

class ContactUs extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
        }
    }


    componentWillMount() {
        this.props.getContactUs( this.props.lang )
    }

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
                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>{ i18n.t('about') }</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                        <View style={[styles.Border, styles.marginVertical_10, styles.rowGroup]}>
                            <View style={[styles.bg_turquoise, styles.iconImg]}>
                                <Icon style={[styles.text_black, styles.textSize_22]} type="Feather" name='user' />
                            </View>
                            <Text style={[styles.textRegular , styles.text_black, styles.textCenter, styles.Width_100, styles.marginVertical_15]}>
                                { this.props.name }
                            </Text>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , contactUs }) => {
    return {
        lang        : lang.lang,
        name        : contactUs.name,
        phone       : contactUs.phone,
        address     : contactUs.address,
        socials     : contactUs.socials,
        loader      : contactUs.loader
    };
};
export default connect(mapStateToProps, {getContactUs})(ContactUs);