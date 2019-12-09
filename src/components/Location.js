import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";
import i18n from "../../locale/i18n";
import { MapView } from 'expo';

class Location extends Component {
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
                            { i18n.t('Location') }
                        </Title>
                    </Body>
                </Header>
                <Content  contentContainerStyle={styles.bgFullWidth} style={styles.bgFullWidth}>
                        <View style={[styles.bgFullWidth]}>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude          : 26.8206,
                                    longitude         : 30.8025,
                                    latitudeDelta     : 0.0922,
                                    longitudeDelta    : 0.0421,
                                }}>
                                <MapView.Marker
                                    coordinate={{
                                        latitude    : 26.8206,
                                        longitude   : 30.8025
                                    }}
                                    title={'Location'}
                                    image={require('../../assets/images/marker.png')}>
                                </MapView.Marker>
                            </MapView>
                        </View>
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
export default connect(mapStateToProps, { })(Location);