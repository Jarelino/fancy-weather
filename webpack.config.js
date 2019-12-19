const path = require('path');

const conf = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: '/dist',
  },
  devServer: {
    overlay: true,
  },
};

module.exports = (env, options) => {
    const production = options.mode === 'development';
  
    conf.devtool = production ? 'sourcemap' : 'eval-sourcemap';
  
    return conf;
  };