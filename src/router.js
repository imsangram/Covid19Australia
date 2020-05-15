import Homepage from './components/Homepage/Homepage';
import Global from './components/Global/Global';
import About from './components/About/About';
import FAQ from './components/FAQ/FAQ';
import StatePage from './components/StatePage/StatePage';


export const routerPages = [
    {
        pageLink: '/',
        view: Homepage,
        displayName: 'Home',
        animationDelayForNavbar: 0.2,
        showInNavbar: true,
    },
    {
        pageLink: '/global',
        view: Global,
        displayName: 'Demographics',
        animationDelayForNavbar: 0.3,
        showInNavbar: true,
    },
    {
        pageLink: '/state/:id',
        view: StatePage,
        displayName: 'state data',
        animationDelayForNavbar: 0.3,
        showInNavbar: true,
    },
    {
        pageLink: '/about',
        view: About,
        displayName: 'About us',
        animationDelayForNavbar: 0.3,
        showInNavbar: true,
    },
    {
        pageLink: '/faq',
        view: FAQ,
        displayName: 'FAQ',
        animationDelayForNavbar: 0.3,
        showInNavbar: true,
    }
];