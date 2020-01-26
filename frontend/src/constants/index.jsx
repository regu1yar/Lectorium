export const SITE_STRUCTURE = {
    main: {
        title: 'Главная',
        route: '/',
    },
    calendar: {
        title: 'Календарь cъёмок',
        route: '/calendar/'
    },
    schedule: {
        title: 'Расписание',
        route: '/schedule/',
    },
    managing: {
        title: 'Страница управления',
        route: '/manage/',
    },
    profile: {
        title: 'Профиль',
        route: '/profile/',
    }
};

// Use same domain
// (in developement mode, `proxy` property in package.json forwards all (unresolved) requests to localhost:8080)
export const api_url = "/";

export const channel_url = "https://www.youtube.com/channel/UCdxesVp6Fs7wLpnp1XKkvZg";