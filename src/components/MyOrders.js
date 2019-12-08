import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import i18n from "../../locale/i18n";


class MyOrders extends Component {
    constructor(props){
        super(props);

        this.state={

        }
    }

    componentDidMount() {
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_black, styles.textSize_18]}>{ i18n.t('myorder') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/orders.png')}/>)
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

    // onFocus(){
    //     this.componentDidMount();
    // }

    render() {

        return (
            <Container>

                {/*<NavigationEvents onWillFocus={() => this.onFocus()} />*/}
                { this.renderLoader() }

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            { i18n.t('myorder') }
                        </Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <View style={[styles.rowGroup , styles.paddingHorizontal_15, styles.marginVertical_15, styles.overlay_white, styles.Border, styles.paddingVertical_10]}>
                            <TouchableOpacity>
                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_16,styles.ter]}>
                                    تحت التاكيد
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_16]}>
                                    تمت الموافقه
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_16]}>
                                     منفذه
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={[styles.textRegular, styles.text_black, styles.textSize_16]}>
                                    ملغاه
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={[styles.position_R, styles.flexCenter, styles.Width_90, styles.marginVertical_25]}>
                            <View style={[styles.lightOverlay, styles.Border]}></View>
                            <View style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                <View style={[styles.icImg, styles.flex_30]}>
                                    <Image style={[styles.icImg]} source={require('../../assets/images/bg_shope.png')}/>
                                </View>
                                <View style={[styles.flex_70]}>
                                    <View style={[styles.rowGroup]}>
                                        <Text style={[styles.textRegular , styles.text_black]}>مطاعم</Text>
                                    </View>
                                    <View style={[styles.overHidden]}>
                                        <Text style={[styles.textRegular , styles.text_gray, styles.Width_100, styles.textLeft]}>تصنيف القسم</Text>
                                    </View>
                                    <View style={[styles.overHidden, styles.rowGroup]}>
                                        <Text style={[styles.textRegular , styles.text_red,]}>30 ر.س</Text>
                                        <Text style={[styles.textRegular , styles.text_gray,]}>12/12/2019</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style = {[styles.width_40 , styles.height_40 , styles.flexCenter, styles.bg_light_oran, styles.borderLightOran, styles.marginVertical_5, styles.position_A, styles.top_5, styles.right_0]}>
                                    <Text style={[styles.textRegular , styles.text_red]}>12</Text>
                                </TouchableOpacity>
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
export default connect(mapStateToProps, { })(MyOrders);