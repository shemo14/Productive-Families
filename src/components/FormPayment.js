import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Left,
    Icon,
    Body,
    Title,
    Item,
    Input,
    Picker,
    CheckBox,
    Form
} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import i18n from "../../locale/i18n";
import * as Animatable from "react-native-animatable";

class FormPayment extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }

    componentWillMount() {
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

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={styles.leftIcon}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            { i18n.t('pay') }
                        </Title>
                    </Body>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <View style={[styles.overHidden]}>
                            <Animatable.View animation="fadeInUp" easing="ease-out" delay={500} style={[styles.flexCenter]}>
                            <Image
                                style       = {[styles.upImage , styles.flexCenter]}
                                source      = {require('../../assets/images/payment.png')}
                            />
                            </Animatable.View>
                        </View>

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

                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('userName')}
                                    style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                    onChangeText            = {(phone) => this.setState({phone})}
                                />
                            </Item>

                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('userName')}
                                    style                   = {[styles.input, styles.height_50, styles.borderBold]}
                                    onChangeText            = {(phone) => this.setState({phone})}
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
export default connect(mapStateToProps, { })(FormPayment);