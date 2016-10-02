const BHRenderPlugin = require('./webpack/plugins/bh-render-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        index: './desktop.bundles/index/index.bemjson.js'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        pathinfo: true,
        filename: '[name].min.js'
    },

    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'ymodules-loader',
                exclude: /node_modules/
            },
            {
                test: /\.bemjson.js$/,
                loader: 'bemdecl-to-fs!deps!bemjson?stringify=false',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus'),
                exclude: /node_modules/
            },
            {
                test: /\.(gif|png|svg)$/,
                loader: 'url',
                exclude: /node_modules/
            },
            {
                test: /\.bh(\.js)?$/,
                loader: 'loaders/bh',
                exclude: /node_modules/
            }
        ]
    },

    bem: {
        extensions: [
            'bh.js',
            'js',
            'vanilla.js',
            'styl'
        ],
        levels: [
            'libs/bem-core/common.blocks',
            'libs/bem-core/desktop.blocks',
            'libs/bem-components/common.blocks',
            'libs/bem-components/desktop.blocks',
            'libs/bem-components/design/common.blocks',
            'libs/bem-components/design/desktop.blocks',
            'common.blocks',
            'desktop.blocks',
        ]
    },

    devtool: 'source-map',

    postcss: [
        require('autoprefixer')
    ],

    resolveLoader: {
        modulesDirectories: ['./webpack', './webpack/loaders']
    },

    plugins: [
        new BHRenderPlugin('index.html'),
        new ExtractTextPlugin('index.min.css')
    ]
};
