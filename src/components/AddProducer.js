import React, { Component } from "react";
import {View, Text, Image, ImageBackground , TouchableOpacity , KeyboardAvoidingView } from "react-native";
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
    Textarea,
    Picker
} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";


class AddProducer extends Component {
    constructor(props){
        super(props);

        this.state={
            username		    : '',
            phone	            : '',
            massge	            : '',
            Producer	        : null,
        }
    }

    onValueProducer      (value) {this.setState({Producer: value});}


    componentWillMount() {

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
                        <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            {i18n.t('addpro')}
                        </Title>
                    </Body>
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
                                            placeholder             = {i18n.translate('nameproducer')}
                                            style                   = {[ styles.input , styles.height_50 , styles.borderBlack, styles.paddingHorizontal_20]}
                                            onChangeText            = {(username) => this.setState({username})}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.viewPiker, styles.flexCenter,styles.marginVertical_15,styles.Width_100, styles.borderBlack]}>
                                    <Item style={styles.itemPiker} regular>
                                        <Picker
                                            mode                    = "dropdown"
                                            style                   = {styles.Picker}
                                            placeholderStyle        = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl', width : '100%', fontSize : 14 }]}
                                            selectedValue           = {this.state.producer}
                                            onValueChange           = {this.onValueProducer.bind(this)}
                                            textStyle               = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl', width : '100%', }]}
                                            placeholder             = {i18n.translate('producer')}
                                            itemTextStyle           = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl', width : '100%', }]}
                                        >
                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('producer')} value={null} />

                                        </Picker>
                                    </Item>
                                    <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('monyproducer')}
                                            style                   = {[ styles.input , styles.height_50 , styles.borderBlack, styles.paddingHorizontal_20]}
                                            onChangeText            = {(username) => this.setState({username})}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.translate('sallproducer')}
                                            style                   = {[ styles.input , styles.height_50 , styles.borderBlack, styles.paddingHorizontal_20]}
                                            onChangeText            = {(username) => this.setState({username})}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.flexCenter ]}>
                                    <Item style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Textarea
                                            auto-capitalization             = {false}
                                            rowSpan                         = {5}
                                            placeholder                     = {i18n.translate('massmtger')}
                                            style                           = {[ styles.textArea , styles.borderBlack, styles.paddingHorizontal_20]}
                                            onChangeText                    = {(massge) => this.setState({massge})}
                                        />
                                    </Item>
                                </View>

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
export default connect(mapStateToProps, {})(AddProducer);