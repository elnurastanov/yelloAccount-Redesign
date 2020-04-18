const config = {
    development: {
        url: 'http://localhost:2000/v1/panel/'
    },

    production: {
        url: 'http://localhost:2000/v1/panel/'
    }
}

export default config[process.env.NODE_ENV]