import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground  , FlatList, Platform} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import i18n from "../../locale/i18n";
const isIOS = Platform.OS === 'ios';
import { offers, favorite } from '../actions';
import * as Animatable from "react-native-animatable";
import StarRating from "react-native-star-rating";

class Offers extends Component {
    constructor(props){
        super(props);

        this.state={
            count       : 0
        }
    }

    componentWillMount() {
        this.props.offers( this.props.lang );
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_black, styles.textSize_18]}>{ i18n.t('offers') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/offers.png')}/>)
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

    toggleFavorite (id){

        this.setState({ isFav: ! this.state.isFav, activeType : id });
        const token =  this.props.user ?  this.props.user.token : null;
        this.props.favorite( this.props.lang, id  , token );

    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item, key) => {
        return(
            <TouchableOpacity
                style       = {[styles.position_R , styles.flex_45, styles.marginVertical_15, styles.height_200, styles.marginHorizontal_10]}
                key         = { key }
                onPress     = {() => this.props.navigation.navigate('product', { id : item.id })}
            >
                <View style={[styles.lightOverlay, styles.Border]}></View>
                <View style={[styles.bg_White, styles.Border]}>
                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                        <View style={[styles.flex_100, styles.position_R]}>
                            <Image style={[styles.Width_100 , styles.height_100, styles.flexCenter]} source={{ uri : item.thumbnail }} resizeMode={'cover'}/>
                            <Text style={[styles.overlay_black, styles.text_White, styles.textRegular, styles.position_A, styles.top_5, styles.left_0, styles.paddingHorizontal_5]}>
                                { item.discount } %
                             </Text>
                        </View>
                    </View>
                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5,]}>
                        <Text style={[styles.text_gray, styles.textSize_16, styles.textRegular, styles.Width_100, styles.textLeft, styles.width_80]} numberOfLines = { 1 } prop with ellipsizeMode = "head">
                            { item.name }
                        </Text>
                        <Text style={[styles.text_light_gray, styles.textSize_12, styles.textRegular, styles.Width_100, styles.textLeft]}>
                            { item.category } - { item.sub_category }
                        </Text>
                        <View style={[styles.rowGroup]}>
                            <Text style={[styles.text_red, styles.textSize_12, styles.textRegular,styles.textLeft, styles.borderText, styles.paddingHorizontal_5]}>
                                { item.price } {i18n.t('RS')}
                            </Text>
                            <TouchableOpacity onPress = {() => this.toggleFavorite(item.id)}>
                                <Text>
                                    <Icon style={[styles.text_red, styles.textSize_18]} type="AntDesign" name={this.state.isFav === 1 ? 'heart' : 'hearto'} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

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
                            { i18n.t('offers') }
                        </Title>
                    </Body>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <View style={[styles.marginVertical_5 , styles.paddingHorizontal_5]}>

                                <FlatList
                                    data                    = {this.props.offer}
                                    renderItem              = {({item}) => this.renderItems(item)}
                                    numColumns              = {2}
                                    keyExtractor            = {this._keyExtractor}
                                    // extraData               = {this.props.categoryProviders}
                                    onEndReachedThreshold   = {isIOS ? .01 : 1}
                                />

                        </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang, offers }) => {
    return {
        lang        : lang.lang,
        offer       : offers.offers
    };
};
export default connect(mapStateToProps, { offers , favorite})(Offers);