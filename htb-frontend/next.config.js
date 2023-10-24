/** @type {import('next').NextConfig} */
const path = require('path');

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    assetPrefix: isProd ? undefined : 'http://localhost:3000',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    output: 'standalone'
}
module.exports = nextConfig
