const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,     
        filename: './public/bundle.js'
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    }, 
    resolve: { alias: { 'react': path.resolve(__dirname, '../../node_modules', 'react') } },
     devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            query: {
                presets: ['es2016', 'react']
            }
        },
    ],
},

externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore','jQuery'],
watch: true,
resolve: {
    extensions: ['.js', '.jsx'] // Looks for index.js first, then falls back to index.jsx
 // extensions: ['.jsx', '.js']    Looks for index.jsx first, then falls back to index.js
},
plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
})
]
}


// module.exports = {
//     output: {
//         filename: './public/bundle.js'
//     },
//     node: {
//         fs: 'empty',
//         net: 'empty',
//         tls: 'empty',
//         dns: 'empty'
//     },
    
    
//     target: 'node',
//     externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
//     watch: true
//   };