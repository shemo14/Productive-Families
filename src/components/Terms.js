import React, { Component } from "react";
import {View, Text, Image, Dimensions, ImageBackground, Animated, I18nManager,} from "react-native";
import {Container, Content, Icon, Header,Left, Button, Right} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import { getAboutApp } from '../actions'
import * as Animatable from 'react-native-animatable';
import aboutApp from "../reducers/AboutAppReducer";


class Terms extends Component {
    constructor(props){
        super(props);

        this.state={
            status              : null,
        }
    }


    componentWillMount() {
        this.props.getAboutApp( this.props.lang )
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
                        <Text style={[styles.headerText , styles.headerTitle]}>{ i18n.t('aboutApp') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content  contentContainerStyle={styles.flexGrow} style={[styles.homecontent ]} onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    {/*<ImageBackground source={require('../../assets/images/about_bg.png')} resizeMode={'cover'} style={styles.imageBackground}>*/}

                    {/*</ImageBackground>*/}
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang, aboutApp }) => {
    return {
        lang        : lang.lang,
        aboutApp    : aboutApp.aboutApp,
        loader      : aboutApp.loader
    };
};
export default connect(mapStateToProps, { getAboutApp })(Terms);