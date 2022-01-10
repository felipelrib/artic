module.exports = {
    setupFiles: [
        'dotenv/config'
    ],
    transform: {
        "^.+\\.[t|j]sx?$": ["babel-jest", {
            "configFile": "./babel.config.jest.js"
        }]
    }
}
