var webpack = require('webpack')

module.exports = {
    entry: "./js/index.js",
    output: {
        path: "./js/",
        filename: "rcc.js"
    },
    
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
//              loader: "babel",//webpack Ver2.0之后。所有loader之后都必须加上-loader，如下方
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"]
                }
            }
        ]
    },
    
//  plugins:[
// 	 new webpack.DefinePlugin({
// 	   'process.env':{
// 	     NODE_ENV: JSON.stringify('production')
// 	   }
// 	 }),
// 	 new webpack.optimize.UglifyJsPlugin()
// 	]
}
