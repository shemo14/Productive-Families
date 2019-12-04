import React from "react";
import { createAppContainer , createSwitchNavigator } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";



import Login from '../components/Login'
import Home from '../components/Home'
import AboutApp from "../components/AboutApp";
import Faq from "../components/Faq";
import ContactUs from "../components/ContactUs";
import InitScreen from "../components/InitScreen";


const appStack =  createStackNavigator({
    aboutApp: {
        screen: AboutApp,
        navigationOptions: {
            header: null
        }
    },
    home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    faq: {
        screen: Faq,
        navigationOptions: {
            header: null
        }
    },
    contactUs: {
        screen: ContactUs,
        navigationOptions: {
            header: null
        }
    },
});

const authStack = createStackNavigator({
    initScreen: {
        screen: InitScreen,
        navigationOptions: {
            header: null
        }
    },
    login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
});

const AppNavigator = createSwitchNavigator({
    app     : appStack,
    auth    : authStack,
});

export default createAppContainer(AppNavigator);