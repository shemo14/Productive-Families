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
import DetailsBasket            from "../components/DetailsBasket";
import Location                 from "../components/Location";
import ChoosePayment            from "../components/ChoosePayment";
import FormPayment              from "../components/FormPayment";
import ConfirmPayment           from "../components/ConfirmPayment";
import MyOrders                 from "../components/MyOrders";
import Notification             from "../components/Notification";
import Offers                   from "../components/Offers";
import Favorite                 from "../components/Favorite";
import DrawerCustomization      from "./DrawerCustomization";

const drawerCust = (props) => (<DrawerCustomization {...props} />);

const drawerNavigator = createDrawerNavigator({
    Home                : Home,
    MyOrders            : MyOrders,
    Offers              : Offers,
    Favorite            : Favorite,
    AboutApp            : AboutApp,
    Faq                 : Faq,
    Terms               : Terms,
    ContactUs           : ContactUs,
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
    DetailsBasket : {
        screen: DetailsBasket,
        navigationOptions: {
            header: null
        }
    },
    Favorite : {
        screen: Favorite,
        navigationOptions: {
            header: null
        }
    },
    Offers : {
        screen: Offers,
        navigationOptions: {
            header: null
        }
    },
    Notification : {
        screen: Notification,
        navigationOptions: {
            header: null
        }
    },
    MyOrders : {
        screen: MyOrders,
        navigationOptions: {
            header: null
        }
    },
    ConfirmPayment : {
        screen: ConfirmPayment,
        navigationOptions: {
            header: null
        }
    },
    FormPayment : {
        screen: FormPayment,
        navigationOptions: {
            header: null
        }
    },
    ChoosePayment : {
        screen: ChoosePayment,
        navigationOptions: {
            header: null
        }
    },
    Location : {
        screen: Location,
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
});

const authStack = createStackNavigator({
    InitScreen: {
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
    Register: {
        screen: Register,
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
});

const AppNavigator = createSwitchNavigator({
    auth    : authStack,
    app     : appStack,
});

export default createAppContainer(AppNavigator);