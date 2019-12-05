import React, { Component } from "react";
import {View, Text, Image, ImageBackground , ScrollView , TouchableOpacity , FlatList , I18nManager} from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title } from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import COLORS from '../../src/consts/colors'

const notifications=[
    {id:1 , name:'اماني قاسم', location:'نص التعليق نص التعليق'},
    {id:2 , name:'اماني قاسم', location:'نص التعليق نص التعليق'},
    {id:3 , name:'اماني قاسم', location:'نص التعليق نص التعليق'},
    {id:4 , name:'اماني قاسم', location:'نص التعليق نص التعليق'},
    {id:5 , name:'اماني قاسم', location:'نص التعليق نص التعليق'},
]
class Notifications extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
            starCount           : 3,
            activeType          : 0,
            isFav               : false,
            refreshed           : false,
            notifications,
        }
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item , index) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('product')} style={[styles.position_R, styles.Width_95, {marginTop:15}, styles.marginHorizontal_10, styles.SelfCenter]}>
                <View style={[styles.lightOverlay, styles.Border]}></View>
                <View style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White,styles.bgFullWidth,styles.paddingHorizontal_7 , styles.paddingVertical_7
                , { borderWidth: 1, borderTopColor : COLORS.lightWhite ,borderBottomColor : COLORS.lightWhite ,borderRightColor : COLORS.lightWhite , borderLeftWidth:5 ,
                        borderLeftColor: item.index % 2 === 0 ? COLORS.orange : COLORS.black}]}>
                    <View style={[styles.directionColumn , {flex:1}]}>
                        <View style={[styles.directionRow ]}>
                            <Text style={[styles.textRegular, styles.text_black, styles.textSize_14, styles.textLeft , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{item.item.name}</Text>
                        </View>
                        <View style={[styles.directionRowSpace]}>
                            <Text style={[styles.textRegular, styles.text_bold_gray, styles.textSize_12, styles.textLeft , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{item.item.location}</Text>
                            <Text style={[styles.textRegular, styles.text_bold_gray, styles.textSize_14, styles.textLeft , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>3:00</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

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
                    <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>{i18n.t('Notifications')}</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>
                       <View style={[styles.paddingHorizontal_10]}>
                           <FlatList
                               data={this.state.notifications}
                               renderItem={(item) => this.renderItems(item)}
                               numColumns={1}
                               keyExtractor={this._keyExtractor}
                           />
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
export default connect(mapStateToProps, {})(Notifications);