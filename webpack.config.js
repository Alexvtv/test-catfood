let path = require('path');
const glob = require('glob-all')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let conf = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: 'main.js'
    },
    optimization:{
        minimizer: [
            new TerserPlugin({
            })
        ]
    },
    devServer: {
      overlay: true
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        },
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attributes: {
                                list: [
                                    {
                                        tag: 'img',
                                        attribute: 'src',
                                        type: 'src'
                                    },
                                    {
                                        tag: 'img',
                                        attribute: 'srcset',
                                        type: 'srcset'
                                    },
                                    {
                                        tag: 'a',
                                        attribute: 'href',
                                        type: 'src',
                                        filter: (tag, attr, attrs) => {
                                            return /\/src\/img/i.test(attrs.href);
                                        }
                                    }
                                ]
                            }
                        }
                    },
                    {
                        loader: 'posthtml-loader',
                        options: {
                            plugins: [
                                require('posthtml-include')({root: path.resolve(__dirname, './src/')})
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true //Required for resolve-url-loader
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg)/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                }
            },
            {
                test: /\.(eot|woff2?|ttf)/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                }
            }
        ]
    },
plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './index.html',
      filename: 'index.html'
    })
]
};

module.exports = (env, options) => {
  let production = options.mode === 'production';

  conf.devtool = production 
                  ? false
                  : 'eval-sourcemap';
  conf.optimization.minimize = production;

    if (production)
        conf.plugins.push(
            new PurgecssPlugin(
                {
                    paths:
                        glob.sync([
                            path.resolve(__dirname, `*.html`),
                            path.resolve(__dirname, `src/**/*.html`),
                            path.resolve(__dirname, `src/**/*.js`)
                        ], {nodir: true}),
                    whitelistPatterns: [],
                }
            )
        );

  return conf;
}