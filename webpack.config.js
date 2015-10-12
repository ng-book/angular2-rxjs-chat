var webpack             = require('webpack'),
    ReloadPlugin        = require('webpack-reload-plugin'),
    path                = require('path'),
    ChunkManifestPlugin = require('chunk-manifest-webpack-plugin'),
    HtmlWebpackPlugin   = require('html-webpack-plugin'),
    WebpackNotifierPlugin = require('webpack-notifier'),
    ExtractTextPlugin   = require("extract-text-webpack-plugin");

 
/**
 * Support for extra commandline arguments
 */
var argv = require('optimist')
            // .alias('e','env').default('e','dev')
            // .alias('r','release').default('r', false)
            // .alias('m','minify')
            // .alias('t','hotComponents').default('t', false)
            .argv;
 
/**
 * Useful variables
 */
var cwd = process.cwd();
var DEBUG = !argv.release;
var isDevServer = process.argv.join('').indexOf('webpack-dev-server') > -1;
var version = require(path.resolve(cwd,'package.json')).version;
var reloadHost = "0.0.0.0";
var npmRoot = __dirname + "/node_modules";
var vendorRoot = __dirname + "/app/js/vendor";
var appDir = __dirname + "/app";

var entry = ["app.ts"]
 
if (isDevServer) {
  entry.unshift("webpack-dev-server/client?http://"+reloadHost+":8080");
}
 
function makeConfig(options) {
  return {
    cache: true,
    debug: true,
    verbose: true,
    displayErrorDetails: true,
    context: appDir,
    entry: {
      vendor: [
        "vendor.js",
      ],
      bundle: entry
    },
    stats: {
      colors: true,
      reasons: DEBUG
    },
    devtool: 'source-map',
    recordsPath: path.resolve('.webpack.json'),
 
    devServer: {
      inline: true,
      colors: true,
      contentBase: path.resolve(cwd, "build"),
      publicPath: "/"
    },
    output: {
      path: path.resolve(cwd, "build"),
      filename: "[name].js",
      publicPath: "/", // isDevServer ? './': './',
      chunkFilename: "[id].bundle.js",
 
      // Hot Module Replacement settings:
      hotUpdateMainFilename: "updates/[hash].update.json",
      hotUpdateChunkFilename: "updates/[hash].[id].update.js"
    },
    plugins: [
      new webpack.IgnorePlugin(/spec\.js$/),
      new webpack.optimize.CommonsChunkPlugin('core.js'),
      new ExtractTextPlugin("styles.css"),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(version),
        ENV: JSON.stringify(options.env)
      }),
      new HtmlWebpackPlugin({
        template: path.join(appDir, "index.html"),
      }),
      new ReloadPlugin( isDevServer ? 'localhost' : ''),
      new WebpackNotifierPlugin({
        title: "ng-book",
        // contentImage: path.join(appDir, 'images/notifier.png')
      }),
    ],
    resolveLoader: {
      root: path.join(__dirname, 'node_modules'),
      modulesDirectories: ['node_modules'],
      fallback: path.join(__dirname, "node_modules")
    },
    resolve: {
      root: [path.resolve(cwd)],
      modulesDirectories: [
        'node_modules', 'app', 'app/ts', '.'
      ],
      extensions: ["", ".ts", ".js", ".json", ".css"],
      alias: {
        'app': 'app'
      }
    },
    externals: {
      "file-loader!vendor/traceur-runtime-0.0.87.js": "traceur",
      "file-loader!vendor/system-0.16.11.js": "systemjs",
      "file-loader!vendor/es6-module-loader-0.16.6.js": "es6ModuleLoader",
      "file-loader!vendor/angular2.dev.2.0.0-alpha.35.js": "angular",
      "file-loader!vendor/bootstrap@3.3.5.min.css": "bootstrap"
    },
    module: {
      preLoaders: [
        { test: /\.ts$/, loader: "tslint" }
      ],

      loaders: [
        { test: /\.(png|jpg|gif)$/,   loader: "url-loader?limit=50000&name=[path][name].[ext]" },
        { test: /\.json$/, loader: 'json' },
        { test: /^(?!.*\.min\.css$).*\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")},
        { test: /\.scss$/, loaders: ['style-loader',
                                     ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap"),
                                     'sass-loader' +
                                     '?outputStyle=expanded&' +
                                     'root='+appDir+'&' +
                                     '&includePaths[]'+npmRoot + '&' +
                                     '&includePaths[]'+appDir 
                                    ]},
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,         loader: "url-loader" },
        { test: /\.html$/,    loader: "raw" },
        { test: /^index\.html$/, loader: "file-loader?name=[path][name].[ext]" },
        { test: /\.ts$/, loader: 'awesome-typescript-loader?ignoreWarnings[]=2304', exclude: [ /test/, /node_modules/]},
        { test: /vendor(\/|\\).*\.(css|js)/, loader: 'file-loader?name=[path][name].[ext]', exclude: [/node_modules/]},
        { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,    loader: "file-loader?mimetype=application/font-woff&name=[path][name].[ext]" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,         loader: "file-loader?mimetype=application/x-font-ttf&name=[path][name].[ext]" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?\??$/,      loader: "file-loader?mimetype=application/vnd.ms-fontobject&name=[path][name].[ext]" },
        { test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,         loader: "file-loader?mimetype=application/font-otf&name=[path][name].[ext]" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,         loader: "url-loader"   },
      ],
      noParse: [
        /\.min\.js/,
          /vendor(\/||\\).*?\.(js|css)$/
      ]
    },
    tslint: {
        emitErrors: false,
        failOnHint: false
    }
  }
}

var config = makeConfig(argv)
 
console.log(require('util').inspect(config, {depth: 10}))
module.exports = config;
