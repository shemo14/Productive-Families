import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Linking} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title, Right} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import i18n from "../../locale/i18n";


class Basket extends Component {
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

                        <TouchableOpacity style={[styles.position_R, styles.flexCenter, styles.Width_90, styles.marginVertical_25]}>
                            <View style={[styles.lightOverlay, styles.Border]}></View>
                            <View style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                <View style={[styles.icImg, styles.flex_30]}>
                                    <Image style={[styles.icImg]} source={require('../../assets/images/bg_shope.png')} resizeMode={'cover'}/>
                                </View>
                                <View style={[styles.flex_70]}>
                                    <View style={[styles.rowGroup]}>
                                        <Text style={[styles.textRegular , styles.text_black]}>مطاعم</Text>
                                    </View>
                                    <View style={[styles.overHidden]}>
                                        <Text style={[styles.textRegular , styles.text_gray, styles.Width_100, styles.textLeft]}>تصنيف القسم</Text>
                                    </View>
                                    <View style={[styles.overHidden, styles.rowRight]}>
                                        <Icon style={[styles.text_gray, styles.textSize_14]} type="Feather" name='map-pin' />
                                        <Text style={[styles.textRegular , styles.text_gray, styles.marginHorizontal_5]}>تصنيف القسم</Text>
                                    </View>
                                </View>
                            </View>
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
export default connect(mapStateToProps, { })(Basket);