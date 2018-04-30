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
    // resolve: { alias: { 'react': path.resolve(__dirname, '../../node_modules', 'react') } },
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
                presets: ['es2016']
            }
        },
    ],
},
resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    }
},
devtool: '#eval-source-map',
externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore','jQuery'],
watch: true,
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