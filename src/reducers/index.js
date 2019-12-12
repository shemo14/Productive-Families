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
import cities from './CitiesReducer';
import changePassword from './ChangePasswordReducer';

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
});

