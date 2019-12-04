import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, I18nManager, Linking, Platform, Dimensions, ImageBackground, Animated,} from "react-native";
import {Container, Content, Icon, Header, List, ListItem, Left, Button, Item, Input, Right} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import Communications from 'react-native-communications';
import * as Animatable from 'react-native-animatable';
import {getContactUs} from "../actions";
import contactUs from "../reducers/ContactUsReducer";

const height = Dimensions.get('window').height;


class ContactUs extends Component {
    constructor(props){
        super(props);

        this.state={
            status: null,
        }
    }


    componentWillMount() {
        this.props.getContactUs( this.props.lang )
    }

    renderLoader(){
        if (this.props.loader){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <DoubleBounce size={20} color={COLORS.labelBackground} />
                </View>
            );
        }
    }

    render() {

        return (
            <Container>
                <Header style={[styles.header , styles.plateformMarginTop]} noShadow>
                    <Animated.View style={[styles.headerView  , styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <Button transparent onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Icon type={'FontAwesome'} name={'angle-right'} style={[styles.transform, styles.rightHeaderIcon]} />
                            </Button>
                        </Right>
                        <Text style={[styles.headerText , styles.headerTitle]}>{ i18n.t('contactUs') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    {/*<ImageBackground source={require('../../assets/images/contact_bg.png')} resizeMode={'cover'} style={styles.imageBackground}>*/}

                    {/*</ImageBackground>*/}
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang , contactUs }) => {
    return {
        lang            : lang.lang,
        phone           : contactUs.phone,
        mail            : contactUs.mail,
        socials         : contactUs.socials,
        loader          : contactUs.loader
    };
};
export default connect(mapStateToProps, {getContactUs})(ContactUs);