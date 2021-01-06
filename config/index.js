require('dotenv').config();

const config = {
    port: process.env.PORT,
    host_name: process.env.HOST 
}

module.exports = config;