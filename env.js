const path = require('path');
const fs = require('fs');

const VERSION = require('./package.json').version;

const SRC_DIR = path.join(__dirname, 'src');
const PRODUCTS_DIR = path.join(SRC_DIR, 'products');
const env = getEnv('ENV', 'dev');
const product = getEnv('PRODUCT', 'teacher');
const target = getEnv('TARGET', 't1');
const dev = /dev/i.test(env);
const hot = getEnv('HOT', dev);
const inline = getEnv('INLINE', dev);
const host = getEnv('HOST', 'localhost');
const debug = getEnv('DEBUG', false);
let port = getEnv('PORT', 8001);

const products = fs.readdirSync(PRODUCTS_DIR);
const productIndex = products.indexOf(product);

const https = getEnv('HTTPS', true);

const targetBackendMap = {
    t1: 'https://t1.learnta.cn',
    t2: 'https://t2.learnta.cn',
    sit: 'https://sit.learnta.cn',
    staging: 'https://learnta.cn',
    prod: 'https://learnta.cn',
};

const backend = targetBackendMap[target] || targetBackendMap.t1;

if (!port) {
    switch (product) {
        // 定死 IP，这样就可以使用 nginx 来代理，并指定域名
        case 'teacher':
            port = 8001;
            break;
        default:
            port = 8000 + productIndex;
            break;
    }
}

const conf = {
    VERSION,

    HTTPS: https,
    PROTOCOL: https ? 'https' : 'http',
    HOST: host,
    PORT: port,
    BACKEND: backend,

    ENV: env,
    DEV: dev,
    TARGET: target,
    PRODUCT: product,

    HOT: hot,
    INLINE: inline,
    DEBUG: debug,
};

conf.FRONTEND = `${conf.PROTOCOL}://${conf.HOST}:${conf.PORT}/`;

outputConf(conf);

module.exports = conf;

function getEnv(key, defaultValue) {
    const result = process.env[key.toUpperCase()] || process.env[key.toLowerCase()] || defaultValue;
    return result === 'false' || result === 'true' ? JSON.parse(result) : result;
}

function outputConf(config) {
    const KEYS = Object.keys(config);
    const MAX_LENGTH = Math.max(...KEYS.map(k => k.length)) + 2;
    /* eslint-disable no-console */
    console.log('\r\n\x1b[36m==================== 环境变量 ======================\x1b[0m');
    Object.keys(config).forEach(k => {
        const color = config[k] === true ? '\x1b[35m' : '';
        const len = k.length;
        const prefix = len < MAX_LENGTH ? ' '.repeat(MAX_LENGTH - k.length) : '';
        console.log('%s%s: %j\x1b[0m', color, prefix + k, config[k]);
    });
    console.log('\x1b[36m===================================================\x1b[0m\r\n');
    /* eslint-disable no-console */
}
