import React from "react";
import { createAppContainer , createSwitchNavigator } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';

import { I18nManager } from "react-native";

import Login                    from '../components/Login'
import Home                     from '../components/Home'
import AboutApp                 from "../components/AboutApp";
import Faq                      from "../components/Faq";
import ContactUs                from "../components/ContactUs";
import Terms                    from "../components/Terms";
import InitScreen               from "../components/InitScreen";
import Basket                   from "../components/Basket";
import FilterCategory           from "../components/FilterCategory";
import Register                 from "../components/Register";
import ActivationCode           from "../components/ActivationCode";
import NewPassword              from "../components/NewPassword";
import ForgetPassword           from "../components/ForgetPassword";
import DrawerCustomization      from "./DrawerCustomization";

//// amaaaany

import Provider           from "../components/Provider";
import Product           from "../components/Product";
import Notifications           from "../components/Notifications";
import Profile           from "../components/Profile";


const drawerCust = (props) => (<DrawerCustomization {...props} />);

const drawerNavigator = createDrawerNavigator({
    Home                : Home,
    profile                : Profile,
},
{
    initialRouteName    : 'Home',
    drawerPosition      : I18nManager.isRTL ?'right' : 'left',
    drawerOpenRoute     : 'DrawerOpen',
    drawerCloseRoute    : 'DrawerClose',
    gesturesEnabled     : false,
    drawerToggleRoute   : 'DrawerToggle',
    drawerWidth         : '100%',
    contentComponent    : drawerCust
});



const appStack =  createStackNavigator({
    drawerNavigator: {
        screen: drawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    FilterCategory : {
        screen: FilterCategory,
        navigationOptions: {
            header: null
        }
    },
    Basket: {
        screen: Basket,
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
    Terms: {
        screen: Terms,
        navigationOptions: {
            header: null
        }
    },
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
    profile: {
        screen: Profile,
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
    Register: {
        screen: Register,
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
    NewPassword: {
        screen: NewPassword,
        navigationOptions: {
            header: null
        }
    },
    ForgetPassword: {
        screen: ForgetPassword,
        navigationOptions: {
            header: null
        }
    },
    ActivationCode: {
        screen: ActivationCode,
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