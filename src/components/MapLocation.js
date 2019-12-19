import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity} from "react-native";
import {Container, Content, Header, Button, Left, Icon, Body, Title,Toast} from 'native-base'
import styles from '../../assets/style'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import i18n from "../../locale/i18n";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import MapView from 'react-native-maps';

class MapLocation extends Component {
    constructor(props){
        super(props);

        this.state={
            city                      : '',
            mapRegion                 : null,
            hasLocationPermissions    : false,
            initMap                   : true,
            location                  : '',
        }
    }

    async componentWillMount() {

        console.log('name', this.props.navigation);

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            const userLocation = { latitude, longitude };
            this.setState({  initMap: false, mapRegion: userLocation });
        }

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity    += this.state.mapRegion.latitude + ',' + this.state.mapRegion.longitude;
        getCity    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        // ReactotronConfig.log(getCity);

        try {
            const { data } = await axios.get(getCity);
            this.setState({ city: data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }

    }

    async componentDidMount(){
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
        const userLocation = { latitude, longitude };
        this.setState({  initMap: false, mapRegion: userLocation });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isLoaded: false });
    }

    _handleMapRegionChange  = async (mapRegion) =>  {
        this.setState({ mapRegion });

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapRegion.latitude + ',' + mapRegion.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        console.log('locations data', getCity);

        try {
            const { data } = await axios.get(getCity);
            this.setState({ city: data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }

        let location = await Location.getCurrentPositionAsync({});

        // Center the map on the location we just fetched.
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
    };

    getLocation(){
        const pageName = this.props.navigation.state.params.pageName;
        console.log('this.state.mapRegion' , this.state.mapRegion)
        if(this.state.city === ''){

            Toast.show({
                text        : i18n.t('chickmap'),
                duration    : 2000,
                type        : "danger",
                textStyle     : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   :'center'
                }
            });

        }else{


            let  pageName = this.props.navigation.state.params.pageName;

            if (pageName === 'EditShop'){
                this.props.navigation.navigate('EditShop', {
                    city_name   : this.state.city,
                    latitude    : this.state.mapRegion.latitude,
                    longitude   : this.state.mapRegion.longitude,
                });
            } else if (pageName === 'editProfile'){
                this.props.navigation.navigate('editProfile', {
                    city_name   : this.state.city,
                    latitude    : this.state.mapRegion.latitude,
                    longitude   : this.state.mapRegion.longitude,
                });
            } else if (pageName === 'FilterCategory'){
                this.props.navigation.navigate('FilterCategory', {
                    city_name   : this.state.city,
                    latitude    : this.state.mapRegion.latitude,
                    longitude   : this.state.mapRegion.longitude,
                });
            } else if (pageName === 'editProfile'){
                this.props.navigation.navigate('editProfile', {
                    city_name               : this.state.city,
                    latitude                : this.state.mapRegion.latitude,
                    longitude               : this.state.mapRegion.longitude,
                });
            }
            else if (pageName === 'DetailsBasket'){
                console.log(this.state.city, this.state.mapRegion.latitude,  this.state.mapRegion.longitude);
                this.props.navigation.navigate('ChoosePayment', {
                    city_name               : this.state.city,
                    latitude                : this.state.mapRegion.latitude,
                    longitude               : this.state.mapRegion.longitude,
                    provider_id             : this.props.navigation.state.params.provider_id,
                    shipping_price          : this.props.navigation.state.params.shipping_price,
                    address                 : this.state.city,
                });
            } else {
                this.props.navigation.navigate('Register', {
                    city_name   : this.state.city,
                    latitude    : this.state.mapRegion.latitude,
                    longitude   : this.state.mapRegion.longitude,
                });
            }

        }

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
                        <View style={[styles.bgFullWidth, styles.heightFull]}>
                            {
                                !this.state.initMap ? (
                                    <MapView
                                        style={{ width: '100%', height: '100%' }}
                                        initialRegion={{
                                            latitude        : this.state.mapRegion.latitude,
                                            longitude       : this.state.mapRegion.longitude,
                                            latitudeDelta   : 0.0922,
                                            longitudeDelta  : 0.0421,
                                        }}>
                                        <MapView.Marker draggable
                                                        coordinate={this.state.mapRegion}
                                                        onDragEnd={(e) =>  this._handleMapRegionChange(e.nativeEvent.coordinate)}>
                                            <Image source={require('../../assets/images/pin.png')} resizeMode={'contain'} style={{ width: 35, height: 35 }}/>
                                        </MapView.Marker>
                                    </MapView>
                                ) : (<View />)
                            }

                            <TouchableOpacity
                                style={[
                                    styles.bg_red,
                                    styles.width_150,
                                    styles.flexCenter,
                                    styles.marginVertical_15,
                                    styles.height_40,
                                    styles.position_A,
                                    styles.bottom_10
                                ]}
                                onPress={() => this.getLocation()}>
                                <Text style={[styles.textBold , styles.textSize_14, styles.text_White]}>
                                    {i18n.translate('confirm')}
                                </Text>
                            </TouchableOpacity>

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
export default connect(mapStateToProps, { })(MapLocation);