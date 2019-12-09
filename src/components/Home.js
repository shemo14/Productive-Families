import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Linking} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title, Right} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import Swiper from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import { sliderHome } from '../actions';
import i18n from "../../locale/i18n";
import home from "../reducers/HomeReducer";


class Home extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }

    componentWillMount() {
        this.props.sliderHome( this.props.lang );
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_black, styles.textSize_18]}>{ i18n.t('home') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/home.png')} resizeMode={'cover'}/>)
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
                    <Left style={[styles.leftIcon, styles.marginHorizontal_15]}>
                        <Button style={styles.Button} transparent onPress={() => { this.props.navigation.openDrawer()} }>
                            <Image style={[styles.ionImage]} source={require('../../assets/images/menu.png')}/>
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            { i18n.t('home') }
                        </Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        {/*<Button onPress={() => this.props.navigation.navigate('notifications')} style={[styles.text_gray]} transparent>*/}
                            {/*<Icon style={[styles.text_black, styles.textSize_22]} type="Ionicons" name='md-notifications-outline' />*/}
                        <Button style={[styles.text_gray]} transparent>
                            <Image style={[styles.ionImage]} source={require('../../assets/images/alarm.png')}/>
                        </Button>
                        <Button style={[styles.bg_light_oran, styles.Radius_0, styles.iconHeader, styles.flexCenter]} transparent onPress={this.toggleModal}>
                            <Image style={[styles.ionImage]} source={require('../../assets/images/basket.png')}/>
                        </Button>
                    </Right>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/background.png')} style={[styles.bgFullWidth]}>

                        <View style={styles.viewBlock}>
                            <Swiper
                                containerStyle      = {[styles.Width_95, styles.marginVertical_15, styles.swiper, styles.viewBlock]}
                                autoplay            = {true}
                                paginationStyle     = {[styles.paginationStyle]}
                                dotStyle            = {[styles.bg_lightWhite]}
                                activeDotStyle      = {{ backgroundColor: '#F00', width: 20,}}
                                animated            = {true}
                                loop                = {true}
                                autoplayTimeout     = { 2 }
                            >

                                {
                                    this.props.slider.map((slid, i) => (
                                        <View style={[styles.viewBlock]}>
                                            <Image style={[styles.Width_95, styles.swiper]} source={{ uri : slid.image}}/>
                                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent, styles.Width_50]}>
                                                <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                                    <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                                        {slid.name}
                                                    </Text>
                                                    <Text style={[styles.textRegular, styles.text_White, styles.Width_100 ,styles.textSize_12, styles.textLeft]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                                        {slid.description}
                                                    </Text>
                                                    <TouchableOpacity key={i} onPress={() => Linking.openURL(slid.link)}>
                                                            <Text style={[styles.textRegular, styles.text_red, styles.Width_100 ,styles.textSize_12, styles.textLeft, styles.textDecoration]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                                                                { i18n.t('here') }
                                                            </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </Animatable.View>
                                        </View>
                                    ))
                                }

                            </Swiper>
                        </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang, home }) => {
    return {
        lang        : lang.lang,
        slider      : home.slider,
        loader      : home.loader
    };
};
export default connect(mapStateToProps, { sliderHome })(Home);