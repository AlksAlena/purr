const path = require("path");

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: __dirname + "/public",
		filename: "bundle.js",
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot-loader", "babel-loader"] }
		]
	},

};