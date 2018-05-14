
module.exports = {
    NODE_ENV: JSON.stringify('production'),
    APP_HOST: process.env.TEST_BUILD ? JSON.stringify('http://116.62.134.207:8082') : JSON.stringify('https://api.axguanjia.com:6868')
};
