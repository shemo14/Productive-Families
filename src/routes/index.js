import React from "react";
import { createAppContainer , createSwitchNavigator } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";



import Login                from '../components/Login'
import Home                 from '../components/Home'
import AboutApp             from "../components/AboutApp";
import Faq                  from "../components/Faq";
import ContactUs            from "../components/ContactUs";
import Terms                from "../components/Terms";
import InitScreen           from "../components/InitScreen";


//// amaaaany

import Provider           from "../components/Provider";
import Product           from "../components/Product";
import Notifications           from "../components/Notifications";



const appStack =  createStackNavigator({

    /// Amaany
    notifications: {
        screen: Notifications,
        navigationOptions: {
            header: null
        }
    },
    product: {
        screen: Product,
        navigationOptions: {
            header: null
        }
    },
    provider: {
        screen: Provider,
        navigationOptions: {
            header: null
        }
    },





    /////////////////////////////

    home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Terms: {
        screen: Terms,
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
    aboutApp: {
        screen: AboutApp,
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