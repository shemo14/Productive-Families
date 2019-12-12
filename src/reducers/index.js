import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import aboutApp from './AboutAppReducer';
import contactUs from './ContactUsReducer';
import faq from './FaqReducer';
import terms from './TermsReducer';
import complaint from './SendComplaintReducer';
import home from './HomeReducer';
import changePassword from './ChangePasswordReducer';
import searchHome from './SearchHomeReducer';
import categoryHome from './CategoryHomeReducer';
import categoryProvider from './CategoryProviderRuducer';
import SearchProvider from './SearchProvidersReducer';
import filterProvider from './FilterProvidersReducer';
import cities from './CitiesReducer';
import providerProducts from './ProviderProductsReducer';
import favorite from './FavoriteReducer';
import cartList from './CartListReducer';
import cartProducts from './CartProductsReducer';
import notifications from './NotificationsReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    aboutApp,
    contactUs,
    faq,
    terms,
    complaint,
    home,
    cities,
    changePassword,
    searchHome,
    categoryHome,
    categoryProvider,
    SearchProvider,
    filterProvider,
    providerProducts,
    favorite,
    cartList,
    cartProducts,
    notifications,
});

