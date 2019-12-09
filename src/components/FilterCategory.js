import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground} from "react-native";
import {
    Container, Content, Header, Button, Left, Icon, Body, Title, Right, Item, Picker, CheckBox, Switch, Input
} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import i18n from "../../locale/i18n";
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";


class FilterCategory extends Component {
    constructor(props){
        super(props);

        this.state={
            starCount           : 4,
            show_modal          : false,
            country	            : null,
            checked             : false,
            rating              : false,
            toggle              : false
        }
    }

    componentWillMount() {
    }

    static navigationOptions = () => ({
        header      : null,
        drawerLabel : ( <Text style={styles.textLabel}>{ i18n.t('home') }</Text> ) ,
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

    onValueCountry  (value) {this.setState({country: value});}

    onFocus(){
        this.componentDidMount();
    }

    selectRating(id) {
        this.setState({
            rating  : id,
        });
        this.state.rating = id;
    }

    toggleModal = () => {
        this.setState({ show_modal: !this.state.show_modal });
    };


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
                            كافيهات
                        </Title>
                    </Body>
                    <Right style={styles.rightIcon}>
                        <Button style={[styles.bg_light_oran, styles.Radius_0, styles.iconHeader, styles.flexCenter]} transparent onPress={this.toggleModal}>
                            <Icon style={[styles.text_gray, styles.textSize_20]} type="Feather" name='filter' />
                        </Button>
                    </Right>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <View style={[styles.position_R , styles.Width_80, styles.SelfRight]}>
                            <Item floatingLabel style={styles.item}>
                                <Input
                                    placeholder             = {i18n.translate('sear')}
                                    style                   = {[styles.input, styles.height_50, styles.bg_light_gray]}
                                    autoCapitalize          = 'none'
                                    onChangeText            = {(sarch) => this.setState({sarch})}
                                />
                            </Item>
                            <TouchableOpacity style={[styles.position_A, styles.iconSearch, styles.width_50, styles.height_50, styles.flexCenter,]}>
                                <Icon style={[styles.text_gray, styles.textSize_20]} type="AntDesign" name='search1' />
                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity style={[styles.position_R, styles.flexCenter, styles.Width_90, styles.marginVertical_25]}>
                            <View style={[styles.lightOverlay, styles.Border]}></View>
                            <View style={[styles.rowGroup, styles.bg_White, styles.Border, styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                <View style={[styles.icImg, styles.flex_30]}>
                                    <Image style={[styles.icImg]} source={require('../../assets/images/bg_shope.png')} resizeMode={'cover'}/>
                                </View>
                                <View style={[styles.flex_70]}>
                                    <View style={[styles.rowGroup]}>
                                        <Text style={[styles.textRegular , styles.text_red]}>مطاعم</Text>
                                        <StarRating
                                            disabled        = {true}
                                            maxStars        = {5}
                                            rating          = {this.state.starCount}
                                            fullStarColor   = {'red'}
                                            starStyle       = { [styles.textSize_16, {marginHorizontal : 2}] }
                                        />
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

                        <Modal
                            onBackButtonPress               = {()=> this.setState({show_modal : false})}
                            isVisible                       = {this.state.show_modal}
                            style                           = {styles.bgModelFilter}
                            hasBackdrop                     = {false}
                            animationIn                     = {'slideInRight'}
                            animationOut                    = {'slideOutRight'}
                            animationInTiming               = {500}
                            animationOutTiming              = {500}
                            backdropTransitionInTiming      = {500}
                            backdropTransitionOutTiming     = {500}
                            swipeDirection                  = "Right"
                        >
                            <View style={styles.contentModel}>
                                <View style={styles.model}>

                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}>
                                    <View style={[styles.bg_overlay, styles.overHidden, styles.paddingVertical_10, styles.Width_70, styles.heightFull, styles.paddingVertical_20]}>
                                        <View style={[styles.overHidden, styles.heightFull, styles.bgFullWidth]}>

                                            <View style={[styles.marginVertical_15, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_20]}>
                                                <Text style={[styles.textRegular , styles.text_black, styles.textSize_18]}>
                                                    {i18n.translate('serad')}
                                                </Text>
                                                <TouchableOpacity style={[styles.overHidden]} onPress={this.toggleModal}>
                                                    <Icon style={[styles.text_black, styles.textSize_16]} type="AntDesign" name='close' />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={[styles.centerColum, styles.Width_90, styles.bgFullWidth]}>

                                                <View style={[styles.viewPiker, styles.flexCenter,styles.marginVertical_5,styles.Width_100, styles.bg_White, styles.marginVertical_10,]}>
                                                    <Item style={styles.itemPiker} regular>
                                                        <Picker
                                                            mode                    = "dropdown"
                                                            style                   = {styles.Picker}
                                                            placeholderStyle        = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl', width : '100%', fontSize : 14 }]}
                                                            selectedValue           = {this.state.country}
                                                            onValueChange           = {this.onValueCountry.bind(this)}
                                                            textStyle               = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl', width : '100%', }]}
                                                            placeholder             = {i18n.translate('city')}
                                                            itemTextStyle           = {[styles.textRegular,{ color: "#121212", writingDirection: 'rtl', width : '100%', }]}
                                                        >
                                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('city')} value={null} />

                                                        </Picker>
                                                    </Item>
                                                    <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                                                </View>

                                                <TouchableOpacity style={[styles.marginVertical_10, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_10, styles.bg_White]}>
                                                    <Text style={[styles.textRegular , styles.text_black,]}>
                                                        {i18n.translate('map')}
                                                    </Text>
                                                    <View style={[styles.overHidden]}>
                                                        <Icon style={[styles.text_black, styles.textSize_16]} type="Feather" name='map-pin' />
                                                    </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style       = {[styles.marginVertical_10, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_10, styles.bg_White]}
                                                    onPress     = {() => this.setState({ checked: !this.state.checked })}>
                                                    <Text style={[styles.textRegular , styles.text_black,]}>
                                                        {i18n.translate('sallary')}
                                                    </Text>
                                                    <View style={[styles.paddingHorizontal_10]}>
                                                        <TouchableOpacity style = {[ styles.marginVertical_10]}>
                                                            <CheckBox
                                                                style                   = {[styles.checkBox, styles.Border, styles.bg_gray]}
                                                                color                   = {styles.text_gray}
                                                                selectedColor           = {styles.text_White}
                                                                onPress                 = {() => this.setState({ checked: !this.state.checked })}
                                                                checked                 = {this.state.checked}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                </TouchableOpacity>

                                                <View style= {[styles.marginVertical_10, styles.Width_100, styles.height_50,styles.rowGroup,]}>

                                                    <TouchableOpacity
                                                        style       = {[styles.marginVertical_10, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_10, styles.bg_White]}
                                                        onPress     = {() => this.selectRating(1)}>
                                                        <Text style={[styles.textRegular , styles.text_black,]}>
                                                            {i18n.translate('starrate')}
                                                        </Text>
                                                        <View style={[styles.paddingHorizontal_10]}>
                                                            <TouchableOpacity style = {[ styles.marginVertical_10]}>
                                                                <CheckBox
                                                                    style                   = {[styles.checkBox, styles.Border, styles.bg_gray]}
                                                                    color                   = {styles.text_gray}
                                                                    selectedColor           = {styles.text_White}
                                                                    onPress                 = {() => this.setState({ rating: !this.state.rating })}
                                                                    checked                 = {this.state.rating === 1}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style       = {[styles.marginVertical_10, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_10, styles.bg_White]}
                                                        onPress     = {() => this.selectRating(2)}>
                                                        <Text style={[styles.textRegular , styles.text_black,]}>
                                                            {i18n.translate('oldrate')}
                                                        </Text>
                                                        <View style={[styles.paddingHorizontal_10]}>
                                                            <TouchableOpacity style = {[ styles.marginVertical_10]}>
                                                                <CheckBox
                                                                    style                   = {[styles.checkBox, styles.Border, styles.bg_gray]}
                                                                    color                   = {styles.text_gray}
                                                                    selectedColor           = {styles.text_White}
                                                                    onPress                 = {() => this.setState({ rating: !this.state.rating })}
                                                                    checked                 = {this.state.rating === 2}
                                                                />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </TouchableOpacity>

                                                </View>

                                                {/*<TouchableOpacity*/}
                                                {/*    style       = {[styles.marginVertical_10, styles.Width_100, styles.height_50,styles.rowGroup,styles.paddingHorizontal_10, styles.bg_White]}*/}
                                                {/*    onPress     = {() => this.setState({ toggle: !this.state.toggle })}>*/}
                                                {/*    <Text style={[styles.textRegular , styles.text_black,]}>*/}
                                                {/*        {i18n.translate('sallary')}*/}
                                                {/*    </Text>*/}
                                                {/*    <View style={[styles.paddingHorizontal_10]}>*/}
                                                {/*        <TouchableOpacity style = {[]}>*/}
                                                {/*            <Switch*/}
                                                {/*                value                   = {this.state.toggle}*/}
                                                {/*                onPress                 = {() => this.setState({ toggle: !this.state.toggle })}*/}
                                                {/*            />*/}
                                                {/*        </TouchableOpacity>*/}
                                                {/*    </View>*/}
                                                {/*</TouchableOpacity>*/}

                                            </View>

                                            <TouchableOpacity style={[styles.overHidden, styles.bg_red, styles.width_120, styles.flexCenter, styles.Radius_5, styles.height_40, styles.marginVertical_25]} onPress={this.toggleModal}>
                                                <Text style={[styles.textRegular, styles.textSize_18, styles.text_White, styles.textCenter]}>
                                                    { i18n.t('search') }
                                                </Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                    </Animatable.View>
                                </View>
                            </View>
                        </Modal>

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
export default connect(mapStateToProps, { })(FilterCategory);