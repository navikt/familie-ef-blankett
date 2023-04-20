import path from 'path';
import nodeExternals from 'webpack-node-externals';

const entry = { server: './src/server/index.ts' };

const webpackConfig = {
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  target: 'node',
  devtool: 'inline-source-map',
  entry: entry,
  output: {
    path: path.resolve(process.cwd(), 'build/backend'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  // don't compile node_modules
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|ts|js)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react-app'],
        },
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
};

export default webpackConfig;
