const appConfig = Object.freeze({
    development: {
        localStorage: "user_data_localStoage",
        sessionStorage: "user_data_sessionStoage"
    },
    production: {
        localStorage: "user_data_localStoage",
        sessionStorage: "user_data_sessionStoage"
    }
});

export default appConfig[process.env.NODE_ENV];