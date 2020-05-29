const config = {
    development: {
        url: 'http://localhost:2000/v1/'
    },

    production: {
        url: 'http://localhost:2000/v1/'
    }
}

export default config[process.env.NODE_ENV]