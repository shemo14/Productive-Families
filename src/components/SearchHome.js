import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, FlatList , Platform} from "react-native";
import {Container, Content, Header, Button, Left, Body, Title, Icon,} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import { searchHome } from '../actions';
import i18n from "../../locale/i18n";

const isIOS = Platform.OS === 'ios';

class SearchHome extends Component {
    constructor(props){
        super(props);

        this.state={

        }
    }

    componentWillMount() {

        const data  = { keyword : this.props.navigation.state.params.categorySearch , lang : this.props.lang };

        this.props.searchHome(data);

    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={[styles.textRegular, styles.text_black, styles.textSize_18]}>{ i18n.t('home') }</Text> ) ,
        drawerIcon  : ( <Image style={[styles.smImage]} source={require('../../assets/images/home.png')} resizeMode={'cover'}/>)
    });

    _keyExtractor = (item, index) => item.id;

    renderItems = (item, key) => {
        return(

            <TouchableOpacity
                style       = {[styles.position_R , styles.flex_45, styles.marginVertical_15, styles.height_200, styles.marginHorizontal_10]}
                key         = { key }
                onPress     = {() => this.props.navigation.navigate('FilterCategory', { id : item.id })}
            >
                <View style={[styles.lightOverlay, styles.Border]}></View>
                <View style={[styles.bg_White, styles.Border]}>
                    <View style={[styles.rowGroup, styles.paddingHorizontal_5 , styles.paddingVertical_5]}>
                        <View style={[styles.flex_100, styles.position_R]}>
                            <Image
                                style           = {[styles.Width_100 , styles.height_100, styles.flexCenter]}
                                source          = {{ uri: item.thumbnail }}
                                resizeMode      = {'cover'}
                            />

                            {
                                (item.discount !== 0)
                                    ?
                                    <View style = {[styles.overlay_black, styles.text_White, styles.textRegular, styles.position_A, styles.top_15, styles.left_0,styles.paddingHorizontal_5, styles.width_50, styles.flexCenter]}>
                                        <Text style = {[styles.text_White, styles.textRegular, styles.textCenter]}>
                                            {item.discount} %
                                        </Text>
                                    </View>
                                    :
                                    <View/>
                            }
                        </View>
                    </View>
                    <View style={[styles.overHidden, styles.paddingHorizontal_10, styles.marginVertical_5]}>
                        <Text
                            style           = {[styles.text_gray, styles.textSize_14, styles.textRegular, styles.Width_100, styles.textLeft]}
                            numberOfLines   = { 1 } prop with
                            ellipsizeMode   = "head"
                        >
                            {item.name}
                        </Text>
                        <Text style={[styles.text_light_gray, styles.textSize_13, styles.textRegular, styles.Width_100, styles.textLeft]}>
                            {item.category} - {item.sub_category}
                        </Text>
                        <View style={[styles.rowGroup]}>
                            <Text style={[styles.text_red, styles.textSize_13, styles.textRegular,styles.textLeft, styles.borderText, styles.paddingHorizontal_5]}>
                                {item.price} {i18n.t('RS')}
                            </Text>
                            <TouchableOpacity>
                                <Text>
                                    <Icon style={[styles.text_red, styles.textSize_18]} type="AntDesign" name={item.is_fav === 1 ? 'heart' : 'hearto'} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


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

                { this.renderLoader() }

                <NavigationEvents onWillFocus={() => this.onFocus()} />

                <Header style={styles.headerView}>
                    <Left style={[styles.leftIcon]}>
                        <Button style={styles.Button} transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={[styles.text_black, styles.textSize_22]} type="AntDesign" name='right' />
                        </Button>
                    </Left>
                    <Body style={styles.bodyText}>
                        <Title style={[styles.textRegular , styles.text_black, styles.textSize_20, styles.textLeft, styles.Width_100, styles.paddingHorizontal_0, styles.paddingVertical_0]}>
                            {this.props.navigation.state.params.categorySearch}
                        </Title>
                    </Body>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                            <View style={[styles.marginVertical_5 , styles.paddingHorizontal_5]}>
                                {
                                    this.props.categories?
                                        <FlatList
                                            data                    = {this.props.categories}
                                            renderItem              = {({item}) => this.renderItems(item)}
                                            numColumns              = {2}
                                            keyExtractor            = {this._keyExtractor}
                                            extraData               = {this.props.categories}
                                            onEndReachedThreshold   = {isIOS ? .01 : 1}
                                        />
                                        :
                                        <View/>
                                }


                            </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang, home, searchHome }) => {
    return {
        lang            : lang.lang,
        categories      : searchHome.categories,
        loader          : home.loader
    };
};
export default connect(mapStateToProps, { searchHome })(SearchHome);