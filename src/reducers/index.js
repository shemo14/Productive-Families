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
<<<<<<< HEAD
import cities from './CitiesReducer';
import changePassword from './ChangePasswordReducer';
=======
import searchHome from './SearchHomeReducer';
import categoryHome from './CategoryHomeReducer';
import categoryProvider from './CategoryProviderRuducer';
import SearchProvider from './SearchProvidersReducer';
import filterProvider from './FilterProvidersReducer';
import cities from './CitiesReducer';
import providerProducts from './ProviderProductsReducer';
import favorite from './FavoriteReducer';
>>>>>>> 81cafbcdb3df75e56f775b4301ba31311981fb0c

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
<<<<<<< HEAD
    cities,
    changePassword,
=======
    searchHome,
    categoryHome,
    categoryProvider,
    SearchProvider,
    filterProvider,
    cities,
    providerProducts,
    favorite
>>>>>>> 81cafbcdb3df75e56f775b4301ba31311981fb0c
});

