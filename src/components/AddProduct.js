import React, { Component } from "react";
import {View, Text, Image, ImageBackground , TouchableOpacity , KeyboardAvoidingView, ImageEditor, ImageStore } from "react-native";
import {Container, Content, Icon, Header, Left, Button, Body, Title, Form, Item, Input, Textarea, Picker, Toast} from 'native-base'
import styles from '../../assets/style'
import i18n from '../../locale/i18n'
import * as Animatable from 'react-native-animatable';
import {connect} from "react-redux";
import {profile , addProduct, subCate} from '../actions';
import {NavigationEvents} from "react-navigation";

import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';
import * as Permissions from 'expo-permissions';

let base64   = [];

class AddProduct extends Component {
    constructor(props){
        super(props);

        this.state={
            namePro		        : '',
            pricePro            : '',
            discount            : '',
            info	            : '',
            kindPro	            : null,
            imageBrowserOpen    : false,
            cameraBrowserOpen   : false,
            photos: [],
            imageId: null,
            refreshed: false,
        }
    }

    onValuekind      (value) {this.setState({kindPro: value});}

    validate = () => {

        let isError     = false;
        let msg         = '';

        if (this.state.namePro.length <= 0) {
            isError     = true;
            msg         = i18n.t('namepro');
        }else if (this.state.pricePro.length <= 0){
            isError     = true;
            msg         = i18n.t('monypro');
        }else if(this.state.discount.length <= 0){
            isError     = true;
            msg         = i18n.t('discount');
        }else if (this.state.info === ''){
            isError     = true;
            msg         = i18n.t('info');
        }else if (this.state.kindPro === null){
            isError     = true;
            msg         = i18n.t('kindpro');
        }
        // else if (this.state.kindPro === null){
        //     isError     = true;
        //     msg         = i18n.t('infoimage');
        // }

        if (msg !== ''){
            Toast.show({
                text          : msg,
                duration      : 2000,
                type          : "danger",
                textStyle     : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center',
                }
            });
        }
        return isError;
    };

    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    onAddproduct() {

        this.setState({ spinner: true });

        const err = this.validate();

        if (!err){

            const { namePro, pricePro, discount, info,kindPro } = this.state;
            const data = { namePro, pricePro, discount, info,kindPro };

            this.props.addProduct(data, this.props, this.props.lang, this.props.user.token);
            this.setState({ spinner: false });

            console.log('data', data);

        }else {

            this.setState({ spinner: false });

        }
    }

    renderItems = (item, imageId) => {
        return(
            <View style={{ margin: 2, flex: 1 }}>
                <TouchableOpacity onPress={() => this.deleteImage(item)} style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', zIndex: 999, height: imageId === item.md5 ? 100 : 0, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
                    <Icon type={'EvilIcons'} name={'close'} style={{ fontSize: imageId === item.md5 ? 35 : 0, color: '#fff', textAlign: 'center', width: 30, opacity: 1 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 100 }} onPress={() => this.selectImage(item.md5)}>
                    <Image
                        style={{ height: 100, width: '100%', borderRadius: 3 }}
                        source={{uri: item.file}}
                    />
                </TouchableOpacity>
            </View>
        );
    }


    deleteImage(item){
        let index = this.state.photos.indexOf(item);
        console.log('this is item ....', index);

        let photos = this.state.photos;
        photos.splice(index, 1);
        console.log('this is photos ....', photos);
        this.setState({ photos, refreshed: !this.state.refreshed, imageId: null })
    }


    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            let images = this.state.photos;
            this.setState({
                imageBrowserOpen: false,
                photos: images.concat(photos)
            });

            const imgs = this.state.photos;
            console.log(imgs);
            for (var i =0; i < imgs.length; i++){
                const imageURL = imgs[i].file;
                Image.getSize(imageURL, (width, height) => {
                    var imageSize = {
                        size: {
                            width,
                            height
                        },
                        offset: {
                            x: 0,
                            y: 0,
                        },
                    };

                    ImageEditor.cropImage(imageURL, imageSize, (imageURI) => {
                        console.log(imageURI);
                        ImageStore.getBase64ForTag(imageURI, (base64Data) => {
                            base64.push(base64Data);
                            ImageStore.removeImageForTag(imageURI);
                        }, (reason) => console.log(reason) )
                    }, (reason) => console.log(reason) )
                }, (reason) => console.log(reason))
            }
        }).catch((e) => console.log(e))
    };


    componentWillMount() {

        this.props.subCate( this.props.lang, this.props.user.token);

    }

    onFocus(){
        this.componentWillMount();
    }

    render() {
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }

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
                            {i18n.t('addpro')}
                        </Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.bgFullWidth} style={styles.contentView}>
                    <ImageBackground source={require('../../assets/images/bg_img.png')} style={[styles.bgFullWidth]}>

                        <View style={[styles.rowGroup, styles.paddingHorizontal_10, styles.marginVertical_10]}>
                            <View style={[styles.position_R, styles.marginHorizontal_10, styles.flex_45]}>
                                <View style={[styles.lightOverlay, styles.Border , {top:10 , left:10}]}/>
                                <View style={[styles.position_R, styles.Width_100, styles.overHidden, styles.bg_White, styles.height_150]}>
                                    <View style={[styles.lightOverlay, styles.Border, {top:0 , left:0}]}/>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.blockContent]}>
                                        <View style={[styles.paddingVertical_10, styles.paddingHorizontal_10]}>
                                            <TouchableOpacity onPress={() => this.setState({imageBrowserOpen: true})}>
                                                <Icon style={[styles.text_White , styles.textSize_20]} type="AntDesign" name='plus' />
                                            </TouchableOpacity>
                                        </View>
                                    </Animatable.View>
                                </View>
                            </View>
                            <View style={[styles.flex_45]}>

                            </View>
                        </View>

                        <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                            <Form style={[styles.Width_100, styles.flexCenter, styles.marginVertical_10, styles.Width_90]}>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.t('nameproducer')}
                                            style                   = {[ styles.input , styles.height_50 , styles.borderBlack, styles.paddingHorizontal_20]}
                                            onChangeText            = {(namePro) => this.setState({namePro})}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.viewPiker, styles.flexCenter,styles.marginVertical_15,styles.Width_100, styles.borderBlack]}>
                                    <Item style={styles.itemPiker} regular>
                                        <Picker
                                            mode                    = "dropdown"
                                            style                   = {styles.Picker}
                                            placeholderStyle        = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl', width : '100%', fontSize : 14 }]}
                                            selectedValue           = {this.state.kindPro}
                                            onValueChange           = {this.onValuekind.bind(this)}
                                            textStyle               = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl', width : '100%', }]}
                                            placeholder             = {i18n.t('producer')}
                                            itemTextStyle           = {[styles.textRegular,{ color: "#636363", writingDirection: 'rtl', width : '100%', }]}
                                        >
                                            <Picker.Item style={[styles.Width_100]} label={i18n.t('producer')} value={null} />

                                            {
                                                this.props.subCategory.map((cate, i) => (
                                                    <Picker.Item style={styles.Width_100} key={i} label={cate.name} value={cate.id} />
                                                ))
                                            }

                                        </Picker>
                                    </Item>
                                    <Icon style={styles.iconPicker} type="AntDesign" name='down' />
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.t('monyproducer')}
                                            style                   = {[ styles.input , styles.height_50 , styles.borderBlack, styles.paddingHorizontal_20]}
                                            onChangeText            = {(pricePro) => this.setState({pricePro})}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.height_70, styles.flexCenter ]}>
                                    <Item floatingLabel style={[ styles.item, styles.position_R, styles.overHidden ]}>
                                        <Input
                                            placeholder             = {i18n.t('sallproducer')}
                                            style                   = {[ styles.input , styles.height_50 , styles.borderBlack, styles.paddingHorizontal_20]}
                                            onChangeText            = {(discount) => this.setState({discount})}
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.position_R, styles.overHidden, styles.flexCenter ]}>
                                    <Item style={[styles.item, styles.position_R, styles.overHidden]}>
                                        <Textarea
                                            auto-capitalization             = {false}
                                            rowSpan                         = {5}
                                            placeholder                     = {i18n.t('massmtger')}
                                            style                           = {[ styles.textArea , styles.borderBlack, styles.paddingHorizontal_20]}
                                            onChangeText                    = {(info) => this.setState({info})}
                                        />
                                    </Item>
                                </View>

                            </Form>

                            <TouchableOpacity
                                onPress         = {() => this.onAddproduct()}
                                style           = {[styles.cartBtn , styles.SelfCenter , {marginBottom:20}]}
                            >
                                <Text style={[styles.textRegular, styles.text_White,styles.textSize_14, styles.textLeft ]} >
                                    {i18n.t('confirm')}
                                </Text>
                            </TouchableOpacity>

                        </KeyboardAvoidingView>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang, profile, subCate }) => {
    return {
        lang                : lang.lang,
        user                : profile.user,
        subCategory         : subCate.subCate
    };
};
export default connect(mapStateToProps, {addProduct , profile, subCate})(AddProduct);