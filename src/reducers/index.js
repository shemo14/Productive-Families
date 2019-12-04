import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import profile from './ProfileReducer';
import aboutApp from './AboutAppReducer';
import contactUs from './ContactUsReducer';
import faq from './FaqReducer';
import terms from './TermsReducer';

export default combineReducers({
    lang,
    auth,
    profile,
    aboutApp,
    contactUs,
    faq,
    terms
});

