import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import i18n from "../../locale/i18n";


class Notification extends Component {
    constructor(props){
        super(props);

        this.state={
            starCount: 3.5
        }
    }

    componentWillMount() {
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={styles.textLabel}>{ i18n.t('basket') }</Text> ) ,
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

	goNavigation(order_id){
        if (this.props.user.type == 'delegate'){
            this.props.navigation.navigate('delegateOrderDetails', { order_id })
        } else {

        }
    }

    onFocus(){
        this.componentWillMount();
    }

    render() {

        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            { i18n.t('noty') }
                        </Title>
                    </Body>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <TouchableOpacity onPress={() => this.goNavigation()} style={[styles.position_R, styles.flexCenter, styles.Width_90, styles.marginVertical_25, ]}>
                            <View style={[styles.lightOverlay, styles.Border]} />
                            <View style={[styles.Width_100, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                <View style={[styles.position_R]}>
                                    <View style={[styles.rowGroup]}>
                                        <Text style={[styles.textRegular , styles.text_black, styles.textSize_18]}>شعوذه الندم</Text>
                                    </View>
                                    <View style={[styles.overHidden, styles.rowGroup]}>
                                        <Text style={[styles.textRegular , styles.text_gray, styles.textSize_14]}>آهلا بك ابو الندم</Text>
                                        <Text style={[styles.textRegular , styles.text_red, styles.textSize_14]}>12/12/2019</Text>
                                    </View>
                                    <TouchableOpacity
                                        style           = {[styles.width_30 , styles.height_30 , styles.flexCenter, styles.bg_red, styles.borderLightOran, styles.position_A, styles.fixItem, styles.Radius_60]}
                                        onPress         = {() => this.delate()}
                                    >
                                        <Icon style     = {[styles.text_White, styles.textSize_16]} type="AntDesign" name='close' />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang, profile }) => {
    return {
        lang        : lang.lang,
        user        : profile.user
    };
};
export default connect(mapStateToProps, { })(Notification);
