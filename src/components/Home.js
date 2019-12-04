import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, Animated, ScrollView, I18nManager, Platform} from "react-native";
import {Container, Content,  Header, Button, Item, Input} from 'native-base'
import styles from '../../assets/style'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";


class Home extends Component {
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
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <DoubleBounce size={20} color={COLORS.labelBackground} />
                </View>
            );
        }
    }


    render() {

        return (
            <Container>
				<NavigationEvents onWillFocus={() => this.onFocus()} />


                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }

                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , sweet}) => {
    return {
        lang        : lang.lang,
    };
};
export default connect(mapStateToProps, {})(Home);