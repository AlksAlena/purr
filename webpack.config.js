const path = require("path");

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: __dirname + "/public/build/",
        publicPath: "build/",
        filename: "bundle.js",
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: [/node_modules/, /public/], 
                loaders: ["react-hot-loader", "babel-loader"] 
            }, { 
                test: /\.json$/, 
                exclude: [/node_modules/, /public/], 
                loader: "json-loader"
            }, { 
                test: /\.jsx$/, 
                exclude: [/node_modules/, /public/], 
                loaders: ["react-hot-loader", "babel-loader"] 
            }, { 
                test: /\.css$/, 
                exclude: [/node_modules/, /public/], 
                loaders: ["style-loader", "css-loader", "autoprefixer-loader"] 
            }, { 
                test: /\.less$/, 
                exclude: [/node_modules/, /public/], 
                loaders: ["style-loader", "css-loader", "autoprefixer-loader", "less-loader"] 
            }, {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            }, {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            }, {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            }, {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            },

        ]
    },

};